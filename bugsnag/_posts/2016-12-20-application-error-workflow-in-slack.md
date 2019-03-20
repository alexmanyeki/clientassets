---
layout: post
title: 12 Features of Christmas - Manage Bugsnag errors directly from Slack   
publish_date: December 20, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

It's day 9 of the 12 Features of Christmas, and we've released Slack workflow buttons to help you manage errors directly from your Slack app.

Many engineering teams spend a lot of time in Slack monitoring notifications from their various development tools and collaborating with their team. With Bugsnag workflow buttons in Slack, you can enhance your existing workflow to move production errors through your bug fixing process, or take action to clear them from your Bugsnag inbox and notifications, all without leaving Slack.

![Slack workflow buttons](/img/posts/slack-workflow-buttons.gif)

## Triaging errors using Bugsnag's workflow

When you receive an error notification from Bugsnag in Slack, you'll now see buttons that let you mark the error fixed or ignored, or snooze it for one hour. These workflow actions can help you manage error noise and move errors through your bug fixing workflow.

When you mark errors as fixed, you'll clear the error and its notifications away. Bugsnag will alert you in the future if there is a regression, so you'll know immediately if a problematic error returns in a later version of your application.

![Fixed error tooltip](/img/posts/fixed-error-tooltip.png)

Ignoring an error will permanently silence notifications for the error. This can be helpful for errors you know you will not fix, like errors coming from browser extensions, or any errors that are triggered by code that isn't yours.

Finally, there's snooze which allows you to temporarily silence notifications for an error if you know you'll want to investigate it, but not immediately. The notifications are snoozed for a specified period of time, and then return to remind you about the error.

Of course you can still manage errors from your Bugsnag dashboard if your prefer, but Slack workflow buttons can be useful for reducing context switching and help you triage errors effectively.

## Configuring workflow buttons in Slack

Integrate now with Slack in your [Bugsnag settings](https://app.bugsnag.com/settings) to get started using Bugsnag workflow buttons.

If you've already integrated Bugsnag with Slack, you'll need to update your configuration to get this working. Go to your Slack integration in your [Bugsnag settings](https://app.bugsnag.com/settings) and select *Configure integration*. Select *Update integration* and you'll be walked through steps to activate workflow buttons.

![New Slack integration configuration](/img/posts/update-slack-integration.png)

---

We hope you'll be able to streamline your workflow using workflow buttons in Slack to stay focused on your work and manage errors efficiently. There's still more to come in the 12 Features of Christmas so stay tuned!  

*This blog is one a series of product improvements to foster collaboration and improve error handling workflow for our users.*
