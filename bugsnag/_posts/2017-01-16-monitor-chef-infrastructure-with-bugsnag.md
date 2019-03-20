---
layout: post
title: Monitor your Chef Infrastructure with Bugsnag
publish_date: January 16, 2017
author_name: George Kontridze
author_twitter: gkze
author_avatar: george
categories: engineering
---

[Chef](https://www.chef.io/) is a very popular configuration management tool that a lot of companies (including giants like Bloomberg, Etsy, Yahoo, Facebook, and Intuit) use to automate the management of their infrastructure in order to reduce operational overhead. This way, fewer engineers can run a larger fleet of servers, and they also get the added benefit of codifying their desired infrastructure state.

## Monitoring Chef runs

Chef is written in Ruby, and exposes a very nice [API for hooking into its internal events](https://docs.chef.io/handlers.html). As such, it's possible to treat Chef just as another application - monitoring it during its run time to make sure it does not throw any errors. Using Bugsnag, I was able to setup Chef monitoring with just 12 lines of code to send exceptions from a failed [chef-client run](https://docs.chef.io/chef_client.html#the-chef-client-run) to Bugsnag in order to increase visibility for when configuration is not applied to servers properly.

We have set up all our servers to report any errors that a chef-client run encounters to a *Chef* project in Bugsnag. So for example, if we configure a server to fetch a file from S3, but during the run, it's discovered that the file is not there, Chef will fail and execute our registered Bugsnag report handler, making the error appear in our dashboard. This is very helpful to us in terms of increasing visibility of the correctness of our infrastructure configuration.

## Configuring Chef error monitoring

The following screenshot demonstrates how easy it is to hook up Chef to Bugsnag:

![Chef and Bugsnag integration](/img/posts/chef-bugsnag-integration.jpg)

Let's break that down:

* `chef_gem 'bugsnag'` instructs Chef to install a gem into its own internally-bundled Ruby environment and make it available inside recipes
* `require 'bugsnag'` loads our [Ruby notifier](https://github.com/bugsnag/bugsnag-ruby)
* the `Bugsnag.configure` block does the following:
  * Sets the notifier API key
  * Checks whether the current node is an EC2 Instance and sets the release stage accordingly (if EC2 then prod otherwise dev)
  * Instructs the notifier to only deliver notifications in production
* the last part is where everything comes together:
  * `Chef.event_handler` allows defining custom handlers for events that Chef exposes. In our case, we are handling the `:run_failed` event
  * `on :run_failed` is a Chef method coming from the event_handler scope that is exposed to us inside the block with the exception object that caused the run to fail
  * we pass the exposed exception to `Bugsnag.notify`

That's it! All you have to do is put this as early on in your Chef run as possible (we put it in a "base" cookbook which we include everywhere) and any exceptions raised during a chef-client run will automatically appear in the dashboard:

![Bugsnag Chef errors](/img/posts/chef-errors.png)

## Sending more than Chef client failures

In our case, we have only configured Chef to send any general errors raised by a failed client run to Bugsnag. However, Chef exposes [many different types of events](https://docs.chef.io/handlers.html#event-types) that you can use to report any Chef errors with a granularity level of your choice. In addition to that, the events exposed are not only errors, but other interesting and potentially valuable events, such as:

* A handler was executed - this is somewhat meta, since the handler in this case itself when executed sends the exception to Bugsnag
* Resource skipped - if no changes were made to a resource in between the previous and the current runs
* Attribute load complete - the client has loaded all of the node attributes for the current node.

These are just some examples of the types of events you can register callbacks for (and potentially report to Bugsnag). for a full list see this link: [https://docs.chef.io/handlers.html#event-types](https://docs.chef.io/handlers.html#event-types)

---

As you can see, it's possible to treat Chef as another application with monitoring in place to make sure it does not throw any errors at run time. Since Bugsnag is built specifically for production error monitoring, Chef fits in this use case pretty well, making Chef and Bugsnag a perfect match. This is much more effective and straightforward than building out an in-house solution for monitoring Infrastructure Configuration since it's only 12 lines of code.
