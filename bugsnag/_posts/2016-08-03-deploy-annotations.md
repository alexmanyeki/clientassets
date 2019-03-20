---
layout: post
title: Timeline deploy annotations
publish_date: August 3rd, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

The Timeline view in Bugsnag is a great way to monitor the stability of your applications. Deploys are automatically displayed giving you visual cues of how application error rate changes relate to code changes.  Additionally this allows you to quickly filter your error views by deployment or even click into the code causing a change in error rates. 

## Deploy annotations

![Timeline deploy annotations](/img/posts/deploy-annotations.png)

If you haven't already, [setup deploy tracking](https://docs.bugsnag.com/api/deploy-tracking/) to take advantage of these new features. With deploy tracking enabled, you'll automatically see an annotation on the Timeline at each point where your team deployed new code.  Having deploys and error events plotted together makes the relationship between your releases and changes in your error rate clear. You can spot where error spikes begin and investigate what might have caused it.

Along with annotations, we've added contextual tooltips with details to help you dive further into your investigation of deploys. If you click a deploy annotation, a tooltip with additional detail appears. You can see how many events were seen, and the time range of the deploy. There's also information on the release stage, time and duration of deploy, error event count, quick filters, and links to GitHub.

## Quick filters

Use the tooltip's quick filters to examine the errors within the deploy you're investigating. This lets you quickly get to the list of errors seen in or introduced in the deploy.

![Annotation tooltip](/img/posts/deploy-annotation-tooltip.png)

## View revision and diff in GitHub

If you've [integrated your Bugsnag dashboard with your source code in GitHub](https://docs.bugsnag.com/api/deploy-tracking/#source-code-integration), you'll now automatically see a link to each deploy's revision and diff to the previous revision in the deploy tooltip. Follow these links to help you get a better idea of the changes in your code that may have triggered new errors to occur or increases in your error rate.

---

We hope deploy annotations will make it easier to understand your application's health and improve it over time. Please follow us on [Twitter](https://twitter.com/bugsnag) for the latest from our team.
