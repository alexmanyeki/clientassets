---
layout: post
title: "Notification Improvements: Alerts for every situation"
publish_date: September 30th, 2014
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Bugsnag puts you on the frontline of your application, alerting you to issues that need your attention. And now, we’ve made our notifications even more robust, with upgrades that make it easier than ever for your team to stay connected.

Here’s what’s new:

## Only contact me in case of emergency
*Filter notifications by severity and release stage*

Getting alerted to non-critical information is a noisy interruption. It's hard to pay attention to a notification stream when the information you care about gets lost in the feed.

Now you can configure Bugsnag to only send you the notifications that matter most.

<div class="large frame right">
  <img src="/img/posts/filters.png" alt="screen shot of the settings panel for slack notifications with filters"/>
</div>

This is also exciting if you’re integrating Bugsnag with [PagerDuty](http://pagerduty.com). Choose to only get notified about severe crashes in production, so those midnight wake up calls will never be anything less than urgent. We can still notify you of other errors via email and within your Bugsnag dashboard.

## Keep everyone in the loop
*Alerts in multiple chat rooms*

We’ve also made it possible to split out your team chat notifications so you can see them in more than one place. Are you using a team chat tool like Slack or HipChat? This is your solution for managing teams with different information needs.

For example, developers need notifications to help them troubleshoot when they’re deploying to staging, but support teams only need to know when things are broken in production.

You can choose to send all developer focused information to a *Dev* chatroom, for example, and only the most serious crashes in production to a *Support* chatroom.

## Avoid the Noise
*Disable notifications when it’s loud*  

Sometimes things break, but receiving alerts for every error is a redundant distraction. We’ve made it possible to temporarily disable your error notifications so you can stay focused and fix the issue.

![](/img/posts/disabled.png)

Re-enable them once the dust has settled, and we’ll immediately start alerting you to relevant errors.

## Jump into the conversation
*Get notified of new comment activity*  

We’ve rolled out comment notifications so you can stay on top of your team's progress on an error. Jump in on the conversation and help, or use our notifications to keep up to date on status.

<div class="large frame right">
  <img src="/img/posts/comment.png" alt="screen shot of the settings for when errors are posted in slack"/>
</div>

And of course, all of these improvements can be configured for both your [team chat integrations](https://www.bugsnag.com/integrations/#chat) and your [email settings](https://app.bugsnag.com/user/sign_in).

Let us know what you think of these upgrades on [Twitter](https://twitter.com/bugsnag).
