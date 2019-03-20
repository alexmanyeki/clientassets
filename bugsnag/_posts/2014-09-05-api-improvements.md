---
layout: post
title: API Improvements with user auth, comment creation and more
publish_date: September 5th, 2014
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

Our customers already use the [Bugsnag API](https://docs.bugsnag.com/api/data-access/) to build awesome custom dashboards, and to slice and dice their crash data any way they choose.

Today we're making the API even easier to use and more powerful with some great additions:


### Authenticate as a User

You can now authenticate with the Bugsnag API using your [Bugsnag user credentials](http://docs.bugsnagapiv2.apiary.io/#introduction/authentication/user-credentials) as well as your [account's auth token](http://docs.bugsnagapiv2.apiary.io/#introduction/authentication/personal-auth-tokens-(recommended)). This opens up API usage to everyone on your Bugsnag account, even if they're not account admins.


### Create & Update Comments

When authenticated as a Bugsnag user, you can now [create](https://docs.bugsnag.com/api/data-access/v1/comments/#create-a-comment) and [update](https://docs.bugsnag.com/api/data-access/v1/comments/#update-a-comment) comments on errors!


### Filter Events by Time Range

You can now specify a [`start_time` and `end_time`](https://docs.bugsnag.com/api/data-access/v1/events/#list-events-by-project) when fetching events from the Bugsnag API. This helps you find the exact set of crashes you are looking for much quicker.

---

How will you use these API improvements in your apps? Have any further suggestions for API changes? Let us know on [Twitter](https://twitter.com/bugsnag)!
