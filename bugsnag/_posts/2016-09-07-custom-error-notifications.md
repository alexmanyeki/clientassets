---
layout: post
title: "Managing error notifications: Custom snooze thresholds"
publish_date: September 7th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Bugsnag now has custom snooze thresholds, allowing you to silence error notifications until they reach a point where you want to be alerted.

## Getting rid of error notification noise

Having your application error data in one place is incredibly helpful for prioritizing bug fixes and the process of debugging. Getting notified of errors spiking or when new types of errors happen is even better. But the reality is not every bug can be fixed immediately, and some don't matter unless they reach a critical level. When this is the case, error notifications are simply noise. It's also likely you'll ignore these alerts, defeating the purpose of your error monitoring tool.

It's important to have an error reporting tool where notifications and alerts are customizable, so you can be confident you'll be alerted about error situations you do care about, while silencing error notifications that aren't urgent.

## Snooze error notifications with custom options

Bugsnag's error notification snooze functionality is helpful for decreasing error noise. You can snooze based on error event count, error rate, and time to help you focus on errors when they are urgent. We've now expanded snooze support with custom thresholds so you can change your error notification requirements. Input a number value that is appropriate for your notifications to snooze errors based upon your preferences.  

![Custom snooze](/img/posts/custom-snooze.gif)

Once you've snoozed your error, you'll see a snooze success message in the lower left hand corner of your dashboard.

![Snooze success message](/img/posts/snooze-success.png)

---

Snooze is a helpful way to manage error notifications and bring more focus to debugging. [Give it a try](https://app.bugsnag.com)! For the latest from our team, follow us on [Twitter](https://twitter.com/bugsnag).
