---
layout: post
title: The new search bar in Bugsnag
publish_date: May 31st, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: The search bar makes it possible to view a personalized view of your data, giving you observability into your application's stability.
categories: features
hero_image: error-search.png
cover_image: error-search-cover.png
---

We’re excited to announce the release of Advanced search in Bugsnag—the newly simplified search bar and search builder that make it easier to use Bugsnag's powerful data segmentation capabilities. With Advanced search, you'll gain observability into your application through a personalized view of your data.

Advanced search lets you quickly hone in on the errors most impactful to your users using various search features.

- [Quick filters](#opinionated-quick-filters): for easily segmenting errors by Stage, Release, and Severity
- [Simple search](#the-quickest-way-to-find-errors): for quick text searches to surface error segments fast
- [Search builder](#advanced-data-segments-using-search-builder): for building granular data segments combining multiple search attributes
- [Custom filters](#custom-filters-for-segments-unique-to-your-application): for building custom segments unique to your application and business

![Advanced search](/img/posts/advanced-search.png)

All of these features are easily discoverable in the search bar and will help you create data segments for investigation into your application's stability. And from the personalized segments you create, you can more effectively prioritize important errors and ensure your users' experience is up to your standards.

## Why is search so important?

Product teams rely on Bugsnag because it takes error data and translates it into something actionable, and one of the ways it does this is through powerful search and segmentation. Especially for teams working in high-volume applications, the volume of data makes it difficult to understand an application's stability in production and identify problematic errors. Without real [observability](https://medium.com/@copyconstruct/monitoring-and-observability-8417d1952e1c), the ability to prioritize engineering time for bug fixes and feature building is a guessing-game.

That's what makes Advanced search so valuable—product teams can make data-driven decisions about fixing errors or building features for their users when they have observability into their application. Observability comes from the ability to create personalized views of the data they care about, so they can easily digest the information and take action.

#### Accurate data to help in decision making

Tightly coupled with search is the ability to have all your data stored in one place. The reason for this is that by collecting all your data, Bugsnag can give you accurate error counts, so you know *definitively* (not just on average) which errors happen most and impact the most amount of users. This is also true when using search to create a segment, so you'll get this level of accurate information, even from a drilled down view of your data.

This precise information helps in decision making since there’s no question which errors have the greatest impact and need to be prioritized.

## New error search features in Bugsnag

In this update, we've aimed to simplify search and make many of the granular search capabilities more discoverable. Here's a overview of these changes and the ways you can take advantage of them.   

### Opinionated quick filters

There are three main filters that are used most frequently and are now easily accessible: `Stage`, `Release`, and `Severity`. They are located at the top level since they will likely apply to any search you create. The quick filters UI was designed so you can easily filter to see error segments like:

- Errors from multiple release stages (production + beta)
- Errors seen in, or even introduced in, the latest release
- Errors in multiple releases using wildcard search, eg 2.*
- Unhandled errors only

![Release quick filter](/img/posts/release-quick-filter.png)

The quick filters can be combined with other search attributes to hone in your view of error data even further.

### The quickest way to find errors

Bugsnag now supports simple text search so you can quickly type in an email address, error name, etc. and return matches automatically. For quick searches, this is a fast and easy option.

![Simple search](/img/posts/simple-search.png)

You can also use simple search to create a segment based on multiple search attributes. To do this, type in a combination of key/value pairs into the search bar. For example, a user experiences an error on your sign-in page and writes into support to report it. You can type in `userID:SallyBugsnag` `context:sign_in` and Bugsnag will return all errors this user experienced on that page in your application.

### Advanced data segments using search builder

To create data segments for viewing a personalized view of your errors, use the search builder. You can combine various filters related to the stacktrace, user, environment, and workflow status, in addition to any quick filters you've set.

![Search builder](/img/posts/search-builder.png)

### Custom filters for segments unique to your application

Bugsnag captures error details automatically, but since every application is unique, you can also add custom metadata to error reports for additional context. For example, you can add the subscription level or plan name of the user who experienced the error.

You can then create a [custom filter](https://docs.bugsnag.com/product/custom-filters/) for this metadata to search for all errors that affect a certain plan name, a segment that's unique to your application.

![Custom filters in Advanced search](/img/posts/advanced-search-custom-filters.png)

---

Advanced search is a powerful and unique way to get the level of observability needed to make decisions about bug fixes versus feature building. By segmenting your data to bring the most important information to your view, while ignoring the rest, you can take ownership over your area of responsibility within your application. All of this is aimed at helping product teams ensure the stability of their product so they can deliver a great user experience.

Get started in your [dashboard](https://app.bugsnag.com/), or read more in the [documentation](https://docs.bugsnag.com/product/searching-dashboard/).
