---
layout: post
title: Responsive infrastructure with Auto Scaling
publish_date: October 15th, 2015
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: engineering
---

Maintaining high availability and performance is universally important, but at Bugsnag, we take extra care because it's our job to alert product teams when things break in their services. We process up to half a billion error events a day, so reliability is huge to us and we have zero tolerance for downtime in our backend.

Another challenge we face is the highly uncertain nature of our load. We can't predict what it'll look like because it's dependent on code deployed by our customers, but we need to be able to cope with all future increases. At the same time, we also want to keep our costs reasonable.

With these responsibilities in mind, we've constructed an infrastructure that is flexible but resilient in the face of constantly changing load patterns. Using [AWS Auto Scaling](https://aws.amazon.com/autoscaling/), we've been able to maintain the highest levels of availability.

## Common Load Patterns

To understand where and how Auto Scaling can be helpful, let's take a look at some common load patterns in applications.

#### Fast Growth

Fast growth is growth at an increasing rate over time. This is often what we expect and hope for when we first launch a new product or service.

#### Seasonal

Seasonal load is characterized by cyclical periods of high load followed by lower load. Netflix is a great example of this, where their heaviest load is always in the evenings followed by typically low load in the mornings.

#### Spiky

Spiky load is generally the hardest load pattern to predict, and is characterized by acute periods of increased load. Spiky load presents unique architectural challenges because you'll need to figure out how to prepare for those unpredictable spikes.

#### On or Off

On and off load are things like scheduled jobs or daily report generation where at times there isn't any load at all.

![common load patterns](/img/posts/common-load-patterns.png)

