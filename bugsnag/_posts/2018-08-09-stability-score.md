---
layout: post
title: Improve application stability with the stability score
publish_date: August 9th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Track application stability with the stability score, a definitive metric for helping product teams balance fixing bugs and adding features.  
categories: features
hero_image: stability-score.png
cover_image: stability-score-cover.png
---

The Bugsnag team is excited to launch the new stability score which you can now see in your updated and refreshed Releases dashboard. We recently shared [why application stability is such an important metric for product and engineering teams](https://blog.bugsnag.com/application-stability-monitoring/). With the stability score, you are now able to measure and track application stability automatically using Bugsnag.

The stability score replaces the crash rate, and is actually the inverse of the previous metric. We've made this change as it aligns with familiar concepts in the engineering and product world, such as [high availability](https://en.wikipedia.org/wiki/High_availability), and targets such as ["five nines"](https://en.wikipedia.org/wiki/High_availability#%22Nines%22), which are equally important when measuring stability.

![Release dashboard with stability score](/img/posts/stability-score-releases-dashboard.png)

# What is the stability score?

The stability score shows you the percentage of user sessions in a release that were error-free. A session typically means each interaction a user has with your application, but this is configurable.

![Calculate application stability](/img/posts/calculate-stability.png)

The stability score helps you easily see when application stability is lower than average so you can take action and fix problematic bugs to improve your stability score. Bugsnag uses a color-coded indicator to make broken releases noticeable at a glance:
- green (average or better)
- yellow (up to 20% lower than average)
- and red (lower than average by more than 20%).

![Stability score](/img/posts/stability-score.png)

# How can I use the stability score?

With this metric, you can make data-driven decisions about your engineering resources: should your team be working on building new features on your roadmap, or fixing bugs to stabilize your application? Here are a few use cases that can help you take full advantage of the stability score.

### Monitor the stability of your new release

When you release a new change or launch a new feature, you'll want to make sure you haven't unintentionally introduced new bugs into production. Keeping an eye on the Releases dashboard immediately after a release can help you quickly spot issues and take action to fix bugs and stabilize a release. In addition to the stability score, the Releases dashboard also lets you drill into a specific release to see which errors are impacting its stability.

### Make sure your most adopted releases are stable

In your daily workflow, the Releases dashboard is a good place to look to get a high-level overview of application stability. Start your day by checking to make sure your most important releases are stable.

You'll now see an adoption indicator for each release showing how many people are using it. It is the proportion of sessions the release has had out of all releases in the last 24 hours. This can be a good indicator of the importance of a release as any bugs in it can impact a large portion of your users.

![Error list with stability score](/img/posts/stability-score-error-list.png)

If the stability score has dropped too far below average, you can click into the release to view the errors, and investigate if they are problematic and need to be immediately prioritized.

### Focus your team on app stability

The stability score is an easily understood metric that you can turn into a KPI for your team and, in turn, align everyone on application stability. By doing this, you don't need to sacrifice software quality for the sake of new features; instead you can balance both effectively in order to continue moving quickly on your roadmap, while ensuring your users are experiencing a stable application.

By displaying it for everyone to see, it will be top of mind for your team. They will be equipped with the information they need to make decisions around software quality.

---

The stability score and adoption indicator are available on the Bugsnag Pro plan when you have session tracking enabled with an updated Bugsnag notifier. For users on a free or Team plan, the Releases dashboard is now available to show release details; however, session powered information is not available.

To learn more about the stability score for your platform, please visit the [documentation](https://docs.bugsnag.com/product/releases/releases-dashboard/).
