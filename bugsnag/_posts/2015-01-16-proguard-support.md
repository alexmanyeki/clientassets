---
layout: post
title: Retrace stacktraces in Android with ProGuard support
publish_date: January 16th, 2015
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: features
---

Bugsnag has long-supported symbolicating iOS stacktraces, and now we can also
retrace Android stacktraces with [ProGuard](http://proguard.sourceforge.net).

ProGuard has become an important part of developing an Android app. It reduces the size
of your code, and makes it harder for people to reverse engineer it. The only
difficulty is that it can make it harder to debug problems in your code.

To fix this you can upload your ProGuard mapping file to Bugsnag, and we'll undo
the obfuscation to retrace your stacktraces. You'll see a complete stacktrace with file names and line numbers, giving you better context on errors happening in your Android apps.

It's easy to set up:

### 1. Make sure you're keeping line numbers

Bugsnag uses line numbers to de-duplicate crashes, so you need to configure ProGuard to keep
line numbers and source files. You can do this by adding the following line to your `proguard.prg`:

    -keepattributes LineNumberTable,SourceFile


### 2. Upload using Gradle

Bugsnag integrates with the Android Gradle build system to automatically upload ProGuard
files when you rebuild your app. To do this, add the following to your `build.gradle`

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.bugsnag:bugsnag-android-gradle-plugin:+'
    }
}

apply plugin: 'bugsnag'
```


### 3. Upload using the API

If you're not using the gradle plugin, or you need a more custom process, you can upload
a ProGuard file using [our API](https://docs.bugsnag.com/api/android-mapping-upload/).

---

Any questions for us? Reach us on [Twitter](https://twitter.com/bugsnag)! For more details, read about [Bugsnag's Android Crash Reporting](https://www.bugsnag.com/platforms/android/).
