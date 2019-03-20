---
layout: post
title: Send app-specific data with your Ruby exceptions
publish_date: September 30th, 2012
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

In our latest [Bugsnag Notifier for Ruby](https://docs.bugsnag.com/platforms/ruby/)
release, we've added much better support for sending custom data with your
exceptions. You can now provide callbacks to add any custom data to every
exception that happens in your app.

Exceptions are *always* going to happen in your apps. It is important that you
know when and how your exceptions happen so you can fix them and make sure
your happy customers *stay* happy.


Why send custom data with exceptions?
-------------------------------------

Sometimes the exception class and stacktrace is not enough.

Bugsnag already collects and displays as much information as possible to help
you debug your exceptions, including HTTP params, app environment and
number of unique users affected, but as a developer you'll know exactly which
pieces of application data are most important to you.

By sending custom data with each exception, you'll immediately be able to
answer the most important questions, for example:

-   Was the person signed in?
-   Is there something special about the user, are they a paying customer?
-   What company does the user work for?
-   What is the best way to reproduce this error?
-   How can I contact the person affected by this error?


How to send custom data from your Rails apps
--------------------------------------------

In any rails controller you can define a `before_bugsnag_notify` callback,
which allows you to attach additional data to the exception notification
and have it displayed in a tab on your Bugsnag dashboard.

```ruby
class MyController &lt; ApplicationController
  # Attach the callback
  before_bugsnag_notify :add_user_info_to_bugsnag

  # controller code...

  private
  def add_user_info_to_bugsnag(notification)
    # Add some app-specific data which will be displayed on a custom
    # "User Info" tab on each error page on bugsnag.com
    notification.add_tab("User Info", {
      :name => current_user.name
    })
  end
end
```


How to send custom data from other ruby apps
--------------------------------------------

If you aren't using Rails, you can still define callbacks, but you'll need
to explicitly clear the callbacks before your next request or whenever
appropriate:

```ruby
# Set a before notify callback
Bugsnag.before_notify_callbacks &lt;&lt; lambda {|notification|
  notification.add_tab("User Info", {
    :name => current_user.name
  })
}

# app code...

# Clear the callbacks
Bugsnag.before_notify_callbacks.clear
```


Send data from your libraries using Bugsnag middleware
-------------------------------------------------------

Callbacks are implemented internally in the ruby library using our own
middleware stack. Our middleware stack works in a similar way to Rack
middleware, allowing you to chain together code which runs before and
after Bugsnag is notified about an exception.

You can write your own middleware class by following the following pattern:

```ruby
class MyMiddleware
  def initialize(bugsnag)
    @bugsnag = bugsnag
  end

  def call(notification)
    # Do some "before notify" work

    @bugsnag.call(notification)

    # Do some "after notify work"
  end
end
```

You can then add your middleware to the stack by calling:

```ruby
Bugsnag.configure do |config|
  config.middleware.use MyMiddleware
end
```

To view the current Bugsnag middleware stack for your app, you can run
`rake bugsnag:middleware`:

```bash
$ rake bugsnag:middleware
Bugsnag::Middleware::Callbacks
Bugsnag::Middleware::RackRequest
Bugsnag::Middleware::Rails3Request
```


Adding custom data will give you more insights into your exceptions, which
should ultimately allow you to resolve them faster.
