---
layout: post
title: "Twelve Features of Christmas Day 5: Device & Hostname Breakdowns"
publish_date: December 14th, 2013
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

We're continuing our *Twelve Features of Christmas* today, even through the weekend! Day five brings a feature which should help you solve errors faster by showing patterns in which mobile device type or server hostnames are experiencing crashes.


## Device breakdown

Crashes on mobile apps are often caused by subtle differences between the type of phone your users have. Starting today, we now show you a breakdown of the devices which experienced each crash right on the error details page of your Bugsnag dashboard. Where possible, we've also backpopulated this breakdown using data we have already collected, so you might even see the results immediately! We also recommend upgrading your [iOS](https://docs.bugsnag.com/platforms/ios/) and [Android](https://docs.bugsnag.com/platforms/android/sdk/) notifiers to ensure you can take advantage of all the great new features we've rolled out recently.

![](/img/posts/device-breakdown.png)


## Hostname breakdown

Although backend apps, such as Rails, Node.js or PHP apps generally have a more controlled environment than mobile apps, there can still be subtle differences between the servers your code is running on. For example, you might have forgotten to update your ruby version on one particular server, which could cause your code to crash. If you update your [Ruby](https://docs.bugsnag.com/platforms/ruby/), [Node](https://docs.bugsnag.com/platforms/nodejs/), [Java](https://docs.bugsnag.com/platforms/java/), [PHP](https://docs.bugsnag.com/platforms/php/) or [Python](https://docs.bugsnag.com/platforms/python/) Bugsnag notifier library today to the latest version, you'll now see a hostname breakdown right on your dashboard for any future errors!

![](/img/posts/hostname-breakdown.png)


## We'd Love Your Feedback

Get in contact with us [via email](mailto:support@bugsnag.com) to tell us what you think about the new feature. We'd love to hear your feedback! Stay posted via our blog or [twitter](https://twitter.com/bugsnag) to see what we release tomorrow!
