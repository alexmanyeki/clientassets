---
layout: post
title: Automatic breadcrumbs for JavaScript
publish_date: August 1st, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

The Bugsnag JavaScript notifier now supports automatic breadcrumbs. This feature helps you gain a clearer understanding of what was happening in your app leading up to a crash.

![JavaScript automatic breadcrumbs](/img/posts/js-auto-breadcrumbs.png)

When available, you'll see a timeline of automatically collected user actions and browser events that happened during the page view before the current error was reported. They include things like UI clicks, console warnings, pushState navigations, and more. For a full list of automatically collected breadcrumbs, please see our [documentation](https://docs.bugsnag.com/platforms/browsers/#leaving-breadcrumbs).

This part of the error report is customizable so if you'd like to disable breadcrumbs, you can turn off all breadcrumbs or particular types with a [single setting](https://docs.bugsnag.com/platforms/browsers/configuration-options/#autobreadcrumbs). You can also set your own [custom breadcrumbs](https://docs.bugsnag.com/platforms/browsers/#attaching-custom-breadcrumbs) if you have a particular user action or event you'd like to see in the breadcrumb timeline. Breadcrumbs are available in the newest version of the Bugsnag JavaScript notifier, so you'll need to opt-in to version 3 for access to it. We'd love to hear your feedback so reach out to let us know what you think.  

---

We hope this feature will make it easier to reproduce errors in your JavaScript apps. This feature is also available on the [Bugsnag Cocoa notifier](https://docs.bugsnag.com/platforms/ios/#logging-breadcrumbs) for iOS and OSX.

To keep up with the latest from the Bugsnag team, follow us on [Twitter](https://twitter.com/bugsnag).
