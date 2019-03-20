---
layout: post
title: Track what was happening in your Laravel application leading to an exception
publish_date: September 27, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We've added more diagnostic data for [error monitoring for Laravel with Bugsnag](https://github.com/bugsnag/bugsnag-laravel). You can now see automatically captured breadcrumbs in your dashboard to help you more easily reproduce errors from your Laravel applications.   

## Track actions preceding an exception

With this feature, you now see a *Breadcrumbs* tab in your error report that shows any log statements and database queries that ran prior to an exception being sent to Bugsnag. This timeline will help you trace what was happening in your application leading up to an exception.  

![Laravel breadcrumbs](/img/posts/laravel-breadcrumbs.png)

### Use Laravel breadcrumbs to diagnose timeout errors

To build further context for each exception, you can also see how long each database query took to execute. For failed web requests, this can help you identify the cause of a timeout error more efficiently.

---

We hope this feature will make it easier to understand what was going wrong in your application, so you can reproduce exceptions with clarity.

To learn more about this feature, please [visit our documentation](https://docs.bugsnag.com/platforms/php/laravel/#logging-breadcrumbs). You can [reach us on Twitter](https://twitter.com/bugsnag) with questions or feedback.
