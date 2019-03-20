---
layout: post
title: Support for Android Jack — Code obfuscation with ProGuard and Jack
publish_date: March 7, 2017
author_name: Dave Perryman
author_twitter: bugsnag
author_avatar: dave
categories: engineering
---

We’ve released support for Android’s Jack Toolchain so applications obfuscating and minifying their
code with Jack can detect crashes using Bugsnag’s Android SDK crash reporting.
This is an overview of how the Jack toolchain compares to the traditional ProGuard setup and how the
various options are used to help de-obfuscate error stack traces.

![Android logo](/img/posts/android.png)

## What is Proguard?
Since the early days of Android the default optimizer has been
[ProGuard](https://developer.android.com/studio/build/shrink-code.html). This tool gets run
during the Android compilation process to shrink and optimize your code as well as obfuscate it to
make reverse-engineering more difficult.

### Code obfuscation - How does it work?
Obfuscating the code means that the original file names, line numbers and method names are lost.
The effect of this is that any error stack traces are of limited use. It is possible
to control the way that ProGuard operates by using ProGuard configuration files. The default ProGuard
configuration makes use of the `proguard-android.txt` set of ProGuard rules and looks something like:

```
buildTypes {
  release {
    minifyEnabled true
    proguardFiles getDefaultProguardFile('proguard-android.txt')
  }
}  
```

### De-obfuscation
To display useful error stack traces Bugsnag needs to de-obfuscate stack traces that come from
apps that have been obfuscated.
[Bugsnag Gradle plugin](https://github.com/bugsnag/bugsnag-android-gradle-plugin)
modifies this by adding the following rules to the configuration:

```
-keepattributes LineNumberTable,SourceFile
-keep class com.bugsnag.android.NativeInterface { *; }
-keep class com.bugsnag.android.Breadcrumbs { *; }
-keep class com.bugsnag.android.Breadcrumbs\$Breadcrumb { *; }
-keep class com.bugsnag.android.BreadcrumbType { *; }
-keep class com.bugsnag.android.Severity { *; }
-keep class com.bugsnag.android.ndk.BugsnagObserver { *; }
```

These additional rules tell ProGuard to *not* obfuscate some Bugsnag classes, and to keep the line
numbers and source file names. ProGuard does this in two ways

 - The information is retained in the compiled application, so file names and line numbers in error stack traces are unmodified
 - ProGuard produces a `mapping.txt` file which contains the original method names and line numbers

The Bugsnag Gradle plugin uploads the `mapping.txt` file to Bugsnag and we use it to
de-obfuscate the stack traces when errors occur. The contents of the `mapping.txt` file look something like:

![](/img/posts/android-mapping-proguard.png)


This tells Bugsnag that when a stack trace contains `com.bugsnag.android.n.b:254`
that it should be mapped to `com.bugsnag.android.Error.getExceptionName():254`. It is important for
Bugsnag to have the original-line-numbers in the mapping file, because ProGuard often uses the same
obfuscated-method-name for different original-method-signatures, and the line numbers are the
only way to tell which one was actually called.

### Optimized ProGuard
ProGuard can also be used to optimize applications to improve their speed, and further reduce
the size of the compiled package. This can be done by using `proguard-android-optimize.txt`
instead of `proguard-android.txt`, these settings will cause code to be moved around or
optimized out all together.
Stack traces sent from optimized Android applications could contain an inaccurate file name (due to
code being moved around), and contain an optimized line number instead of the original line number.
The `mapping.txt` file will contain different mapping information which also includes
the obfuscated line numbers:

![](/img/posts/android-mapping-proguard-optimized.png)

This tells Bugsnag that when a stack trace contains `com.bugsnag.android.m.a:7028` then it should be
mapped to two lines:

```
com.bugsnag.android.BugsnagException.getName():28
com.bugsnag.android.Error.getExceptionName():255
```

Bugsnag will use the Class name as an approximate file name in this case as the original file name
is not available.

## Jack compiler — Compiling Android code with the Jack toolchain

The [Jack Toolchain](http://tools.android.com/tech-docs/jackandjill) is an alternative way of compiling
Android, which compiles Java source directly into Android dex bytecode, skipping a few intermediate
steps including ProGuard.

Jack has been available since SDK v21.1 (late 2014) but it has become more relevant with the
release of Android N and SDK 25 (early 2016) as it now has the ability to use
[Java 8 Language Features](https://developer.android.com/guide/platform/j8-jack.html). This means
that Android developers are starting to take notice and make the switch.

It seems likely that the Jack Toolchain will become the default way of compiling Android apps in the
future, so we need to be able to understand how it obfuscates code, and how it differs from ProGuard.

### Jack Obfuscation

At first glance the Jack toolchain optimizes code in a similar way to ProGuard, using the same
configuration files, and producing a similar mapping file.

However Jack does not support all of the configuration options that ProGuard does (which is a little
confusing). And it produces a slightly different output in the `mapping.txt` file:

![](/img/posts/android-mapping-jack.png)

The above example tells Bugsnag that when a stack trace contains `com.bugsnag.android.n.c`
that it should be mapped to `com.bugsnag.android.Error.getExceptionName()`. No line numbers are
present in the mapping file, but Jack doesn't use the same obfuscated-method-name for different
method signatures so Bugsnag can safely map the method names with this information.

By default Jack will not put the original file name or line number in error stack traces (the file
name always gets set to `null` and the line number always gets set to `-1`) so the only useful
information available is the method name. In order to get more information in error stack traces
extra parameters must be specified to the Jack compiler.

### Jack Parameters
There are a set of not-very-well-documented parameters designed to be used with Jack on the command
line that can also be specified in the Gradle config.

It is possible to get a list of these parameters by running
`$ java -jar <SDK>/build-tools/<build-tools-version>/jack.jar --help-properties`. On my machine
this outputs around 160 different parameters most of which have a single line explanation of
what they can be used for.

The two options which are useful for getting more information into the stack traces are

 - `jack.dex.debug.lines (Emit line number debug info into generated dex)`
 - `jack.dex.debug.source (Emit source file debug info into generated dex)`

These can be specified in your Gradle config as follows:

```
jackOptions {
    enabled true
    additionalParameters("jack.dex.debug.lines": "true")
    additionalParameters("jack.dex.debug.source": "true")
}
```

Adding the `jack.dex.debug.lines` retains the original line numbers. The `jack.dex.debug.source`
option when used with the `-keepattributes LineNumberTable,SourceFile` option (added to the
ProGuard configuration file) retains the original filenames in stack traces.

This set of options therefore allow Bugsnag to display the file, method, and line information for
error stack traces from Android applications compiled using the Jack toolchain. These options
are likely to increase the size of your APK. In my simple test the size of the
file went from 688KB to 737KB with the extra debugging information included, which shouldn't be a
concern for most applications.

With or without the additional Jack parameters Bugsnag will still capture errors and display the
available information on the dashboard.

## TLDR
The Jack Toolchain now offers more functionality than the traditional Android compiler and looks
likely to be the default in the future. Bugsnag now supports de-obfuscating stack traces from Android
applications compiled using Jack as long as you add
[extra options](https://docs.bugsnag.com/platforms/android/sdk/mapping/#jack-settings)
into your gradle config.

---

Get started with Bugsnag's [Android crash reporting](https://www.bugsnag.com/platforms/android/). You can learn more about getting setup in our [documentation](https://docs.bugsnag.com/platforms/android/sdk/). 

We've also released support for NDK crash reporting, so apps built using the NDK can detect crashes using Bugsnag. [Learn more in our blog](https://blog.bugsnag.com/ndk-crash-reporting/).
