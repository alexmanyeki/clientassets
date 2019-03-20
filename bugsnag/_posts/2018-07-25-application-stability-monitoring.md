---
layout: post
title: Not all bugs are worth fixing and that's okay
publish_date: July 25th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Application stability is the metric that helps product teams balance bug fixes and delivering roadmap features.
categories: engineering
hero_image: application-stability.png
cover_image: application-stability-cover.png
---

As a software developer, you want nothing more than to build and deliver great products and features to your customers. But you also know software development isn't always easy since making changes is a guarantee that bugs will be introduced. After all, "If debugging is the process of removing software bugs, then programming must be the process of putting them in," as said by [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra).

Since these issues will impact your customers, you may feel a strong pull to fix every software bug in your application.

**This is almost always a bad idea.**

## Application stability and zero bugs

There's no such thing as a bug free application, so having a strategy for dealing with them effectively is critical. This is why application stability targets are so important for agile teams. Stability can be defined as the percentage of successful application interactions per number of sessions in a given release. It is calculated by tracking the percentage of crashes (unhandled errors) experienced by users of your application.

![Calculate application stability](/img/posts/calculate-stability.png)

To understand stability targets, it's helpful to think about availability. You're probably already familiar with the ["five nines" of availability/uptime](https://en.wikipedia.org/wiki/High_availability#%22Nines%22), and you already know not to aim for 100%, even if it seems like a desirable goal. Beyond a certain point, you run into diminishing returns as high availability targets are expensive and don't always add up to a tangible benefit. Sean Hull talks about this in [Why high-availability is overrated](https://www.iheavy.com/2012/04/01/the-myth-of-five-nines-why-high-availability-is-overrated/).

"**The truth is sustaining high availability at the standard of five-nines costs a lot of money**."

It's a similar story with stability—at a certain point, it's too expensive to keep fixing bugs because of the high-opportunity cost of building new features. You need to decide your target for stability just like you would availability, and it should not be 100%.

And here's why...

### Agile rules the world

Agile development now dominates software development processes and has overtaken waterfall as the de facto method for building and deploying software. In the [2018 State of Agile report](https://explore.versionone.com/state-of-agile/versionone-12th-annual-state-of-agile-report) from VersionOne, **97% of respondents said they practice agile in their organization**. Agile teams are building and shipping software faster than ever. Many practice continuous deployment, which gives them the ability to quickly iterate their work on a weekly, and often daily, basis. Fast release cycles make it easy to fix things after launch, so it's no longer absolutely critical to fix every bug before the release. However, in agile development there is also less time available for traditional QA and testing which increases the risk of bugs slipping through to production.

So how can you go about balancing fast-paced development and bugs? You need a feedback loop for your application's stability which can be tracked with a stability monitoring tool.

### Customers have a choice

Customers have a choice when it comes to the apps they use and so delivering a reliable, high-quality app experience is crucial if you want to keep your customers around. It's a common example, but we've all been there. You need to get to a meeting so you open one of your ride apps. Annoyingly, Uber doesn't work for you and seems to be crashing, but you still need to get to your meeting so you open Lyft to make it on time. Because this can happen so easily, you might feel compelled to fix every bug that crops up. But [Jeff Atwood's](https://blog.codinghorror.com/not-all-bugs-are-worth-fixing/) question about bugs is important here,

"how do you distinguish between bugs that users are likely to encounter, and **bugs that users will probably never see?**"

It's an important question to consider and you can bet your competitors will be trying to figure this out for themselves, too, so they can continue to improve their product by shipping new features quickly.

### The wild-west of client-side

Not all bugs are made equal, and this is especially true when it comes to client-side applications.

JavaScript is more popular than ever, and over [69% of developers use JavaScript](https://insights.stackoverflow.com/survey/2018/#technology-programming-scripting-and-markup-languages), making it the most commonly used programming language. One of the difficulties with JavaScript is once you've deployed to the browser, the conditions your application runs in can vary quite a bit. It's nearly impossible to account for all possible scenarios given the vast number of browsers, versions, extensions, and other factors that can impact your application's stability. And because there is so much variance, a large number of stability issues will be edge cases that don't impact the majority of your users. For example, it's probably pointless to investigate bugs caused by Internet Explorer 6 due to very low usage and weird quirks.

Mobile applications present similar challenges for developers. Device fragmentation amongst Android devices is huge. Did you know that in 2015 there were over [24,000 different Android devices on the market](https://opensignal.com/reports/2015/08/android-fragmentation/)?

[![Android device fragmentation](/img/posts/android-device-fragmentation.png)](https://opensignal.com/reports/2015/08/android-fragmentation/)

Deploying to mobile can be even more unpredictable since devices and settings can differ drastically and cause issues when they interact with your application. Like JavaScript, a lot of the bugs that pop up will be edge cases that impact only a few rare phones.

It's not worth it to spend hours fixing a bug that only impacts a few users.

## Features or bugs? Pick one.

As [Eric Sink](https://ericsink.com/articles/Four_Questions.html) writes, "decisions about software quality can be tough and subtle, and we need to be really smart about how to make those decisions. Sometimes a 'bug' should not be fixed." So what's a better way to think about bugs?

**Turn stability into a KPI for your team.**

Pick an achievable target so it serves as a meaningful goal to which your team can be held accountable. Your stability target will help you make data-driven decisions around your engineering resources. When you plan sprints, should you allocate time for fixing problems, or should you be moving full steam ahead on your product roadmap? Application stability helps you decide.

It's worth revisiting your monitoring stack to make sure you have essential feedback loops in place, or if there's room for improving your strategy. I'll leave you with a few important questions to consider:
- Is your team thinking about application stability?
- How do you currently choose between bug fixes and building new features?
- How does your team track and prioritize bug fixes?
