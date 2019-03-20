---
layout: post
title: Bugsnag now supports Code Push for React Native  
publish_date: March 8, 2017
author_name: Katie Lane
author_twitter: bugsnag
author_avatar: katie
categories: features
hero_image: bugsnag_react_codepush.png
---

A few months back, we announced support for [React Native crash reporting](https://www.bugsnag.com/platforms/react-native-error-reporting/), and since then, [React Native](https://docs.bugsnag.com/platforms/react-native/) has quickly become one of our most popular platforms. This is no surprise, given its range of benefits, from speed of deployment across iOS and Android, to the skills transfer for JavaScript developers and, as it’s name indicates, the ability to render hybrid apps natively. But easily one of our favorite features is React Native’s integration with Microsoft Code Push: the magical ability to push updates without having to go through the App Store update process. [Code Push](https://microsoft.github.io/code-push/) comes with some caveats of course.

#### What you CANNOT use CodePush for:
* Code that touches the native side of React Native. These changes will require an App Store update.
* Updates that impact the overall purpose of your app (via Apple’s Developer agreement), so keep it within reason.

#### What you CAN use CodePush for:
* Code updates related to your JavaScript bundle and any associated assets (ex. images).

This last one makes Code Push a perfect tool for hot bug fixes, and combined with Bugsnag, you’ll be able to easily identify the bugs that need fixing. Bugsnag gives you visibility into when your apps crash in production. We will point you to the line of code that caused the crash even for minified and obfuscated JavaScript, so you can easily fix the error, and push out a new release with CodePush. To complete this cycle of identifying and fixing bugs, you’ll also want visibility into your newly Code Pushed release. This is just what we’ve added. Thanks to [Code Push’s latest release](https://github.com/Microsoft/code-push/releases/tag/v1.12.8-beta), you can integrate Bugsnag into your development process in just a few lines.

## How does Code Push integrate with Bugsnag?
To get full visibility of an error, Bugsnag uses source maps to de-obfuscate JavaScript stack traces. Bugsnag has a Source Map Upload API to help with this. When you release your app with Code Push, you'll define a `codeBundleId` (like a version for Code Push), and send us the source maps associated with that `codeBundleId`. Bugsnag will link the errors you send, with the associated source maps, so it’s easy to see what line of code caused the error.

## The Details
Before you deploy, the `codeBundleId` gets defined in your Bugsnag configuration.

```
const config = new Configuration('YOUR_API_KEY_HERE');
config.codeBundleId = '1.0-123'
const bugsnag = new Client(config);
```

When you release your app, specify the `--sourcemapOutput` or `--outputDir` in order to capture the source map and asset bundle files for upload.

```
code-push release-react <appName> <platform> --outputDir <outputDir> <other options>
```
And finally, send Bugsnag your source maps, making sure to include the `codeBundleId` and source map path.

```
$ curl https://upload.bugsnag.com/ \
  -F apiKey=YOUR_API_KEY_HERE \
  -F codeBundleId=1.0-123 \
  -F minifiedUrl="main.jsbundle" \
  -F sourceMap=@path/to/main.jsbundle.map \
  -F minifiedFile=@path/to/main.jsbundle \
  -F overwrite=true
  -F */index.ios.js=@/workspace/app/index.ios.js
```

For a full rundown of each of these steps, make sure to check out the [Bugsnag docs](https://docs.bugsnag.com/platforms/react-native/showing-full-stacktraces/#how-should-i-upload-source-maps-if-i-39-m-using-codepush). We hope this new support is useful as more and more of you continue to roll out React Native apps.
