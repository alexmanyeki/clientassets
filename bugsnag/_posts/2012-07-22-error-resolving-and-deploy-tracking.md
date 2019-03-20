---
layout: post
title: Error Resolving and Deploy Tracking
publish_date: July 22nd, 2012
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

Over the past couple of weeks we've been busy working on two great new
features which we think you'll love, error resolving and deploy tracking.


Marking Errors as Resolved
--------------------------

Last week we rolled out support for marking your errors as "resolved". This
helps you to focus only on current errors and gives you a warm fuzzy feeling
when you manage to resolve every error :)

You can resolve errors by clicking the resolve button on each error page, or you
can batch resolve errors using the checkboxes on error list pages.

Errors marked as resolved will be automatically unresolved when a new
exception of the same type occurs in a new version.


Deploy Tracking
---------------

We've also just rolled out support for tracking deploys in your applications!
By sending the source revision or application version to
Bugsnag when you deploy a new version of your app, you'll be able to see
which deploy each error was introduced in, and even auto-resolve all
unresolved errors each time you deploy.

So you can notify us about your deploys, we've created a simple
[Deploy Tracking API](https://docs.bugsnag.com/api/deploy-tracking/) that
you can call from your deploy scripts.

We've also updated the [Bugsnag Ruby Notifier](https://docs.bugsnag.com/platforms/ruby/)
to contain rake and capistrano tasks allowing you to automatically notify
us of deploys.

To automatically mark all production errors as resolved after you notify us
of a deploy, simply enable the checkbox under the "Deploy Tracking Settings"
section in your Bugsnag project's settings page.

Over the next few weeks, we will be adding more ways to see how your deploys
relate to exceptions in your applications, so you can focus on finding and fixing
your errors as quick as possible.
