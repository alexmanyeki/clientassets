---
layout: post
title: "Bugsnag DeployBot integration: Making continuous integration a lot less scary"
publish_date: February 11th 2015
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

Bugsnag’s [deploy tracking API](https://docs.bugsnag.com/api/deploy-tracking/) makes tracking errors in your deployed applications really powerful. With deploy information, you’ll know what code change may have caused an error, meaning you'll fix broken code faster and move on.

Our deploy tracking API already lets you notify Bugsnag of your deploys with curl, Capistrano, Rake tasks, or Heroku.

All of this information is clearly laid out in your [Bugsnag dashboard](/deploy-information), with linked deploy hashes if you configure your repository, and if you’re using Github, really helpful diffs between deploys to show you the code changes.

![Deploy info](/img/posts/deploy-info-tooltip.png)

Now, bringing deploy information to your Bugsnag dashboard is even easier, thanks to our friends at [DeployBot](http://deploybot.com/), an awesome tool for continuous deployment.

![DeployBot](/img/posts/deploybot-logo.png)

They’ve integrated with Bugsnag to bring detailed deploy information on crashes to your dashboard. All of this makes continuous integration a lot less scary—your team can move fast and ship with confidence, knowing the clues to pinpoint the source of an error are available.  

You can read more about this supercharged integration [here](http://blog.deploybot.com/blog/launched-bugsnag-integration-to-help-correlate-deployments-and-application-errors).
