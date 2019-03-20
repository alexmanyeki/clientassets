---
layout: post
title: Connect Bugsnag to your source code in GitHub, GitLab, and Bitbucket  
publish_date: November 18, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

You can now see the underlying source code for unhandled errors Bugsnag detects in your application — simply connect Bugsnag to your source control system in [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), or [Bitbucket](https://bitbucket.org/). We've rolled out support for both SaaS and on-premise versions of these products.  

## Track errors by releases and deploys

Connecting Bugsnag to your source control system gives you the ability to track errors by releases and deploys. On the timeline, every deploy is marked with an annotation so you can visually identify if a deploy might have introduced a spike in your error rate. This is very useful for pinpointing code changes that decrease your application's stability.

![Deploy annotation](/img/posts/deploy-annotation-tooltip.png)

Deploy annotations include helpful debug information and links — go directly to the deploy's source code to dive deeper into your code and investigate the error further. You can also see exactly what changed by viewing a diff between the deploy you're investigating and the one prior to it.

## See the underlying source code for an error

Every time Bugsnag detects an error in your application, you receive a stacktrace to help you debug the problem. By connecting to your source control system, you can also click through from the stacktrace and go directly to the underlying code that crashed.

![Bitbucket source code link](/img/posts/bitbucket-code-link.png)

---

Connecting Bugsnag to your existing tools can make error monitoring in your application a lot smoother. For more information on getting started, [visit our documentation](https://docs.bugsnag.com/api/deploy-tracking/#source-code-integration).
