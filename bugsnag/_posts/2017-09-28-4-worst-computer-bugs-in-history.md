---
layout: post
title: 4 of the Worst Computer Bugs in History
publish_date: September 28th, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: engineering
hero_image: bugday.jpg
cover_image: bugday_cover.jpg
---

The first computer bug ever discovered was found 70 years ago. To commemorate this momentous event in the history of technology, we celebrated with [Bug Day 2017](https://blog.bugsnag.com/bug-day-2017/) and shared stories of some of the worst documented computer bugs. These stories are interesting to learn from as they can offer insight into software development and deployment we can all apply to our own work and projects.

## The Ariane 5 explodes at launch

Attempting to fit 64 bits into a 16-bit variable flipped the Ariane 5 rocket 90 degrees in the wrong direction, [causing it to self-destruct mid-launch](https://www.youtube.com/watch?v=gp_D8r-2hwk&feature=youtu.be&t=50). This is considered one of the most expensive computer bugs in history. Learn more about it [here](https://blog.bugsnag.com/bug-day-ariane-5-disaster/).

This story is a good reminder that assumptions in old code can lead to unexpected consequences when applied to a different situation.

## Mars Climate Orbiter burns up in space

Mistakenly using Imperial rather than Metric units caused the incorrect calculation of a spacecraft's trajectory, leading it to burn up in the Martian atmosphere. Read the full story [here](https://blog.bugsnag.com/bug-day-mars-climate-orbiter/).

This story is a good reminder to decide on one set of units and use them consistently. It's also important to ensure that a specific team member owns responsibility for critical decisions (such as whether to perform a correction maneuver).

![Moth](/img/posts/bugday-moth.jpg)

## Losing $460m in 45 minutes

A computer program mistaking production for a test environment meant that many, many trades, each losing a few cents, ended up costing Knight Capital $460 million. Read more [here](https://blog.bugsnag.com/bug-day-460m-loss/).

This is a good reminder to remove dead code when possible, and ensure that you have a way of checking that deploys are successful on all machines.

## Therac-25 causes radiation overdoses

The most tragic computer bug story is about Therac-25, a machine meant to deliver radiation therapy to cancer patients. However, race conditions in the codebase and a lack of hardware safety features caused radiation overdoses that led to 3 deaths. Learn more about Therac-25 [here](https://blog.bugsnag.com/bug-day-race-condition-therac-25/).

The tragic consequences of the Therac-25 bug can teach us to rely on hardware safety features and have easy to understand error messages.

#bugday2017

We hope you enjoyed learning about important bugs in computer history along with us.

---

Our series on the Worst Software Bugs in History is in honor of [Bug Day 2017](https://blog.bugsnag.com/bug-day-2017/). Seventy years ago, Grace Hopper discovered the first computer bug — a moth was stuck between relays in the Harvard Mark II computer she was working on. The notion of bugs was described in other fields previously, but the moth discovery was the first use of the term “debugging” in the field of computers.

[Bugsnag](https://www.bugsnag.com) automatically monitors your applications for harmful errors and alerts you to them, giving you visibility into the stability of your software. You can think of us as mission control for software quality.
