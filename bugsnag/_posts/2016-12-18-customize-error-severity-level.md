---
layout: post
title: 12 Features of Christmas - Customizing error severity levels
publish_date: December 18, 2016
author_name: Josh Wold
author_twitter: joshua_wold
author_avatar: josh
categories: features
---

Day seven of 12 Features of Christmas - nearing the end! Today we're excited to announce a highly voted feature from our customers - the ability to change the severity of an error straight from the Bugsnag dashboard. Changing the severity of errors can help you triage and prioritize bugs more efficiently.

## Customizing error severity

Severity is displayed in the dashboard and can be used to filter the error list. By default all crashes (or unhandled exceptions) are set as an `error`, while users could customize the Bugsnag notifier to also send in error data with `warning` and `info` as severity options.

Starting today, we have made it possible to adjust the severity of an error in the dashboard as well, so you can make the change in the context of the error's diagnostic report.

![Change error severity from Bugsnag's UI](/img/posts/change-error-severity.gif)

## Using severity to triage and prioritize bugs more efficiently

Bugsnag packages a lot of at-a-glance type information to make it easier to quickly decipher your error data. At a glance details, like severity, give you the ability to triage some errors right from your inbox.

With the added manual control over severity, you can change errors that require immediate attention to `error` or change errors that are less serious to `warning` or `info`. When you change error severity, it will override the existing severity on all previous and future occurrences of that error.

Severity is also tied to filters in the filter bar, so you can also [filter and prioritize errors](https://www.bugsnag.com/product/#precise-filtering) based on the severity you've applied.

---

Adjustable error severity is available today to Bugsnag users.  If not you're already using Bugsnag, you can [get started with a free trial](https://app.bugsnag.com/user/new).

---

*This is one of the several new releases focused on reducing troubleshooting time. We also recently shipped [first seen / last seen tooltips](https://blog.bugsnag.com/first-and-last-seen-error-tooltips/) to quickly identify when an error first appeared or last appeared as well as bookmarks which allow you to customize and save the views of your errors.  Stay tuned for more...*
