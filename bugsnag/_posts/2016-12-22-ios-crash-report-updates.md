---
layout: post
title: 12 Features of Christmas - Improved iOS stacktraces and error reports
publish_date: December 22, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

For day 11 of the *12 Features of Christmas*, we have a gift specifically for iOS developers. We've released improvements for [iOS crash reports](https://github.com/kpinedok/bugsnag-cocoa) that make them easier to understand, especially if you're quickly scanning the stacktrace and diagnostic data. We decided to tackle these polishes and improvements because presenting your crash information in the most digestible way can save you time debugging.

## Quickly scan to find your filename and line number

We've reformatted stacktraces so you'll easily be able to find where the line of code that crashed is located. We've done this by separating the filename and line number for each crash from the symbol and method name, making it easier to decipher at a glance.

![New iOS stacktrace](/img/posts/new-ios-stacktrace.png)

To make stacktraces even more readable, we also include stackframe numbers, so you can see where lines have been hidden from your view. Bugsnag optimizes stacktraces by deemphasizing out of app stackframes, but in case you need them, they're now more visible. Stacktraces are also formatted as a table so it's easier to scan.  

![Raw iOS stacktrace](/img/posts/raw-ios-stacktrace.png)

## Identify which devices are seeing app crashes

We've changed device names to their common names instead of their underlying identifiers. This should make it easier to identify which iOS devices are experiencing crashes.

![Device names for iOS](/img/posts/device-names.png)

## Swift demangling

We've made significant improvements to stacktraces from iOS apps built with Swift. We now do Swift demangling on our servers for every symbol from Swift source files, so you'll be presented with the most readable stacktraces.

You'll also find other small polishes and improvements to clear up the error view and make the report less cluttered and easier to understand.

---

You can try [Bugsnag free](https://app.bugsnag.com/user/new) and start monitoring application crashes with [Bugsnag's crash reporting for iOS](https://www.bugsnag.com/platforms/ios-crash-reporting/).

We hope this feature will make bug fixes for iOS applications smoother. Please stay tuned for the last feature of the 12 Features of Christmas coming to you tomorrow!
