---
layout: post
title: Data access API now supports releases
publish_date: March 1st, 2018
author_name: Chuck Dubuque
author_twitter: ChuckDubuque
author_avatar: chuck
excerpt: Update to data access API enables viewing releases on a project including the crash rate.
categories: features
---

Following on the introduction of our [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/) on Bugsnag Pro plans earlier this year, we have now updated the Data Access API to give you access to data on releases and sessions. You can use the Data Access API to list all the releases on each of your Bugsnag projects, and for each release get rich data on the release itself and the errors associated with that release including the crash rate for measuring release health.

This update will make it easier for you to create reports and dashboards on a per-release basis, and to pull the crash rate metric into other tools that you use to report on release success criteria. You can also pull the raw data that we use to calculate the crash rate that you see in the releases dashboard into your own tools to create metrics aligned to your business objectives.

## Identifying the releases on each project

Each release of a Bugsnag project represents a unique release of your application, whether it is in a staging environment or production. For each project, you can extract a list of the releases very easily, which will include all of the release data we collect. You can also filter your list on release stage and time and choose sort order. For more information, see our [Data Access API documentation](https://bugsnagapiv2.docs.apiary.io/#reference/projects/releases/list-releases-on-a-project).

For each release, you get a great deal of data, including the name of the release, the release stage, number of errors introduced in the release, and the two components of the crash rate: the `unhandled_session_count` and the `total_sessions_count` which you can either divide to get the same crash rate metric you see in the releases dashboard, or use them to create and track your own metrics.

If you only want to return data about a specific release of interest, you can do that as well. See more in the [Data Access API docs here](https://bugsnagapiv2.docs.apiary.io/#reference/projects/releases/view-a-release).

![Releases dashboard in Bugsnag](/img/posts/releases-dashboard.png)

Incorporating the crash rate metric into your product planning process is the first step in creating an "error budget" for your applications: a stability score that helps you decide when to slow down your product roadmap and concentrate on code stability and quality, and when to push ahead with new features your customers have been clamoring for. We'll talk about that concept more in future posts.
