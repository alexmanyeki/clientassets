---
layout: post
title: Unhandled/handled errors to help understand error priority
publish_date: October 3rd, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
hero_image: unhandled-handled.jpg
cover_image: unhandled-handled_cover.jpg
---

Today we’re announcing a new feature that aims to help you better understand how to prioritize errors — handled and unhandled errors. With this change, you will know explicitly which errors are unhandled so you can prioritize investigating and decide if it’s a bug that should be fixed.

## How does it work?

This feature improvement comes with upgrades to all our open source [error reporting libraries](https://www.bugsnag.com/platforms/). In order to see this in your dashboard, you will need to [upgrade to the latest version](https://github.com/bugsnag) of the library. Once updated, the [severity icon](https://docs.bugsnag.com/product/severity-indicator/) you’ve seen in the past will now be overlaid with an exclamation point any time Bugsnag detects it is an unhandled error. In addition to the at-a-glance information, you can also:

- Filter errors by unhandled/handled using the filter bar
- Filter email and team chat notifications by unhandled/handled errors

![Unhandled error filter](/img/posts/unhandled-filter.png)

You’ll also see a tooltip when you hover over the severity icon with more information about why Bugsnag decided to set the error’s severity in that way. Existing error grouping will be maintained in Bugsnag, and this new information will be layered on top of those existing errors.

![Unhandled/handled error tooltip](/img/posts/unhandled-tooltip.gif)

## Why unhandled and handled errors?

Up until now, severity has been the main metric for helping you and your team understand error importance. We gave full control over this piece of information and the ability to change it based on your own assessment of the error, but the meaning of severity is subjective. What was missing was a more objective way to identify severe errors from the rest.

Being able to report how many unhandled errors have occurred has been a top requested feature, and so we’re happy to roll this out. Unhandled and handled errors will allow users to address problematic unhandled errors first.

---

To see unhandled and handled errors in your dashboard, be sure to [update your error reporting library](https://github.com/bugsnag). You can find more details in our [documentation](https://docs.bugsnag.com/product/severity-indicator/).

This feature is helping us lay the groundwork for a larger release we’re working towards to help you better understand the stability of your application. Stay tuned for more in the coming months!
