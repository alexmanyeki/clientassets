---
layout: post
title: Error monitoring for Atlassian with Bugsnag
publish_date: October 11, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Atlassian Bitbucket, JIRA Software, and HipChat are aimed at helping developers build and maintain better software products. These platforms give product teams solid workflow and feedback loops for developing and deploying software more efficiently.

Building and deploying code is the first major part of the development process, but it doesn’t stop there. Continually monitoring and improving software for customers is the next major concern. Error monitoring has become the developer standard for seeing exactly what users are experiencing and any code problems impacting them, so you can continue to improve your software and their experience.

Error monitoring with Bugsnag gives you focused visibility into errors affecting users, and the ability to identify errors you care about, like those happening in your most recent releases, or the ones that are most widespread.  This level of insight coupled with comprehensive debug information make it possible to reproduce and fix errors detracting from your user’s experience.

Bugsnag is the most practical way to improve product quality for your users because you can see the real-world problems they encounter, and use actionable data to fix them.

Today we’re excited to announce that Bugsnag now supports the Atlassian suite, providing complete error integration with alerting, issues, deploys, and even code.  Atlassian users can deploy their code, know exactly what errors are happening in their application and which customers are affected, synchronize JIRA issues, and debug with diagnostic data.

## Track release performance with Bitbucket Pipelines and Bugsnag

A valuable piece of visibility Bugsnag can bring you is the ability to track the health of releases. This is possible by showing you which errors are introduced in each deploy. By knowing which deploy an error might have been introduced in, you can better decide how to move towards a fix, or even roll back in more serious cases of spikes in your error rate.

The Bugsnag timeline view visually displays error events over time with an annotation at every point there was a deploy. A deploy tooltip gives you additional information about the deploy and includes a link back to your source code in Bitbucket.

Using [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) for builds and deployments alongside Bugsnag for error monitoring makes the development to deployment process seamless.

![Bitbucket deploy annotation](/img/posts/bitbucket-deploy-annotation.png)

Learn more about configuring [Bugsnag with Bitbucket Pipelines in our documentation](https://docs.bugsnag.com/build-integrations/bitbucket-pipelines/).

## Understand which parts of your source code cause errors

You can also integrate your [Bitbucket source code with Bugsnag](https://docs.bugsnag.com/api/deploy-tracking/#bitbucket) to see which parts of your source code introduce errors in your application. This integration makes every stacktrace in your Bugsnag dashboard clickable, so you can move from investigating the cause of an error to fixing it with a single click. The stacktrace shown by Bugsnag will link to the matching repository in Bitbucket. Bugsnag will also link to diffs showing the changes in your source code that caused an error spike.

![Click through to Bitbucket](/img/posts/bitbucket-code-link.png)

Bugsnag supports both Git and Mercurial repositories.

![Bitbucket source code](/img/posts/bitbucket-code.png)

## Know when errors happen by getting alerts from Bugsnag through HipChat

Bugsnag also gives you visibility into production errors through alerts via [HipChat](https://www.hipchat.com/). You can setup notifications to be sent into any HipChat room and customize the alerting thresholds.

Knowing when errors are happening in production can help you and your team get ahead on code quality and deliver a better product experience to your users.

## Automate bug management workflow using 2-way synchronization

Error monitoring with Bugsnag gives you instant knowledge of where problems are happening in your application. You can manage which of those errors to fix manually or automatically create issues using [JIRA Software](https://docs.bugsnag.com/product/integrations/jira/) or [Bitbucket Issues](https://docs.bugsnag.com/product/integrations/bitbucket-issues/). As they move through the bug fixing process, you can manage the state of the error in Bugsnag or the issue in JIRA Software, and the other will update to match, giving you a real time view into the state of your application errors on both sides. Any actions you take, including comments from your team, will be noted in the other. Bugsnag even tracks regressions, so errors that resurface after a fix are automatically reopened, and the JIRA issue reopened as well.

![Create JIRA issue](/img/posts/create-jira-issue.png)

For many teams, JIRA Software is the main dashboard to track your workflow. At the same time, Bugsnag continues to monitor errors and provide dynamic information about the state of each error including its severity and impact on users. It also provides deep diagnostic data to help you reproduce and fix the error. As your team works on bug fixes, they can take advantage of both platforms' workflows and data, knowing their progress will be updated across platforms.

![Bugsnag error in JIRA](/img/posts/jira-issue.png)

---

By integrating error monitoring with Bugsnag into your existing Atlassian powered development process, you'll be better equipped to ship high quality products to your users.

Find the Bugsnag [JIRA Software](https://marketplace.atlassian.com/plugins/com.bugsnag.jira/cloud/overview), [Bitbucket](https://marketplace.atlassian.com/plugins/com.bugsnag.bitbucket/cloud/overview), and [HipChat](https://marketplace.atlassian.com/plugins/com.bugsnag.hipchat/cloud/overview) integrations in the Atlassian Marketplace.  
