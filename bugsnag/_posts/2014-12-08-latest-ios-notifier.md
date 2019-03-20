---
layout: post
title: Announcing Bugsnag’s Improved iOS Notifier
publish_date: December 8th, 2014
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Today we’re excited to announce the release of the latest version of our iOS notifier that’ll make debugging your iOS applications painless. Our team’s been working hard on some awesome features to make our notifier the best iOS crash detection service available.

Built atop the proven [KSCrash](https://github.com/kstenerud/KSCrash) open source library, we’ve included all sorts of upgrades to make debugging easy. You’re getting top-tier usability and the most accurate crash reports.

Here’s what’s new:

### Full multi-threaded error reports

Our iOS error reports now contain details for *all* your threads, so you can better diagnose issues where one thread causes another to crash.  With better contextual information, you’ll
debug your software faster, and know with full confidence what was happening in your app that caused a crash.

![Multi-threaded Stacktrace](/img/posts/multi-threaded-stacktrace.png)

### Embedded framework support

Key to debugging in iOS is symbolication, where we make sure your stack trace is complete with file names, line numbers, and method names. We give you all these details regardless of whether you’ve stripped the debugging information from your app or not.

We’ve now made our symbolication support even better. We fully support the new [embedded framework](https://developer.apple.com/library/ios/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html) technology released as a part of iOS 8. This means we can symbolicate stack frames in both your application and inside any embedded frameworks you’re using.

### Improved stacktrace accuracy

We’ve improved our symbolication and stacktrace collection to bring you more accuracy where it matters. Our iOS notifier now gets you even closer to the line of code that crashed, so you can more precisely pinpoint the issue. You’ll no longer see stacktraces with Bugsnag frames, or incorrectly symbolicated line numbers. We’ve fixed any imperfect reporting for a more precise picture of what caused the crash.

![iOS Stacktrace](/img/posts/ios-stacktrace.png)

### Async safety

The new notifier is fully async-safe! Async safety guarantees we only call [async safe](http://man7.org/linux/man-pages/man7/signal.7.html) functions while handling a crash. This ultimately means your program crashes flawlessly and doesn’t lock up. We also avoid calling any objective-c code while handling a crash, so even if the runtime is in a bad state, you’ll still get your full crash report.

### Improved crash detection

In this release, we’ve expanded our crash detection to capture more errors than before. We now effectively capture stack overflow errors, and as an added bonus, we even support Apple’s [Swift](https://developer.apple.com/swift/) programming language, released as part of the iOS 8 launch. We now capture many more types of rare crashes, so you can be sure we have you covered across the board.

---

Our iOS notifier is the most accurate and user friendly error monitoring tool. Our team obsesses over crash detection and bug fixing. We’re committed to making this process as easy as possible for developers, even when it comes to mobile—our new iOS notifier accomplishes just that. Get started with [Bugsnag's automatic iOS crash reporting](https://www.bugsnag.com/platforms/ios-crash-reporting/). 

Learn more about getting setup with the Bugsnag iOS notifier [here](https://docs.bugsnag.com/platforms/ios/).
