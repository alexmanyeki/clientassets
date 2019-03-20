---
layout: post
title: Updates to debugging workflow
publish_date: February 13th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Updated debugging workflow status for open and in progress errors. Track errors from introduced to fixed using Bugsnag's built-in workflow that helps you stay up to date on progress fixing bugs.
categories: features
---

We've released an update to debugging workflows in Bugsnag, making them more intuitive so you can clearly identify `Open` errors. `Open` errors now includes all those that are new and awaiting your attention, plus those that are currently in progress and being worked on by your team.

![Bugsnag error workflow](/img/posts/error-status-sidebar.png)

This change makes it easier to understand which errors are currently top priority to look at, including when they are in progress with issues assigned to them or assigned to another team member for investigation. If you'd only like to see errors that still need to be triaged, we've added the `For Review` state.

If an error regression is detected by Bugsnag, or a Snoozed error hits its threshold, the error will automatically reopen under the `Open` status.

## Managing bug fixes with workflow status

Detecting errors in your production apps is only the first step in effective error monitoring. With all that data at your fingertips, it's equally important to actually *do* something about it, which is where your [debugging workflow](https://blog.bugsnag.com/debugging-workflow/) comes into play. The workflow features in Bugsnag make your error data actionable so you can proactively address bugs, improving the quality of your software.  

As you triage `For Review` errors in the Inbox, use workflow features to create issues or assignments for errors that need to be fixed or investigated immediately. Alternatively, `Ignore` or `Snooze` errors you'd like to disregard for now.

Error workflow will help you stay focused on new, harmful errors, while making progress addressing bugs. Having a debugging workflow in place makes the process of bug fixes easier for you and your team by removing the mental load associated with bug fixes and reducing the volume of things to look at in your Inbox.
