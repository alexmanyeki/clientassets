---
layout: post
title: NDK Crash Reporting - Support for the Android Native Development Kit
publish_date: March 2, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We're excited to announce [NDK crash reporting with Bugsnag](https://www.bugsnag.com/platforms/android/). You can now detect crashes in apps you've built using the NDK, and specifically the parts written in native-code. Crash reports from Bugsnag include fully, [de-obfuscated stacktraces for both Java and C++](https://docs.bugsnag.com/platforms/android/ndk/#showing-full-stacktraces).

![NDK stacktrace](/img/posts/ndk-stacktrace.png)

## NDK crash reporting — Android crash reports

![NDK stacktrace](/img/posts/android.png)

Android NDK allows you to implement your Android apps using C and C++, which is especially good for performance intensive tasks. Plus you can also reuse libraries written in these languages across applications.

Integrating with the [notifier library for NDK](https://github.com/bugsnag/bugsnag-android-ndk) from Bugsnag is simple using Gradle or Maven. Once you've started sending crashes from your NDK apps to Bugsnag, you'll start receiving crash reports with information on both the Java and C++ environment, including application, device, and system information.

You can also customize your Bugsnag configuration to get added value out of your crash reports. Sending extra diagnostic data can save you time and make it easier to debug crashes later on. Send user information to correlate crashes with customers, or log breadcrumbs as a way of seeing a timeline of events leading up to each crash. You can also set your app version to allow for easier [filtering](https://blog.bugsnag.com/new-filter-bar-tips/) and prioritization.  

---

Learn more about Bugsnag's [NDK crash reporting](https://docs.bugsnag.com/platforms/android/). For further information on getting started, visit our [documentation](https://docs.bugsnag.com/platforms/android/ndk/).

We also recently released support for Android's new Jack toolchain, so applications obfuscating and minifying their code with Jack can detect crashes using Bugsnag. [Learn more in our blog](https://blog.bugsnag.com/android-jack-toolchain/). 
