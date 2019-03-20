---
layout: post
title: "Twelve Features of Christmas Day 4: Deploy Information for Every Error"
publish_date: December 15th, 2014
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

For day 4 of the *12 Features of Christmas*, we’re really excited to bring deploy information to your Bugsnag dashboard! We’ve added more context to your errors, so you’ll easily diagnose and resolve issues with your code.

You’ll now see information on the deploys an error first and last impacted, all clearly laid out in the left hand column of the error details page.

![Deploy Information](/img/posts/deploy-info.png)

If you’ve configured Bugsnag with your [repository](https://docs.bugsnag.com/api/deploy-tracking/), you’ll see the deploy hashes for the first ever and most recent deploys the bug affected, and the dates of those deploys.

Are you using Github for version control? Well, those deploy hashes will link to really useful diffs in Github! The diff for First Seen is especially helpful—it shows you a comparison between the first deploy where the error was seen and the one prior to it. Our hope is that this diff will show you exactly where the bug might’ve been introduced. Right now we only support this in Github, but we hope to expand this in the future.

With deploy information, our aim is to give you a robust history of the progression of your errors. So if you’ve set up Bugsnag with your [release stage](https://docs.bugsnag.com/api/deploy-tracking/#api-overview), then we’ll show you something really cool. In addition to the deploy details, we’ll tell you the environments where the error was seen.

![Deploy Info Tooltip](/img/posts/deploy-info-tooltip.png)

If you haven’t configured Bugsnag to give us these details, you’ll still see the dates when the error was first ever and most recently seen, just like before.

Deploy information is another step towards making debugging as easy as possible for your team. Now we want to know which version control system you’re using. Let us know and we just might build support for yours next! Reach us on [Twitter](https://twitter.com/bugsnag).
