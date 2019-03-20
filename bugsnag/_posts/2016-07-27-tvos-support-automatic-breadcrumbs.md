---
layout: post
title: "Cocoa notifier improvements: tvOS support and automatic breadcrumbs"
publish_date: July 27th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We're excited to share a new release of the Bugsnag Cocoa notifier with some incredible changes to help you better monitor your applications in production.  

Here's a quick look at what's new:

## Support for [tvOS](http://www.apple.com/tvos-preview/)

The Bugsnag Cocoa notifier now supports [tvOS](https://developer.apple.com/tvos/), so you can monitor crashes in your Apple TV applications. To get started using Bugsnag on your tvOS apps, please visit our [documentation](https://docs.bugsnag.com/platforms/tvos/).

## Automatic Breadcrumb Collection

If you're already using the Bugsnag Cocoa notifier, then you know we've supported [breadcrumbs](https://blog.bugsnag.com/improved-ios-crash-detection/) for a while now. Breadcrumbs make it easier to reproduce crashes by showing you the actions a user took prior to seeing a crash. Normally, you need to configure them yourself, but now, we've upgraded the library to [automatically collect breadcrumbs](https://docs.bugsnag.com/platforms/ios/#automatically-captured-breadcrumbs) right out of the box.

![iOS automatic breadcrumbs](/img/posts/ios-automatic-breadcrumbs.png)

The new Bugsnag Cocoa library detects when common user events happen, like tapping a table view cell or opening a menu, and attaches a breadcrumb for that event. We'll also show you any other errors your user experienced during that session before that particular one.

If you want to, you can still send along [custom breadcrumbs](https://docs.bugsnag.com/platforms/ios/#attaching-custom-breadcrumbs), too.

## Support for `NSError` instances

We've made iOS error reports more easily customizable, so you can modify them before they're sent to Bugsnag. With this change, we've also added selectors — `notifyError:` and `notifyError:block:` — that can notify you of `NSError` instances.

---

For a full list of changes to the Bugsnag Cocoa Notifier, please see our [Changelog](https://github.com/bugsnag/bugsnag-cocoa/blob/master/CHANGELOG.md) and documentation for [iOS](https://docs.bugsnag.com/platforms/ios/) and [tvOS](https://docs.bugsnag.com/platforms/tvos/).

You can keep up to date on the latest from our team by following us on [Twitter](https://twitter.com/bugsnag).
