---
layout: post
title: Improved Bugsnag Notifier for iOS and OS X
publish_date: September 18th 2013
author_name: Simon Maynard
author_twitter: snmaynard
author_avatar: simon
categories: features
---

We're excited to announce a brand new version of our Bugsnag [iOS](https://docs.bugsnag.com/platforms/ios/) and [OS X](https://docs.bugsnag.com/platforms/macos/) Notifier!

The new version adds several highly requested features: We can report crashes in stripped binaries, which include filename and line number, on any version of iOS or OS X. It also continues to support everything that our users already find useful, such as sending custom meta-data to help debug crashes.

### Stripped binaries (symbolication)

It's good practice to remove debug symbols from your app before you push it to the app store. This helps keep download sizes down, but it usually comes with the caveat that you will be unable to read any crash reports you get sent. Bugsnag will now fix this for you, so you can send stripped binaries to the client and we will symbolicate iOS crashes for you automatically on our servers.

### File and line number

In addition to showing you which method a crash was in, which we've always been able to do, we can now show you the exact line number of the bug. This works by adding a build phase to your project which uploads the debugging data to Bugsnag.

### OS X and 64-bit support

We now fully support binaries built to run on OS X as well as those on iOS, so you can get all the same benefits for Desktop apps as you can for Mobile. These changes also enable us to support the new iPhone 5s' 64-bit architecture out of the box.

### Application-specific data

As with all Bugsnag notifiers, you can include any data you need for debugging in the crash reports you send to us. We already include most of what you'll need, such as memory usage stats and operating system version, but it's easy to add more application specific data.

How to use it?
--------------

If you're already using [Cocoapods](http://cocoapods.org/) to manage your apps dependencies, you can simply add Bugsnag to the Podfile:

```ruby
pod 'Bugsnag'
```

If not, then we have easy to follow [setup instructions](https://github.com/bugsnag/bugsnag-cocoa#without-cocoapods).

Once installed, simply initiaiize Bugsnag and then let it catch unhandled exceptions and unexpected signals automatically. If your users ever see your app crash you can be sure that we'll let you know what went wrong, and give you enough information to debug the problem.
