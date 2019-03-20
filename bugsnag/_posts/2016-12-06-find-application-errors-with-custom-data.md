---
layout: post
title: Find application errors using custom diagnostic data
publish_date: December 6, 2016
author_name: Josh Wold
author_twitter: joshua_wold
author_avatar: josh
categories: features
---

We’re excited to announce our new custom filters feature which allows users to analyze the impact of application errors on any of their custom data.

Along with the error data we automatically collect, Bugsnag has always allowed you to include data that is unique to your application. This is helpful in troubleshooting at the individual error level. Starting today that custom data can now be turned into a custom filter in order to measure the impact of errors using custom data.

For example, you can now use the filter bar to analyze error impact on customers in different payment tiers, on users in each A/B test group, or even trace exceptions across your entire tech stack.

![Custom filters in action gif](/img/posts/paying-customers-filter.gif)

## Analyze error impact on different user segments

A very common way for organizations to section their users is by the customer’s payment tier. By sending payment tier along with errors, you can now analyze the product experience of users in various tiers. For example, you might want to focus development efforts on fixing errors affecting users on paying plans versus those affecting users on the free tier.

![Filter errors by customer plan tier](/img/posts/plan-tier-filter.png)

## Measure performance on your A/B testing and phased roll-out groups

Modern development teams often use A/B testing, experimentation, or even phased roll-outs where product performance feedback is essential. A custom filter can now be used to measure application quality for each test group to help determine which product variant is better.

![Analyze user errors](/img/posts/ab-split.gif)

## Trace exceptions across your full stack using a custom ID

Connecting the dots in today’s applications can sometimes be problematic. For example, on an e-commerce site, a user action of searching, viewing, and buying a product all might touch many services or apps. A custom filter can now be used to trace `shopping cart ID` or `request ID` through the whole stack.

## Get started using custom filters

Custom filters are now available for all users on a [Bugsnag Pro plan](https://www.bugsnag.com/pricing/) or any new trials of Bugsnag. Existing Bugsnag users can try out custom filters by activating a 14 day free trial for their organization.

![Add custom filters from dashboard](/img/posts/add-custom-filters.png)

---

[Get started with custom filter today](https://app.bugsnag.com). [Please visit our documentation](https://docs.bugsnag.com/product/custom-filters/) to learn more.
