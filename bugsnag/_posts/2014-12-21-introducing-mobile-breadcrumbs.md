---
layout: post
title: "Twelve Features of Christmas Day 10: Mobile Breadcrumbs"
publish_date: December 21st, 2014
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---


Happy *12 Features of Christmas*! We’re excited to launch another awesome new feature to make your Bugsnag experience even better. For day 10 we’ve released [mobile breadcrumbs](https://docs.bugsnag.com/platforms/android/sdk/#logging-breadcrumbs), so you can easily identify the source of a crash!

You can now leave developer-defined log messages called "breadcrumbs" to help understand exactly what was happening in your application in the time before each crash. Better diagnostic information means more convenient bug fixing for your mobile applications.

![Mobile Breadcrumbs](/img/posts/mobile-breadcrumbs.png)

When logging a breadcrumb, we'll keep track of the timestamp associated with the log message, and show both the message and timestamp on your Dashboard. You’ll be able to trace the specific path your user took before they got to a crash, so you can find the exact source of the issue.

We’ve released support for this on our [Android](https://docs.bugsnag.com/platforms/android/sdk/#logging-breadcrumbs) notifier, with planned support for both [iOS](https://docs.bugsnag.com/platforms/ios/#logging-breadcrumbs) and [Javascript](https://docs.bugsnag.com/platforms/browsers/#leaving-breadcrumbs) coming soon. Upgrade your notifier library to start seeing breadcrumbs in your Bugsnag Dashboard!

---

We’d love to hear your feedback on our latest features for mobile. Let us know on [Twitter](https://twitter.com/bugsnag)!
