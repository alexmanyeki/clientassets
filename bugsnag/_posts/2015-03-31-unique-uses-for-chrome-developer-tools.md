---
layout: post
title: "Using the Chrome DevTools Everywhere: It's not just for the browser"
publish_date: March 31st, 2015
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: engineering
---

We've all experienced the awesome UI and powerful features of [Chrome Developer Tools](https://developer.chrome.com/devtools). They're a dream for web developers, making it easy to dive deep into your applications, right within your browser console.

With such incredible benefits, could we possibly use this tool for applications that live outside of the browser?

The answer is yes! Thanks to many inventive developers, the Chrome Developer Tools can be configured to help analyze, manipulate, and debug apps that exist outside the browser. How cool is that?  

Here are 5 things you might not know you can do with Chrome DevTools:

## Debugging Native iOS Applications

![PonyDebugger](/img/posts/ponydebugger.png)

With the magic of [PonyDebugger](https://github.com/square/PonyDebugger), you can debug network traffic and data stores in native iOS apps. It's possible thanks to the mobile team at Square who wanted to take advantage of the awesome debugging tools available to web developers. You can read more about how it works [here](https://corner.squareup.com/2012/08/ponydebugger-remote-debugging.html).

![React Native](/img/posts/react-native.png)

You can also debug your iOS applications written in [React Native](http://facebook.github.io/react-native/) using DevTools. Facebook has built this integration right into the framework, so you can [get setup](http://facebook.github.io/react-native/docs/debugging.html#content) really easily.

## Debugging Native Android Applications

![stetho](/img/posts/stetho.png)

[Stetho](https://code.facebook.com/posts/393927910787513/stetho-a-new-debugging-platform-for-android/) lets you debug native Android applications using the Developer Tools interface. Built by Facebook, Stetho allows for easier, more convenient debugging. You can see details on installing it [here](https://github.com/facebook/stetho).

## Remote Debugging Chrome on Android

![Android Debugging](/img/posts/android-debugging.png)

You can also use the desktop Chrome inspector to [remotely debug mobile Chrome web performance](https://developer.chrome.com/devtools/docs/remote-debugging). It also lets you debug WebViews on native Android apps! This is actually built right into it's functionality so you can easily hookup your Android device to your computer to use the awesome Developer Tools.

## Debugging Node.js

![Node-inspector](/img/posts/node-inspector.png)

Another popular way to use the browser console is with Node.js. With [Node-inspector](https://github.com/node-inspector/node-inspector), you can connect your Node.js applications to the browser tools for more convenient debugging.


## Debugging Ruby and Rails Apps

![Ruby Console.log](/img/posts/ruby-console.log.png)

Another cool way to use the Chrome Console is with [console.log](https://github.com/ConradIrwin/console.log) from Ruby (not to be confused with JavaScript's). Built by our own [Conrad Irwin](https://twitter.com/conradirwin), this tool lets you log to the Chrome Console from your Ruby and Rails applications. Debugging Ruby apps has never been so delightful!


## Debugging Other Server Side Apps

![Chrome Logger](/img/posts/chrome-logger.gif)

Last but not least, [Chrome Logger](https://github.com/ccampbell/chromelogger) does it all, allowing you to easily debug your server side apps in all programming languages. It's been helped along by the open source community, and you can find the full list of server side libraries [here](https://github.com/ccampbell/chromelogger#libraries).

---

These tools are perfect examples of just how powerful the Chrome DevTools are for interacting with your applications. The convenient UI makes it easy to access important parts of your application—even the ones that don't live in the browser.

For those that do, you should try Bugsnag's [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/)!

Have you come across any other cool uses for the Chrome Developer Tools? Let us know on [Twitter](https://twitter.com/bugsnag)!
