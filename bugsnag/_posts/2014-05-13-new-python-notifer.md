---
layout: post
title: Python Notifier 2.0
publish_date: May 13th, 2014
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

We've just released version 2.0 of our [Python Notifier](https://docs.bugsnag.com/platforms/python/), which powers Bugsnag error monitoring for Django, Flask, Tornado, WSGI and other Python apps.

```bash
$ pip install bugsnag --upgrade
```

This release includes full Python 3 support, new `before_notify` hooks to make sending additional data to Bugsnag with each error much easier and much more.

![Python logo](/img/posts/python-logo.png)


### Python 3 Support

This release includes our first official support for Python 3! We now officially support using Bugsnag with Python 2.6, 2.7, 3.2 and 3.3.


### Custom Data With Exceptions

We've made it even easier to send custom data to Bugsnag with every exception. You can now create your own `before_notify` function to add custom data, user information, or even stop errors being sent to Bugsnag completely:

```python
def before_bugsnag_notify(notification):
    # You can add custom data or set user information
    notification.user = {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }

    notification.add_tab("account", {
        "paying": current_user.acccount.is_paying()
    }

    # Returning False stops the notification from being sent to Bugsnag
    if isinstance(notification.exception, KeyboardInterrupt):
        return False

bugsnag.before_notify(before_bugsnag_notify)
```

### Better Project & Stage Detection

We can now automatically detect your release stage and project root in most situations, which helps with error grouping and makes stacktraces easier to read.

### Many More Bug-Fixes

We also squashed a ton of bugs in this release, so let us know what you think! Get in touch via [twitter](https://twitter.com/bugsnag) or [email](mailto:support@bugsnag.com) with any feedback.
