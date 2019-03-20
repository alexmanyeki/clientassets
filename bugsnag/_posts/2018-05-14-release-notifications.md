---
layout: post
title: Get notified to new releases in Bugsnag
publish_date: May 14th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: The Releases dashboard helps you improve product stability by tracking the health of releases. Notify yourself of new releases via Slack and email to keep ahead of errors.  
categories: features
---

Get notified when new releases are detected by Bugsnag via email and Slack to stay aware your application's health in production. These notifications link back to your Bugsnag [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/) where you can track the health of the release and investigate new errors introduced if necessary.

![Bugsnag release notification in Slack](/img/posts/slack-release-notification.png)

If you've integrated using one of our [build tool integrations](https://docs.bugsnag.com/build-integrations/), you'll also be able to view the source code and code changes associated with the release. All of this information can help you decide if your release needs additional work, or even if you need to rollback. That way, you can ensure that your application's stability in production meets your standards and delivers a great experience for your end user.

![Bugsnag release notification via email](/img/posts/email-release-notification.png)

## Setting up Release notifications

To get started with release notifications, visit your [settings in the Bugsnag dashboard](https://app.bugsnag.com/settings/) and navigate to `My email notifications`. You can also set this notification up for all [team chat integrations](https://www.bugsnag.com/integrations/#chat) by visiting `Integrations`. Then select *Notify me when a new release has been detected*. Bugsnag will then automatically notify you each time a release has been detected.

---

To learn more about Releases in Bugsnag, please [visit our documentation](https://docs.bugsnag.com/api/sessions/).
