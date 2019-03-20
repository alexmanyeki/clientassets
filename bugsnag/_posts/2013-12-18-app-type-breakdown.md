---
layout: post
title: "Twelve Features of Christmas Day 9: Application Type Breakdown"
publish_date: December 18th, 2013
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

Modern applications often have multiple entry-points to a single codebase, for example your Rails application code could be executing from an Nginx web server, a `rake` command-line task, or a queued task such as a [Sidekiq](http://sidekiq.org/) job. Your application could encounter the same error in any one of these, and it is important to know exactly where.

Bugsnag will now detect and show you whether each error affected a background job, cron job or web server, with our new "App Types" feature!

![](/img/posts/app-type-breakdown.png)


## Full Ruby Support

We are launching today with comprehensive Ruby support for automatically detecting Rails, Sinatra, Rack, Mailman, Sidekiq, Resque or Rake application types.

You can also manually set the application type if we don't automatically support the one you need. See the full [Ruby documentation](https://docs.bugsnag.com/platforms/ruby/#app_type) for more details.


## Other Apps

We've also launched support for this in our [PHP](https://docs.bugsnag.com/platforms/php/#settype) notifier, and we will roll out further support in our other notifiers soon!


## We'd Love Your Feedback

Get in contact with us [via email](mailto:support@bugsnag.com) to tell us what you think about the new feature. We'd love to hear your feedback! Stay posted via our blog or [twitter](https://twitter.com/bugsnag) to see what we release tomorrow!
