---
layout: post
title: 12 Features of Christmas - Search for application errors using exclude filters
publish_date: December 21, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Today's release in the *12 Features of Christmas* gives you more power over the filter bar in your Bugsnag dashboard. You can now use exclude filters to filter *out* data, letting you exclude errors from your filter results. With this added functionality in the filter bar, you can save time looking for the right subset of your error data, and find the errors that need fixing.  

![Negative filters](/img/posts/negative-filters.gif)

Previously, it was only possible to surface errors matching filters, and not the other way around. We've now added additional logic to the filter bar to make it more logical to exclude errors, and make it easier to find what you're looking for. The ability to easily find errors having the greatest impact on your application's stability can save you time and effort in your bug fixing process.

## Common use cases for excluding data

One commonly used filter key in Bugsnag is `release_stage` so you can see errors happening in production, beta, staging, or your other development environments. Previously, if you wanted to see everything except development errors, you would need to include multiple filters. Now you can simply exclude development, and all errors seen in your other release stages will be surfaced.  

![Exclude filters](/img/posts/exclude-filters.png)

You could also exclude errors coming from Internet Explorer if you're working on a JavaScript app, or certain versions of Android or iOS on mobile. We hope the ability to exclude data with the filter bar will give you even more control over noise and help you hone in on the errors affecting your user's experience.

## Triaging errors using the filter bar

The [filter bar helps you prioritize errors](https://docs.bugsnag.com/product/filtering-dashboard/#what-can-i-filter-on) by seeing those most relevant to you. It lets you surface errors based on filters important to you, like errors happening in the latest versions of your application, or errors being seen by your highest paying customers.

Bugsnag automatically includes almost 30 filters, and you can even [add custom filters](https://blog.bugsnag.com/find-application-errors-with-custom-data/) to help you search by custom diagnostic data added to your error reports. Since not everything can be fixed, using the filter bar can help you identify the highest priority errors that need to be addressed. When you have a set of filters you use frequently, [bookmark them](https://blog.bugsnag.com/bookmark-filters/) so it's easy to come back to them again later.

---

We hope this new feature will make it easier to identify problematic errors and improve your application's quality. There are two more great features lined up for the 12 Features of Christmas, so be sure to [stay tuned](https://twitter.com/bugsnag)!

*This blog is one a series of product advancements to assist in error discovery and minimize troubleshooting time. Not all errors are equal, Bugsnag helps you focus on errors with the greatest user impact with a customized view of your application and releases.*
