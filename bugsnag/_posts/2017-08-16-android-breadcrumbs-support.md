---
layout: post
title: Introducing automatic breadcrumbs for Android
publish_date: August 16th, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
hero_image: android-breadcrumbs.png
---

Today we're announcing a major release of our [Android error reporting library](https://github.com/bugsnag/bugsnag-android) including [automatic breadcrumbs](https://docs.bugsnag.com/platforms/android/sdk/#application-lifecycles-and-broadcasts). We've also implemented many improvements to modernize the library and improve your experience using it.  

### What are automatic breadcrumbs?

Android breadcrumbs will show you a timeline of navigation events and system broadcasts leading up to the crash being detected by Bugsnag. This timeline of breadcrumbs makes it easy to see how your user interacted with your app and how it might have triggered a crash. It can also help in reproducing crashes in a faster, more straightforward way. Here are some of the types of breadcrumbs we'll capture on Android:

* Activity lifecycle (screens navigated to)
* Network connectivity
* Bluetooth connection status
* Low battery
* Turning the screen on and off
* Other device metrics and more  

In addition to automatic breadcrumbs, you can also [manually log your own  breadcrumbs](https://docs.bugsnag.com/platforms/android/sdk/#logging-breadcrumbs) with information unique to your application. These can also help you debug your app effectively.

![Android breadcrumbs](/img/posts/android-auto-breadcrumbs.png)

You'll find breadcrumbs attached to each error report where Bugsnag was able to capture them.

![Android error report](/img/posts/android-error-report.png)

### Other improvements and changes

Since [Google has deprecated](https://developer.android.com/preview/behavior-changes.html#privacy-all) `Android_ID` we've switched user information to a randomly generated user ID for each installation. You can see a full list of changes and bug fixes in our [changelog](https://github.com/bugsnag/bugsnag-android/blob/master/CHANGELOG.md).

### What does this mean for me?

Existing Bugsnag users should upgrade the Bugsnag Android library to 4.0.0, our latest version. You'll just need to change the version number for the Bugsnag notifier in the `build.gradle` file.

We've increased our `minSdkVersion` to 14, so if you are supporting older versions of Android, you will also need to increase the `minSdkVersion` to 14 or above in order to use this release.

Please visit our [documentation](https://github.com/bugsnag/bugsnag-android/blob/master/UPGRADING.md) and [changelog](https://github.com/bugsnag/bugsnag-android/blob/master/CHANGELOG.md) for more information on this release, including upgrading.

---

Are you looking to try out automatic breadcrumbs, but using a different platform? Sure thing! We also support automatic breadcrumbs on [JavaScript](https://docs.bugsnag.com/platforms/browsers/#leaving-breadcrumbs), [React Native](https://docs.bugsnag.com/platforms/react-native/#logging-breadcrumbs), [iOS](https://docs.bugsnag.com/platforms/ios/#logging-breadcrumbs), [tvOS](https://docs.bugsnag.com/platforms/tvos/#logging-breadcrumbs), [macOS](https://docs.bugsnag.com/platforms/macos/#logging-breadcrumbs), and  [Laravel](https://docs.bugsnag.com/platforms/php/laravel/#logging-breadcrumbs). You'll see them automatically attached to error reports in your Bugsnag dashboard when you integrate with our [open source error reporting library](https://github.com/bugsnag) and begin sending errors.

If you haven't yet, be sure to try out Bugsnag's [Android crash reporting](https://www.bugsnag.com/platforms/android/). [Get started for free](https://app.bugsnag.com/user/new/).
