---
layout: post
title: A guide to search and segmentation in Bugsnag
publish_date: June 6th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Search in Bugsnag helps you surface the most important segments of your data. With a focused view of your errors, you can effectively prioritize errors and ensure the stability of your product.
categories: guides
hero_image: search-use-case-guide.png
cover_image: search-use-case-guide-cover.png
---

We recently launched the new search bar in Bugsnag to make it easier to find the errors most important to you. With quick filters, simple search, the search builder, and custom filters, you and your team can surface a personalized view of your error data.

The ability to investigate personalized segments of your errors gives you real-time observability into your application so you can make data-driven decisions about fixing bugs or building new feature. You can learn more about our simplified search experience in our [launch blog post](https://blog.bugsnag.com/error-search-in-bugsnag/).

## Using search to create personalized segments

Error data is only valuable if it's actionable, and Bugsnag makes it actionable by allowing you to create a focused view into the parts of your application you care about.

From this personalized view of important error data, you can quickly answer important questions, proactively address product stability, or firefight issues as they come up.

## Error data segmentation use cases

The search bar makes it easier to find the errors you're looking for and also discover the powerful segmentation capabilities. Here are some use case examples to help you get a sense of what is possible.

### Stabilize new releases

**Segment: Latest release**

![Release quick filter](/img/posts/release-quick-filter.png)

An important segment to monitor is your most important releases, usually your newest releases. You can use the `Release` quick filter to surface errors by latest release, or even use wild card matches to find the releases you care about.

By investigating the data in this segment, you can focus on stabilizing your newest releases and ensuring they meet your stability standards so your end users have a quality experience with your product.

### Take ownership of your area of responsibility within your application

**Segment: Application area**

`context:sign_up`

![Error context filter](/img/posts/error-context-filter.png)

One of the most powerful ways you can use search is to create a personalized segment for the package or portion of code within your application for which you're responsible. You can bookmark this segment to easily return to it daily and see refreshed, up-to-date error information.

For example, if your team is responsible for the sign-up and onboarding pages of your application, you can use search to segment your view on errors solely from that part of the codebase. This will help you take ownership of problems in your area of code and take action on important errors.

To create this segment, search using the key/value pair `context:sign_up`. Bugsnag will surface all errors from the sign-up and onboarding code so you can investigate stability issues from that area of the application.   

### Help your users when they report issues with your application

**Segment: User impacted by error**

`userEmail:kristine@bugsnag.com`

![User error search](/img/posts/search-error-by-user.png)

You can also use search is to find *specific* errors, which is especially helpful when your users report problems to you via support. This is possible with the `userId`, `userEmail`, and `userName` attributes in combination with Bugsnag collecting all of your error data. Since you have the option to avoid sampling, you can find the *exact* error event that gets reported to you.

At Bugsnag, our [customer engineering team](https://blog.bugsnag.com/customer-success-with-bugsnag/) makes great use of this when helping support our users. Simply type in your users ID, name, or email address into the search bar, and Bugsnag will surface all the errors they've experienced. You can also add in a time filter around the time they reported the issue to further hone in your results.

### Prioritize business critical issues with custom segments

**Segment: Custom - Plan Tier**

`customerTier: vip`

![Custom filters in Advanced search](/img/posts/advanced-search-custom-filters.png)

Bugsnag automatically captures as much error context as possible, but since every application is unique, you can add additional details as metadata. This is helpful for segmenting errors based on business critical issues, like monitoring your VIP customers' experience with your application. This way, you can strategically fix problems that are most important to your business.

For VIP customers (or users who pay you a significant portion of your revenue), it's important to monitor and stay aware of of their experience. You can add metadata to error reports to capture plan tier and use a [custom filter](https://docs.bugsnag.com/product/custom-filters/) to segment errors by VIP customers.  

Your customer success managers may want to monitor this segment to make sure your important customers are having a great experience with your product. If they begin to experience stability issues, you can prioritize this with your team.

### Experiment and iterate your product faster with feature experiment segments

**Segment: Custom - Feature experiments**

Testing new features is a smart way to innovate your product. You can use search to evaluate A/B or multivariate test segments and debug your experiment to ensure new features meet your standards for stability.

This segment can help you quickly discover and fix problematic issues and promote the right segment to feature.

### Speed up the development and release of new features

**Segment: Stage - Development/Staging/Beta**

![Stage quick filter](/img/posts/stage-quick-filter.png)

Use Bugsnag's search as you develop new features to speed up the process. You can create a segment for development errors only so you can quickly debug as your team builds new features.

You can use the `Stage` quick filter to segment by `Development`. Similarly, if you've released new features to beta or staging, you can use the quick filter to segment by that stage and view the errors.

### Pinpoint performance issues

**Segment: Timeout errors**

`errorClass:Timeout`

At Bugsnag, we even use Bugsnag for APM because if our application experiences a timeout error, we treat it as a bug. We’ve instrumented our code in places to tell us when a timeout error occurs, and we use search to segment those issues. This is very helpful for deciding when to focus on performance issues—we can take action when we find something we consider a bug in order to improve our application performance.

## Investigate the important stuff with segments

We hope these use case examples will help you get started with search so you can focus on the most important errors in your application. A personalized view of errors will help make your data actionable so you can prioritize the most important bugs first.  

Get started in the [dashboard](https://app.bugsnag.com/) or learn more about search in our [blog](https://blog.bugsnag.com/error-search-in-bugsnag/).
