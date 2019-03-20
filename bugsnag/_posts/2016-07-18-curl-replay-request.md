---
layout: post
title: Replay failed requests using Curl   
publish_date: July 18th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

A new feature is here that'll make it faster to reproduce errors captured by Bugsnag. You can now replay request information from the error report on the error details page in your dashboard.

![curl replay request](/img/posts/curl-replay-request.png)

Bugsnag automatically collects diagnostics for every error, including request information right out of the box. When available, you can see ip, headers, URL, HTTP method, and HTTP params.

Now you can also replay the request using a curl command. On the request tab in your error report, you'll find an option to *Copy curl command to clipboard*.

![curl command](/img/posts/curl-command-replay.png)

---

This feature is now available in Bugsnag's [Ruby](https://docs.bugsnag.com/platforms/ruby/), [PHP](https://docs.bugsnag.com/platforms/php/) and [Node](https://docs.bugsnag.com/platforms/nodejs/express/) notifiers.

Follow us on [Twitter](https://twitter.com/bugsnag) for the latest updates and feature releases from our team.
