---
layout: post
title: Better iOS crash detection with our latest Cocoa Notifier
publish_date: February 19th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We're excited to share some huge improvements to our [Cocoa Notifier](https://docs.bugsnag.com/platforms/ios/) that'll greatly improve your ability to find and fix crashes in your iOS applications. Crash detection on iOS can be difficult, but our latest features and improvements will give you added reassurance in the accuracy of your crash reports.

# New Features

### Bitcode Support

We now support [Bitcode](https://github.com/bugsnag/bugsnag-cocoa#with-bitcode). Bitcode allows you to take advantage of Apple's new processor capabilities without needing to send a new version of your app to the store each time. It re-optimizes your apps when Apple adds support for new CPUs in their backend.

### Swift Demangling

If you're already using Bugsnag to monitor your iOS applications, then you know we support desymbolication. We've added a layer on top of that now to make it easier to see where in your code something went wrong.

Rather than mangled text errors that make errors very difficult to read, Bugsnag automatically translates Swift symbols into their underlying method calls. With more readable Swift errors, debugging is easier.

![Swift demangling](/img/posts/swift-stacktrace.png)

### Pre- and Post-crash hooks

[Pre- and Post-crash hooks](https://docs.bugsnag.com/platforms/ios/configuration-options/) give you more control over your crash reports. If you want to send additional information with reports, you can choose to log added data when your app crashes. If you have privacy and security concerns, you can prevent crash reports from being sent.

### More error data for every crash with breadcrumbs

To help you more easily triage and reproduce harmful bugs, we've added additional crash-time data for all unhandled exceptions. You can send [breadcrumbs](https://docs.bugsnag.com/platforms/ios/#logging-breadcrumbs) with your error reports to better understand the actions a user took prior to seeing a crash.    

![Breadcrumbs on iOS](/img/posts/breadcrumbs.png)

### Improved handling for more types of crashes  

We've improved our crash handling for heap corruption and overwritten link registers. In these extreme cases, our notifier performs better, giving you more accurate crash detection and reports.

# Fixes

We've also made fixes to improve your experience:

- Bugsnag can now be run side-by-side with other frameworks using [KSCrash](https://github.com/kstenerud/KSCrash), the crash recording and    reporting library.  

- Crash reports that fail to upload are now resent instead of cancelled.  

To take advantage of these improvements, be sure to update to the latest version of our Cocoa Notifier. If you're using [CocoaPods](https://cocoapods.org/), you can update your notifier by adding Bugsnag to the Podfile:

```
pod 'Bugsnag'
```

If not, you can follow these [setup instructions](https://docs.bugsnag.com/platforms/ios/#installation).

---

We hope these improvements will make debugging your iOS applications easier. For more information, please see our [Release](https://github.com/bugsnag/bugsnag-cocoa/releases/tag/v5.0.0) and [Changelog](https://github.com/bugsnag/bugsnag-cocoa/blob/master/CHANGELOG.md#500).

If you're new to Bugsnag, [signup](https://app.bugsnag.com/user/new) for a 14 day free trial. You can get started detecting and fixing crashes in iOS with Bugsnag's automatic [iOS crash reporting](https://www.bugsnag.com/platforms/ios-crash-reporting/). For help, checkout our [Cocoa Notifier documentation](https://docs.bugsnag.com/platforms/ios/).
