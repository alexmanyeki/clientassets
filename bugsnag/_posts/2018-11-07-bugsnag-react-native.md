---
layout: post
title: Crash reporting for React Native
publish_date: November 7, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Bugsnag offers best in class support for React Native crash reporting, plus source maps and CodePush. You can also use it to determine the stability of your React Native app releases.
categories: features
hero_image: bugsnag-react-native.png
cover_image: bugsnag-react-native-cover.png
---

One of the platforms we've been most excited about over the last couple of years is React Native. Since [Bugsnag for React Native](https://github.com/bugsnag/bugsnag-react-native) launched in October 2016, we've added support for App Center CodePush and automatic breadcrumbs, and released the stability score. In collaboration with the [engineering team at Airbnb](https://medium.com/airbnb-engineering/react-native-at-airbnb-the-technology-dafd0b43838), we were able to identify common problems when detecting crashes and reports in React Native. All this work has led many teams, like [Zynga and the popular game *Words With Friends*](https://medium.com/zynga-engineering/why-how-words-with-friends-is-adopting-react-native-b24a405f421c), to adopt Bugsnag for "best in class support for React Native and sourcemaps."

[Bugsnag for React Native](https://www.bugsnag.com/platforms/react-native-error-reporting/) allows you to automatically detect crashes in your React Native applications and gives you a stability score for every release. This metric can help you decide if you should be building new features or fixing bugs that impact your users.

## Detect crashes in your React Native apps

One of the tricky problems with React Native crash reporting is identifying the source of the crash (is it in your JavaScript or native code?) and properly applying mapping files in order to reveal a readable stacktrace.

Bugsnag for React Native detects crashes across the JavaScript and native platform layers (iOS and Android), and reports those errors in a single project. We support [source maps for the JavaScript layer](https://docs.bugsnag.com/platforms/react-native/showing-full-stacktraces/#uploading-source-maps), [dSYMs for iOS](https://docs.bugsnag.com/api/dsym-upload/), and [ProGuard mapping files for Android](https://docs.bugsnag.com/api/android-mapping-upload/) so you receive a fully de-minified/de-obfuscated stacktrace for every crash, regardless of where it originates in your code.

![React Native Stacktrace](/img/posts/react-native-stacktrace.png)

## React Native + App Center CodePush

Since the time of our launch, [App Center CodePush](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/) emerged as a popular tool for deploying updates directly to users of React Native applications. There are some limitations as you can only update your JavaScript bundle, but it's a powerful tool for deploying hot fixes and enhancements quickly to your users.

Bugsnag supports App Center CodePush so you can make use of this tool alongside your crash reporting. That way you can monitor CodePush releases with Bugsnag and make sure you haven't accidentally introduced any new bugs through your JavaScript updates.     

[Visit the docs here](https://docs.bugsnag.com/platforms/react-native/showing-full-stacktraces/#how-should-i-upload-source-maps-if-i-39-m-using-codepush).

## Stability score for your React Native releases

Understanding application stability is key for all software teams, but especially for teams deploying React Native applications where there are many variables at play. Every time you make a release, Bugsnag assigns a [stability score](https://blog.bugsnag.com/stability-score/) out of 100% to let you know if you are hitting your targets for stability, or if you've introduced bugs into your application.

![Stability Score](/img/posts/stability-score.png)

It's a metric that can have a [huge business impact](https://blog.bugsnag.com/how-application-stability-impacts-business-growth/), and can also help teams prioritize work—should we be building new features or do we need to spend time debugging to stabilize the app?  

## React Native crash reports

#### Automatically captured React Native data  

Along with a full stacktrace, Bugsnag for React Native also automatically collects important diagnostic information about the crash. Here's a list of all the data Bugsnag will capture automatically:

- Stacktrace
- Battery state
- Device model + OS version
- Thread state
- App running duration in foreground or background
- Device + vendor specific identifier

You also have the option to add custom data to every crash report which can add further debugging context or help with error prioritization.

[Learn more in the docs](https://docs.bugsnag.com/platforms/react-native/#sending-diagnostic-data).

#### Tie React Native crashes to users

Understanding which users are experiencing crashes is helpful when prioritizing errors. You should choose to investigate widespread errors that impact the most users first.

You can also use this feature to identify crashes experienced by your VIP customers. In addition to setting the user, add custom data to the crash report to identify the plan tier or subscription level of your customer.

[Learn how to set users in the docs](https://docs.bugsnag.com/platforms/react-native/#identifying-users).

#### React Native breadcrumbs

Breadcrumbs are useful for reproducing a crash. They are a timeline of automatically captured user actions and system broadcasts leading up to the crash being detected.

You also have the option to log custom breadcrumbs to add additional context to your breadcrumbs timeline.

[Learn more in the docs](https://docs.bugsnag.com/platforms/react-native/#logging-breadcrumbs).

---

Installing [Bugsnag for React Native](https://www.bugsnag.com/platforms/react-native-error-reporting/) has been optimized to be as easy as possible, and includes an installation script that automatically sets up the native portions of your application.

If you're new to Bugsnag, you can [try it out](https://app.bugsnag.com/user/new) with our 14-day free trial.
