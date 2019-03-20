---
layout: post
title: Essential Gradle Plugins for Android Development
publish_date: January 19th, 2015
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: engineering
---

Google [released Android Studio 1.0](http://android-developers.blogspot.com/2014/12/android-studio-10.html) in early December, which is now the recommended way to develop and build Android apps. Android Studio uses the awesome [Gradle](https://www.gradle.org) build system under the hood, which offers a more effective way to build Java apps, powered by a Groovy DSL.

![Gradle logo](/img/posts/gradle-android.jpg)

One of the best things about Gradle is its extensibility. You can easily add plugins to your build scripts to help with various common tasks. Here are a few essential plugins which should help speed up your Android app development process!


Android SDK Manager Plugin
--------------------------

https://github.com/JakeWharton/sdk-manager-plugin

Is your Android SDK missing? Is the API level not downloaded? Or maybe your support library's out-of-date?

These are all typical problems that you shouldn't have to deal with. They're
especially painful when you have multiple developers on a project or you're
using continuous integration tools, like Travis CI or Jenkins that must be
kept up-to-date.

The [Android SDK Manager](https://github.com/JakeWharton/sdk-manager-plugin)
plugin from the awesome [Jake Wharton](http://jakewharton.com/) will automatically manage
these SDK dependencies for you before running `gradle build`
and other common Gradle build actions.

We use this Gradle plugin in the [Bugsnag for Android](https://github.com/bugsnag/bugsnag-android) build process to make sure all collaborators have an up-to-date Android SDK.


Gradle Git Plugin
-----------------

https://github.com/ajoberstar/gradle-git/wiki

Do you use Git or GitHub to store and collaborate around code? How do you manage and tag your app's version numbers? It's often useful to interact with Git when developing and releasing Android apps, and it's now possible to do this using Gradle plugins!

The [gradle-git plugin](https://github.com/ajoberstar/gradle-git/wiki) offers a set of plugins supporting interaction with Git within Gradle including managing your release process, general Git actions, and even publishing to a Github Pages website.

You can even manage your versioning scheme, for example using [Semantic Versioning](http://semver.org/), tagging versions in Git as part of each release!


Gradle Play Publisher
---------------------

https://github.com/Triple-T/gradle-play-publisher

So you've built your app and it's ready for release, but now you have to go through the tedious process of uploading your APK to the Google Play Store.

At Google I/O 2014, Google announced a new API for uploading/publishing your Android APKs, which makes it much easier to get your apps live.

The [Gradle Play Publisher](https://github.com/Triple-T/gradle-play-publisher) plugin by Triple-T allows you to automatically upload your APK and app details to the Google Play Store as part of a build!


Gradle Maven Push
-----------------

https://github.com/chrisbanes/gradle-mvn-push

What if you're publishing an [Android Library Project](http://tools.android.com/tech-docs/new-build-system/user-guide#TOC-Creating-a-Library-Project) instead of an app? You'll probably want to make it available on [Maven Central](http://search.maven.org/) so other Android developers can pull in your library using Gradle.

The [Gradle Maven Push](https://github.com/chrisbanes/gradle-mvn-push) plugin by the epic [Chris Banes](https://chris.banes.me/) allows you to upload Android Artifacts to Maven repositories as part of your build process.

We use this Gradle plugin in the [Bugsnag for Android](https://github.com/bugsnag/bugsnag-android) build process.


Bugsnag Android Gradle Plugin
-----------------------------

https://github.com/bugsnag/bugsnag-android-gradle-plugin

If you're using [ProGuard](http://developer.android.com/tools/help/proguard.html) to minify or obfuscate your applications, this'll mean your crash reports will also be obfuscated, making crashes harder to diagnose and fix.

The [Bugsnag Android Gradle Plugin](https://github.com/bugsnag/bugsnag-android-gradle-plugin) automatically uploads your ProGuard mapping files as part of each build, meaning crash reports are automatically de-obfuscated on your Bugsnag dashboard!

We're clearly biased on this one :)


---

Did we miss any awesome Gradle plugins? What does the build process look like for your Android apps? Let us know on [Twitter](https://twitter.com/bugsnag)!

You should check out [Bugsnag's automatic Android crash reporting](https://www.bugsnag.com/platforms/android/).
