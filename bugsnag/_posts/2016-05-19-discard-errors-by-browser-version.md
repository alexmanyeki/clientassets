---
layout: post
title: Discard errors by browser version in Bugsnag
publish_date: May 19th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Today in Bugsnag you have more control over your [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/). When you configure your JavaScript project, you can choose which browsers and which versions of those browsers you want to capture errors in. Bugsnag will automatically discard error data from other versions. You can also choose to discard errors from browsers not listed. This powerful feature makes your JavaScript monitoring clearer, so you can focus on the information most relevant to you.

![Discard JS errors by browser version](/img/posts/discard-errors-browser-version.png)

### Why should I discard errors by browser version?

We built this error handling feature with a special purpose in mind. Engineering teams put in a lot of work to decide [which browsers and which versions of those browsers their websites and applications will support](http://blog.freerangefuture.com/which-browsers-should-my-website-support). Once you've made that decision, it doesn't make sense to pay attention to errors coming in from legacy browser versions. In fact, those details will be noisy and make it more of a hassle to gain visibility into health of your application. By ignoring this information right from the start, you'll have better JS monitoring, and you'll find it easier to prioritize and fix errors for your customers.

In Bugsnag, we've done something similar when it comes to collecting debug information. Our JavaScript notifier supports all versions of the most popular browsers, but we have better support with better error reports for [specific versions](https://docs.bugsnag.com/platforms/browsers/compatibility/).  

---

For more suggestions on making your JavaScript error monitoring more actionable, check out our [six best practices](https://blog.bugsnag.com/javascript-error-monitoring-best-practices/).

Be sure to follow us on [Twitter](https://twitter.com/bugsnag) for the latest from our team.
