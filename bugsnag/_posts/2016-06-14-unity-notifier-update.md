---
layout: post
title: Unity Notifier Upgrades — Unity 5 support and more detailed error reports
publish_date: June 14th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We've added powerful features to the Bugsnag Unity notifier to help you debug your games more easily. The latest update gives you more detailed error reports and expanded support for Unity 5, WebGL, and OS X. Here's a quick look at what's new.

![Unity logo](/img/posts/unity-logo.png)

## Identify users impacted

You can assess the severity of crashes by seeing how many of your users have been affected by it. Bugsnag automatically generates unique user IDs, but you can also set this yourself which lets you track users based on usernames or email.

This feature also lets you correlate customer support requests with crash reports in Bugsnag. Once you've set user, you can filter to find errors reported by customers who reach out to you.

## Set app version

Correlate errors with app versions to discover where crashes are introduced. With this feature, you can track errors over time to see if you've actually fixed them, or if there are regressions in newer versions of your app.

You can also filter by app version to only see errors coming from newer versions of your app.

## Breadcrumbs

Do you ever have trouble reproducing crashes in your Unity games? It can be time consuming without the right crash information. [Breadcrumbs](https://docs.bugsnag.com/platforms/unity/#logging-breadcrumbs) let you log the actions a user took that led up to a crash. You'll see the 20 breadcrumbs leading up to a crash by default, making it easier and faster to reproduce crashes.

![Unity breadcrumbs](/img/posts/unity-breadcrumbs.png)

## Unity 5 support

[Unity 5](https://unity3d.com/5) gives developers more artistic control over their games — with the ability to [enhance games with better visuals and audio](https://unity3d.com/unity/whats-new/unity-5.0), Unity developers can make their games more fun. We've added support for Unity 5 to allow you to create better games, with the standard of quality your users expect. The latest Bugsnag Unity notifier automatically captures crashes in Unity 5.

## Support for WebGL and OS X

We've added support for web browser games and OS X desktop games, so you can monitor for crashes across platforms.

---

To learn more about the Bugsnag Unity notifier, visit our [docs](https://docs.bugsnag.com/platforms/unity/).
