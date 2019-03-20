---
layout: post
title: "Twelve Features of Christmas Day 8: User Search"
publish_date: December 17th, 2013
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

We're excited to roll out user search today, a feature we know many of you have been waiting for. It is now possible to search for a full *user id*, *email address* or *name* in the search box on your Bugsnag dashboard, and we'll show you all errors that affected that user.

![](/img/posts/user-search.png)

Searching by id should work immediately for most Bugsnag customers, but you'll need to upgrade your Bugsnag notifier library to the latest version to begin sending the information we need for name and email address search.

## Quick Rails App Example

```ruby
class ApplicationController < ActionController::Base
  before_bugsnag_notify :set_bugsnag_user

  protected
  def set_bugsnag_user(notification)
    notification.user = {
      name: "James Smith",
      email: "james.smith@bugsnag.com"
    }
  end
end
```

See the full [ruby documentation](https://docs.bugsnag.com/platforms/ruby/) for more details.


## Other Apps

We've already updated most of our notifier libraries to support the sending of structured user data. See our documentation on setting structured user data for [Android](https://docs.bugsnag.com/platforms/android/sdk/#identifying-users), [iOS/OSX](https://docs.bugsnag.com/platforms/ios/#identifying-users), [PHP](https://docs.bugsnag.com/platforms/php/laravel/#identifying-users) and [Java](https://docs.bugsnag.com/platforms/java/other/#identifying-users).

We're updating our Node, Python and JavaScript notifiers soon to also support this feature.


## We'd Love Your Feedback

Get in contact with us [via email](mailto:support@bugsnag.com) to tell us what you think about the new feature. We'd love to hear your feedback! Stay posted via our blog or [twitter](https://twitter.com/bugsnag) to see what we release tomorrow!
