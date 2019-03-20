---
layout: post
title: 12 Features of Christmas - Commenting on errors supports @mentions
publish_date: December 19, 2016
author_name: Josh Wold
author_twitter: joshua_wold
author_avatar: josh
categories: features
---

For day eight of our 12 Features of Christmas, we're doubling down on collaboration. Today we're excited to release support for @mentions in comments in Bugsnag. You can now mention other collaborators from your organization in comments on an error to help you collaborate on a fix.

![@Mentions in comments](/img/posts/mentions-in-comments.gif)

## Collaborating on application errors

Debugging is as much about your team as it is about the bug itself, and so being able to loop in the right people easily can help you work together on a fix.

Bugsnag supports commenting on errors within Bugsnag to facilitate collaboration within the context you need for debugging. You can investigate how to reproduce an error from comprehensive diagnostic data, and loop in other team members who may be able to provide more context or can learn from what you've concluded. Often this is very useful in the initial troubleshooting stage before an issue is created to track fixing the error.

Discussing errors in context in Bugsnag can be beneficial because it tends to be a way to leave helpful comments about the errors that can also be used in the future as a reference in case the error comes back.

## Comments left in Bugsnag sync to your issue tracker

Bugsnag integrates with nearly 30 different [issue tracking tools](https://www.bugsnag.com/product/#issue-tracker-sync). As we don't want conversations to exist in isolation within Bugsnag, our [two-way sync issue tracker integrations](https://blog.bugsnag.com/issue-tracker-sync/) will copy comments left in Bugsnag to your issue tracker so you'll have a full history of any discussion to reference in both tools.

---

You can configure @mentions in your [Bugsnag settings](https://app.bugsnag.com/settings). Navitage to *Email Notifications* > *Notify me when*.

@mentions are available today for Bugsnag users.  [Try it out today](https://app.bugsnag.com).

---

*This is part of a series of releases to improve error handling workflow and collaboration. We also recently shipped [notifications for error workflow changes](https://blog.bugsnag.com/alerts-for-collaborator-actions/) so everyone is kept in the loop as errors are worked on and the ability to customize the issue name for issue tracker integrations.  Stay tuned for more...*
