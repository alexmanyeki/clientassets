---
layout: post
title: "Logs are for fireplaces: Error monitoring for real-time visibility"
publish_date: December 19th, 2017
author_name: Karissa Peth
author_twitter: karissapeth
author_avatar: karissa
categories: engineering
excerpt: Logs no longer cut it for debugging application errors. Learn about modern error management and how error-monitoring tools are an essential part of the modern dev toolkit.
hero_image: logs-fireplaces.png
cover_image: logs-fireplaces-cover.png
---

## Monitoring evolved from logging

Modernization of software development practices has changed infrastructure choices, job titles, and deployment frequency, yet too many applications are still relying on outdated logging methods to find application errors. Logs add overhead to your applications in terms of [lines of code and performance](https://blog.codinghorror.com/the-problem-with-logging/), and still must be parsed by eye or queried with another tool. None of this is automatic, real-time reported, or actionable. The evolution of logging for debugging is to use an error monitoring tool.

## Modern error management

Error monitoring tools are an essential part of any modern dev toolkit. With quicker release cycles now practiced by most companies, you need a tool that automatically captures problems without instrumentation.

Automatic capture of errors and crashes across your entire stack is done by installing an open source library into your code and setting an API key. From there, the library hooks into the native exception handler of the language, and sends context, stacktrace, and diagnostic data to the error monitoring service for processing. Error monitoring cuts through the noise by seamlessly grouping every instance of an error by [similar root cause](https://docs.bugsnag.com/product/error-grouping/). The error monitoring dashboard then helps you sort, prioritize, and track fixes without needing to write any complicated SQL queries. Many will integrate with your other tools such as [source control](https://www.bugsnag.com/integrations/#source) and [issue trackers](https://www.bugsnag.com/integrations/#issue), which allows you to tie your codebase to an error and track the fix of that error, closing the loop.

## Resolving customer bug reports

Support tickets aren't going away anytime soon, but just like instrumenting logs, it's next evolution is proactive and automatic. For every user reported error, you are only seeing a fraction of the problem — an error iceberg, if you will. In addition, the other side of the support ticket still involves digging through logs or trying to recreate the bug from incomplete information. Using an error monitor gives you the ability to see every error that user ran into, without compromising the user’s security. Client-side and mobile application errors also show breadcrumbs of application changes that directly precede the crash.

Resolving problems before they are even reported is the next iteration for quality development. Prioritize fixing the errors that the most users are seeing quickly with an error monitoring tool, and drive down the support tickets. Delve deeper into proactive customer support error monitoring with Bugsnag’s Customer Engineering team lead, [Kelly Mason](https://twitter.com/kellymase) in this [post](https://blog.bugsnag.com/customer-success-with-bugsnag/).

## Data customization

Many people who still use logging to find errors are drawn to it because of the customization that's possible. However, many don't realize that current error monitoring tools allow you to add that same level of custom data to your error reports. Send in [custom attributes](https://docs.bugsnag.com/platforms/browsers/js/configuration-options/#metadata) based on what matters in your application, and then receive targeted error reports, specifically customized to your application's errors. The custom data adds context and helps you in debugging the error.

On top of that, each attribute you add is [searchable](https://docs.bugsnag.com/product/custom-filters/) in the error dashboard so you can filter to easily find errors based on the custom data you've added. This could be anything from VIP accounts to A/B experiments or geography. With error monitoring, you get the best of custom data without the SQL queries and instrumentation required for logging.

## Catch errors with Bugsnag!

If you're ready to take error monitoring for a spin, you can try Bugsnag free for 14 days. [Learn more about our product](https://www.bugsnag.com/product/), or [get started in 5 minutes](https://app.bugsnag.com/user/new).
