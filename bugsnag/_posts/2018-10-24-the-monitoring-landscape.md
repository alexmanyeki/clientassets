---
layout: post
title: Getting started with monitoring for developers
publish_date: October 24th, 2018
author_name: Karissa Peth
author_twitter: karissapeth
author_avatar: karissa
excerpt: Monitoring is an essential part of building and deploying software, but the landscape is huge and it's easy to overlook certain areas. Here we'll discuss the essential monitoring stack for developers.   
categories: engineering
hero_image: monitoring-landscape.png
cover_image: monitoring-landscape-cover.png
---

Until recently, monitoring was exclusive to the IT operations department who was responsible for maintaining the hardware and networking equipment to run a companies' entire suite of software. But nowadays, changes in deployment frequency, architecture, and cloud hosting has shifted that responsibility.

**Monitoring is no longer just for ops teams.**

Monitoring has become essential for all developers to gain observability into their codebase. It's important be aware of the monitoring systems your DevOps team uses, but the monitoring world is huge, and it can be hard to know where to start. This post is aimed at giving you an overview of the monitoring available and the value it provides.

## Why monitor at all?

The main value of monitoring your system is to act as a smoke detector. It can let you know when things are heading in a dangerous direction, sometimes enabling intervention prior to a failure point. A properly set up monitoring system will alert to outages, and beyond that, help to pinpoint where to start investigating. Monitoring tools are an effective source of truth when an outage does happen that enable teamwork between engineering and operations.

## Monitoring terminology

Monitoring originated with the concepts of black box and white box monitoring to describe where they interact with your application or infrastructure. We won't focus on these concepts, but they are helpful to know:

*Black Box monitoring*: monitoring from outside the system; what the "user" experiences

*White Box monitoring*: monitoring from within the system; critical for attaching context to problems

## Infrastructure monitoring

### Network monitoring

On the surface, network monitoring might seem to be exclusive to the realm of operations, but monitoring a system's ability to send and receive data is something all developers should care about, since most services don't exist in a walled garden. Getting a quick handle on your team's network monitoring platform (whether [SolarWinds](https://www.solarwinds.com/), [Nagios](https://www.nagios.com/), [LogicMonitor](https://www.logicmonitor.com/), or others) can help you troubleshoot service slowdowns or outages from sources external to your application.

When building your application, you should proactively consider bandwidth implications and how this can affect the performance of your application or the user experience. On the mobile side of application development, architecting for intermittent network and data usage is critical for success.

### Service availability monitoring

At its core, infrastructure monitoring is about service availability. When problems do occur, monitoring your infrastructure tells you quickly if it's an app problem or infrastructure problem. This information will help inform who is responsible for fixing errors. If your service is a dependency to others and your instance is down, it's critical that the development team have this information.

Outage prevention can take many forms. From the development side, architecting your work to be:

1. functional in an availability zone independent way
2. selecting services that inherently have higher availability
3. engineer fault tolerance into your consuming of services by gating them as either "must have" to function or "nice to have"

Platforms for monitoring service availability include [Datadog](https://www.datadoghq.com/), [New Relic Infrastructure](https://newrelic.com/products/infrastructure), [Nagios](https://www.nagios.com/), [Honeycomb](https://www.honeycomb.io/), and [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/).

## Application monitoring

### Stability

Stability monitoring measures overall error levels, and helps you understand when application errors have reached a critical level that could impact your users' experience. This is especially important since buggy applications are frustrating and considered unreliable by end users.

In the past, logs were used to track application errors, and engineers would investigate them when they received customer complaints. This was a painful experience for both engineering teams trying to piece together what caused a bug, and also for the user who experienced the bug and was responsible for reporting it. Since then, engineering teams have standardized on error monitoring software that automatically captures and alerts on errors, but this still requires lots of engineering overhead to triage the list of errors continually.

Stability monitoring adds logic to the process of monitoring for errors. It provides a definitive metric that lets engineering teams know when errors are impacting stability to the point that they must spend time debugging. This type of monitoring is used full stack. In backend services or applications it will report on the percentage of successful requests. Similarly for client-side and mobile monitoring the stability is measured as error/crash free sessions.   

[Bugsnag](https://www.bugsnag.com/) is a platform for application stability monitoring.

### Performance

Performance monitoring at the application layer provides information about how fast an application is responding. Slowdowns in request processing from both the server-side and client-side can result in a poor user experience. *The challenge* with performance monitoring most teams face is knowing when is *fast* really "*fast enough*". With so many variables affecting the performance metrics of any system, it can turn into a rabbit hole of tweaks. Dynamic baselines mean improvements in performance can result in making mountains out of previous mole hills. Performance monitoring is the last bit of monitoring that should be put in place after other areas are covered. You can think of it like building a car from the ground up—when all the basics are working, you can then make performance tweaks.

#### Server-side performance monitoring

Latency is the primary metric used for server-side performance monitoring. This is the amount of time it takes for your system to service a request. Performance bottlenecks in your code base can produce downstream effects on multiple services, sometimes leading to a cascading failure. Using performance monitoring to tackle slow responses, especially after a new release, can help pinpoint induced performance changes in a system.

*What about CPU and memory usage metrics?*
Previously, many developers used CPU and memory usage as key metrics for performance, but a better way to interrogate this type of information is from an application perspective. This is a change as a result of abstraction of infrastructure. Setting up KPIs for any service where higher CPU or memory usage could result means you are notified closer to the source of any problem occurring. This is something we do internally at Bugsnag using StatsD, where we've set two KPIs for the processing of ingested data—*duration in queue* and *number of events in queue*. This approach allows you to have an intelligent conversation around increases in those metrics with your operations team.

Platforms for server-side performance monitoring include [Skylight](https://www.skylight.io/), [New Relic](https://newrelic.com/), and [Datadog](https://www.datadoghq.com/).

#### Client-side performance monitoring

The first monitoring many people look at is the *latency* in the response of the system, especially as it relates to client-side user experience and the impact that can have on a business. There are two ways to interrogate this metric. One is monitoring *actual* human users of your site and their experience, referred to as RUM (Real User Monitoring). This is distinct from SUM (Synthetic User Monitoring) which uses the Selenium programming language to simulate a user on your site.

**Real user monitoring** is often the first monitoring implemented on client-side applications because it tracks the actual experienced loading and response times of users on your site. The downside of RUM is that the data can be noisy as each user's internet speed and system influence the metrics collected. The data is still useful when digging into certain trends, or if you spend a bit of time pruning or filtering the data to exclude older browsers.

**Synthetic user monitoring** is frequently overlooked in the monitoring toolset available to engineers. The data collected from using a SUM tool is generally cleaner than real users. The variables of internet speed, browser, and system are all controlled, thus allowing the data to highlight changes in your site that have affected performance. One downside to SUM is that it requires setting up the behavioral scripts to capture the information. Although this takes just a few minutes, the need to update the scripts when changes are made to the site is a maintenance hurdle for many teams.

Platforms for client-side performance monitoring include [New Relic](https://newrelic.com/), [SolarWinds Pingdom](https://www.pingdom.com/), and [AppDynamics](https://www.appdynamics.com/).

---

Having the right monitoring in place is vital for engineering teams shipping applications to let them know of outages, slowdowns, and errors. What does your monitoring stack look like? Are there places where you're lacking the right amount of monitoring visibility?