Most services don't fit neatly into one of these specific categories — they may transition between different load patterns, or display characteristics of multiple at the same time. Bugsnag's load, for example, looks like fast growth (because we're steadily adding customers over time), seasonal (because our load is heavy during the workweek and lower during the weekend), and also spiky (because sometimes we experience large increases at unexpected times).

In a world without Auto Scaling, the challenge then would be to figure out how to handle future load for each of these scenarios.

![provisioning resources without autoscaling](/img/posts/without-autoscaling.png)

Ideally, your strategy would allocate enough resources for expected high load points, keeping in mind your tolerance level for being underprovisioned. Unfortunately, this approach can actually end up being very costly because most of the time you'll be paying for computing resources that aren't in use. In the worst case, you might find yourself in a situation where you're underprovisioned and unable to keep up with the demand of your users.

Auto Scaling is helping us solve this.

## What is Auto Scaling?

Auto Scaling is a robust approach to backend infrastructure that attempts to scale up resources when user demand is high, while also making sure you're not overpaying for computing resources when you don't need them.

While it is an extremely useful option, it does require thoughtful configuration in order to see cost savings. When building infrastructure with Auto Scaling, you must be intentional in how you configure it by thinking carefully about the needs of your service in order to reap the most benefits.

## The basics of Auto Scaling

Auto Scaling can be configured to be flexible in response to more than just CPU usage — if you're more interested in network usage or the length of a queue, that's possible too. In fact, you can add or remove resources in response to all kinds of events. You can define custom metrics and create scaling rules around any custom values you decide to setup; you just need to supply the data.

Another option is to schedule the provisioning of resources instead of doing it dynamically if you have confidence in the nature of your future load. When you're very certain what your load patterns look like then this makes more sense.

The key takeaway here is that you have the ability to scale your resources up and down in response to pretty much anything you want. This is why Auto Scaling is really powerful.

## Bugsnag and Auto Scaling

We discussed it a bit earlier, but at Bugsnag, we have incredibly high and unpredictable load, and to date, we've processed over 15 billion crashes while retaining 99.9999999% availability.

Our notifiers work across all major programming languages and frameworks, and can be deployed on server, mobile, desktop, and client-side JS applications. Their job is to detect and diagnose every error for our thousands of customers, so *anytime* one of our customers' users' experiences an unhandled exception, Bugsnag is notified.  

We've all been there — you have a bad deploy and you see your datastores go down and the deluge of errors that result. Whenever something like that happens to our customers, Bugsnag gets a massive spike in traffic.

This means we receive a huge amount of data in a way that's almost impossible for us to predict, like when spikes will occur and how large they'll be.

![Bugsnag load example](/img/posts/bugsnag-load.png)

Given all of this uncertainty and the unique nature of our load characteristics, Auto Scaling is extremely important for us in order to ensure our performance, availability, and customer happiness.

## Bugsnag's architecture

Our architecture is setup in multiple layers. Error payloads come into our event servers and are placed onto queues that get processed by our fleet of event workers. This processing involves writing information about each event into our datastores, which the Bugsnag dashboard and API then read from to surface data to users.

![Bugsnag architecture](/img/posts/bugsnag-architecture.png)

Our main concern is processing incoming payloads at a reasonable rate. We've made sure that we always have enough event servers to handle this load, with zero tolerance for underprovisioning. We can then afford to be more flexible with the availability of event workers, and have some tolerance for momentary underprovisioning at this level.

In general, we prefer that event server queues are processed quickly by event workers because this means that the view of the world represented in our datastores is an accurate reflection of our customers' application states.

So how does this work in terms of optimizing for availability and cost?

## Event workers

Our event workers are stateless, so no data is stored in their process. This is good because in the case that an event worker disappears, we haven't actually lost anything. Short term, all data is stored in our event servers and is then passed along into our various longterm datastores.

As event workers pull events from the event server queues, they must perform very CPU intensive processing. The event workers analyze events and write the data to our datastores to figure out patterns between events and how to aggregate and match them together.

![Bugsnag event workers](/img/posts/event-workers.png)

When we have a spike in error data coming from a customer's application, the overall length of event server queues increases. We try to clear them quickly so that the event data contained here can be surfaced to our users fast.

To do this, we make sure that queue length in the event servers stays as low as possible, so we have Auto Scaling rules setup that respond to the length of the payload queue. If the amount of work to be done on the queue increases, we add more worker instances to process the queue more quickly. When the queue length is low and the workers aren't heavily using CPU, we scale down to fewer workers to take advantage of the cost benefits of having less computing resources.

![event workers when there's a long queue](/img/posts/event-workers-long-queue.png)

## Spot and on demand instances

Our even worker fleet is made up of *on demand* and *spot instances*.

*Spot instances* are excess computing capacity that is available in a bidding marketplace. The pricing for spot instances is based on supply and demand so when there is less excess capacity, the spot price increases, and vice versa. If your bid price is more than the current spot price, you get access to the instances you bid on. The major advantage here is that they're much cheaper, in general, that *on demand* instances. If you're looking to use spot instances, it's important to know that they can disappear at any time, so your use case needs to be able to tolerate this with protection against disappearing instances.

*On demand instances* are generally more expensive, but you know you will have them when you need them.

## Additional savings from spot instances

We've architected our event worker fleet to be made up of both spot and on demand instances, so we can take advantage of the low cost of spot instances without negative drawbacks.

We've biased our Auto Scaling rules towards the usage of spot instances when they're available for their lower cost. They are our first Auto Scaling group and we try to scale them up aggressively, and scale down slowly. Our second Auto Scaling group is made up of on demand instances which we scale up conservatively and scale down aggressively because of their higher cost. When possible we prefer that spot instances pick up the slack after we scale down on demand instances.

There are times when our bid price is below the spot price and so we can't get spot instances, or we're experiencing a particularly large spike which requires both spot and on-demand instances to handle.

This spot and on demand approach has proven to be very effective for us and so it's useful to consider if spot instances may be able to help you meet your technical challenges too at a lower cost.

## Conclusion

Auto Scaling might be helpful to your company for achieving high levels of availability and resource optimization. To get started, AWS offers great [developer resources](https://aws.amazon.com/autoscaling/developer-resources/) and [documentation](https://aws.amazon.com/documentation/autoscaling/) to help you decide if Auto Scaling can work for you. Keep in mind that thoughtful configuration and careful implementation is essential if you decide to use Auto Scaling for your infrastructure.
