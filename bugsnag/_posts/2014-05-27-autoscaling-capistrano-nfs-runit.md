---
layout: post
title: Autoscaling with Capistrano, NFS and Runit
publish_date: May 27th, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

Bugsnag is architected to deal with huge variations in load - some days we get
over 10x more API hits than others. In order to maintain a reasonable
processing speed for a reasonable cost, we use [AWS autoscaling](https://aws.amazon.com/autoscaling/) to add and
remove workers as needed.

This is surprisingly easy to do: first set up a [launch
configuration](http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/USBasicSetup-Console.html#gs-create-lc)
with an AMI and a shell script, then add an [autoscaling
group](http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/USBasicSetup-Console.html#gs-create-asg)
that boots more machines when the worker queue is building up and terminates
them when they're not using much CPU.

Once we set up AWS autoscaling, we needed to ensure new instances are running
the latest version of our code. To solve this we use a combination of
[NFS](https://en.wikipedia.org/wiki/Network_File_System),
[capistrano](http://capistranorb.com/) and [runit](http://smarden.org/runit/).

[![Deployment Architecture](/img/posts/capistrano-autoscaler.png)](/img/posts/capistrano-autoscaler.png)


Sharing App Code with NFS
-------------------------

NFS lets you share a directory between multiple servers (think of it as Dropbox
for servers).

Our first approach was to `scp` our app's code when
the autoscaler booted an instance. This was fragile, and meant that servers
could get out of sync with each other, so we needed a solution that let us
maintain just one copy of the app in a central location. NFS seemed perfect.

NFS was built in the 1980s so it has a very mature interface. It literally
*just works*. All we had to do was install install the `nfs-kernel-server`
package on our build server and `nfs-common` on the worker machines.

Configuring NFS is done by editing `/etc/exports` on the build server. We want
to export our `/apps` directory read-only to all machines, which requires the
following line of config:

```bash
/apps *(ro,no_subtree_check)
```

Now as part of our autoscaling shell script, we mount the apps onto the actual
app servers. The app is immediately ready to boot!

```
mkdir -p /apps/worker
mount -t nfs nfs.internal.bugsnag.com:/apps/worker /apps/worker
```


Deploying with Capistrano
--------------------------

We use [Capistrano 3](http://capistranorb.com/) for deployment, as it neatly wraps
running shell scripts on multiple servers. In fact, the only change we needed to
make to move from having a list of hard-coded servers to autoscaling was to configure
the list of machine names dynamically.

First we add the build machine as a server with the `deploy` role. This role is
not configured to run any code, but exists just to deploy to. Then we find all
the autoscaled workers using the AWS API and tag them. The `no_release` attribute
prevents Capistrano uploading code to that server (it can just read the code over NFS),
and the `worker` role tells it to run the bugsnag-worker.

```ruby
# config/deploy/production.rb

# deploy to build server
server 'nfs.internal.bugsnag.com', user: 'deploy', roles: %w{deploy}

# find all running EC2 servers tagged with Role=worker
instances = AWS::EC2::Client.new.describe_instances(filters: [
              {name: 'tag:Role', values: ['worker']},
              {name: 'instance-state-name', values: ['running']}
            ])

instances.instance_index.values.each do |host|
  server host[:dns_name], user: 'deploy', roles: %w{worker}, no_release: true
end
```


Booting with runit
------------------

There are a plethora of process managers out there, but we've used
[runit](http://smarden.org/runit/) for a while due to its simplicity.

To do this we use [cap-runit](https://github.com/ConradIrwin/cap-runit) to define runit
tasks during deployment:

```ruby
# config/deploy.rb

set :runit_service_directory, "/apps/service"

runit_service :'bugsnag-worker' do
  roles :worker

  run File.read("./config/service/bugsnag-worker/run")
  log File.read("./config/service/bugsnag-worker/log/run")
end
```

This shell script gets deployed to all worker machines when we run `cap
production deploy`. Runit then picks up on the files we've added, and starts
running the service.

To make this work on autoscaled machines we add another command to the
autoscaling script that copies the runit scripts into place. The relevant
part of the script then looks like this:

```bash
# AWS autoscaling custom data

mkdir -p /apps/worker
mount -t nfs nfs.internal.bugsnag.com:/apps/worker /apps/worker
cp -R /apps/worker/current/config/service /apps/
chown -R deploy:dev /apps/service
```

---------------------------------------


That's all you need to get basic auto-scaling working on AWS! Let us know any
feedback or tell us how you autoscale your servers via email or [twitter](https://twitter.com/bugsnag), we'd love to hear from you!
