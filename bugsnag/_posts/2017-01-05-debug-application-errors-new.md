---
layout: post
title: Features for debugging application errors - Investigating errors
publish_date: January 5, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

To end 2016 with a bang, we released the *12 Features of Christmas*, a Bugsnag tradition where we ship the frequently requested features we didn't have time to build during the year. We focused on two main areas with the features we shipped:

1. **Error investigation** - enhancing how you filter through error data to speed up identifying harmful bugs
2. **Collaboration and debug workflow** - making it easier and more convenient to work together on bug fixes

We hope our 12 new features help you improve your processes and workflow for [production monitoring for application errors](https://www.bugsnag.com/). This blog describes the features related to error investigation. Look out for our blog next week where we'll talk more about *collaboration and debugging workflow*. 

## Investigating application errors

For error investigation, the aim is to help you hone in on application errors that harm your product's quality and users' experience. This way, you can effectively prioritize application errors that matter and fix them accordingly, avoiding noisy, difficult to manage error data. Without a clear understanding of what is important and what is not, you can miss harmful bugs or spend time on things that don't really matter.

## 5 new features to help you debug application errors

To enhance your ability to make sense of application errors, we released a set of features that come in handy when you're looking to identify harmful bugs that need to be addressed through your bug fixing process.

#### 1. At-a-glance application health across your entire stack   

The most significant change we made to help with error discoverability is the [**compare projects**](https://blog.bugsnag.com/compare-projects/) view in Bugsnag that gives you a high level overview of all your projects with key metrics about the status of errors within each. From this new view, you can compare projects by their crash rate over time, new crashes introduced, and the progress of your team’s bug fixing workflow.

![Compare projects view](/img/posts/compare-projects.png)

#### 2. Bookmark customized views of your application errors

[**Bookmarks**](https://blog.bugsnag.com/bookmark-filters/) allow you to save different views of your application errors and easily return to them. Apply different combinations of [filters to concentrate on a specific subset of your data](https://blog.bugsnag.com/new-filter-bar-tips/), and bookmark them so they're saved in your dashboard. Using bookmarks can reduce the amount of time you spend discovering and triaging application errors.

![Bookmarks](/img/posts/create-bookmark.gif)

#### 3. Quickly see when an error was first introduced

An important step in reproducing a bug is understanding its history, including when it was first introduced and last seen in your application. As part of the *12 Features of Christmas* we introduced [**first and last seen tooltips**](https://blog.bugsnag.com/first-and-last-seen-error-tooltips/) which make this information clear when you're investigating an error. This information appears to you when you hover over timestamps on various pages in Bugsnag, even if you are using filters to hone in your investigation.

![First and last seen error tooltips](/img/posts/first-seen-tooltip-trendchart.png)

#### 4. Change the severity of errors right from the UX

Error severity is an at-a-glance piece of information in Bugsnag that helps you distinguish between unhandled and handled exceptions, so you can triage and identify errors in need of attention more efficiently. Now, you can also [**change the severity of errors from your dashboard**](https://blog.bugsnag.com/customize-error-severity-level/), so in the future you can pay closer attention to severity `error` and spend less time investigating errors of severity `info` or `warning`.

![Change error severity](/img/posts/change-error-severity.gif)

#### 5. Eliminate errors that don't matter from your filter results

To give you more control over error discovery using the filter bar, we've added [**exclude filters**](https://blog.bugsnag.com/search-for-application-errors-with-exclude-filters/) which allow you to filter *out* data which previously was not possible. This way you can easily exclude specific errors from your search results to discover the errors relevant to you.  

![Exclude filters](/img/posts/exclude-filters.png)



---

These features can help you improve error discovery by giving you different ways to view your errors and added control over the data in your dashboard. [Give them a try!](https://www.bugsnag.com)
