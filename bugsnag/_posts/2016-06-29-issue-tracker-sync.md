---
layout: post
title: Issue tracker sync - New integration features
publish_date: June 29th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

If you're using Bugsnag with your issue tracker, get ready for some incredible upgrades to your bug fixing workflow. It's called issue tracker sync and it connects Bugsnag with your issue tracker seamlessly. Today we're rolling out this feature for [GitHub Issues](https://github.com/), [JIRA](https://www.atlassian.com/software/jira), [Pivotal Tracker](https://www.pivotaltracker.com/), [Trello](https://trello.com/), [Asana](https://asana.com), and [Bitbucket Issues](https://bitbucket.org/).

The idea is simple, but powerful. The status of errors in Bugsnag will be reflected in your issue tracker, and vice versa. Whether you look at your Bugsnag Dashboard or at your issue tracker, they'll both be a source of truth to the state of errors in your application. It's so good you'll be asking yourself why it didn't always work this way!

![issue tracker sync](/img/posts/issue-tracker-automation.png)

## Why issue tracker sync?  

Errors are dynamic — their states frequently change with new releases or your own progress bug fixing, but tracking these changes in multiple tools can be a challenge. With issue tracker sync, the process is automated for you entirely. Errors and their corresponding tickets will automatically sync up.

## How does it work?

Getting started is easy. When you identify an error that needs fixing, create an issue from directly within the Bugsnag Dashboard. When you mark the error *Fixed* in Bugsnag, it will change the state of the linked issue to match. You can also take the action from your issue tracker and the error in Bugsnag will automatically sync up. Simple!

You can find these options in [Settings](https://app.bugsnag.com/user/sign_in) > Integrations > *Your issue tracker* > Automation.

![Automation](/img/posts/integration-automation.png)

You have full control over issue tracker sync. The integration is configurable from top to bottom, so you can choose where automation happens from a checked box. If your issue tracker has multiple states for issues, you can also configure those in your [settings](https://app.bugsnag.com/user/sign_in).

![Automation options](/img/posts/automation-options.png)

Error regressions detected by Bugsnag will also be tracked for you by reopening the closed issue.

---

We're really excited to bring more precise workflow automation to Bugsnag. Issue tracker sync will save you and your team time and effort in your bug fixing workflow. We hope this makes it easier so you can get back to building features for your customers.

For the latest feature releases and news from our team, be sure to follow us on [Twitter](https://twitter.com/bugsnag).
