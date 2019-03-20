---
layout: post
title: "Making Project Spike Detection: The process of building our intelligent error alerting system"
publish_date: October 9th, 2014
author_name: Jessica Dillon
author_twitter: jessicard
author_avatar: jessica
categories: engineering
---

Yesterday, Bugsnag released a feature that detects and alerts you when a project's error rate increases significantly. You can [read about it here](/project-spiking-alerts). This feature is very exciting for us, so we wanted to share the process of developing our spike detection algorithm with you.

![Whiteboard graphs](/img/posts/making-project-spiking/whiteboard-math.jpg)

Locking ourselves in a conference room, we brainstormed several mathematical methods to detect a spike. We started out simple, plotting data into basic line graphs to see what various spikeable scenarios would look like. Inevitably, questions popped up: What even constituted a spike? It seemed so obvious when looking at simple line graphs—when it starts to go up dramatically, that's the spike! But then we introduced oscillating data. Data that looks like it's about to spike, but fixes itself over time. Data that looks like it's dramatically increased in a short period of time, but turns out to be mild when compared to the whole data set. With these kinds of fluctuations, it's not so clear. The problem with detecting spikes, we found, is that it's pretty easy to spot one in person, but we needed a set of rules that would decide what constitutes a spike across all types of data.

We turned to the internet and researched different algorithms, even looking at measurements like [Spectral flatness](http://en.wikipedia.org/wiki/Spectral_flatness), a measure used in digital signal processing to characterize an audio spectrum. After some research, we came up with a few different algorithms to test on our data.

![Google Sheets graphs](/img/posts/making-project-spiking/google-sheets.jpg)

[Google Sheets](http://www.google.com/sheets/about/) was a quick way to prototype our initial algorithms and visualize our data, easily marking spikes. Using canned data, we graphed common patterns of spiking and non-spiking data, and were able to quickly and easily compare our different spiking algorithms. We realized that seeing the spiking information in front of us made it pretty easy to justify a spike. However, we wanted to approach it from an unbiased perspective, and be able to view large amounts of data. When we reached this point, we decided to move on from Google Sheets in favor of pulling in real error data, and writing actual code. We weren't quite ready to implement any code changes for this on [Bugsnag](https://www.bugsnag.com/) yet, so we ended up experimenting more with our algorithms in [GNUplot](http://www.gnuplot.info/).

![GNUPlot graphs](/img/posts/making-project-spiking/test-data.JPG)

Using GNUplot enabled us to grab large amounts of real data sets, print them out, and highlight the visible spikes by hand. Our data was then run through our spiking algorithms to see how each algorithm agreed with our unbiased observations. This helped us figure out exactly what rules needed to be in place to detect a spike. After some iteration on our algorithms in GNUplot, we learned which outperformed the others. Once we narrowed down the algorithms that were producing the best results, we went back to Google Sheets to iterate on our algorithms with a smaller set of our real error data.

We wanted our algorithm to err on the side of under-notifying. Trusting that the spike was a legitimate concern was important to us, rather than being an annoying notification you just end up turning off. We reached a 90-95% success rate detecting spikes, only missing them 5-10% of the time. We felt comfortable with our algorithm at this point, so we decided to put it to the test.

![Admin graphs](/img/posts/making-project-spiking/admin.png)

We implemented the algorithm in Bugsnag, and created an admin dashboard to monitor incoming spikes. The dashboard graphed every spike that happened on every Bugsnag project, notifying us via [HipChat](https://www.hipchat.com/) when any spikes were detected. This data was used to inspect each individual spike to make sure the spike was legitimate. However, some of our graphs were hilariously wrong at first.

![Bad admin graph](/img/posts/making-project-spiking/bad-graph.png)

After monitoring spiking for a while, we ended up reaching out to some of our customers to verify that they felt there was a spike at that time, and would like to have been notified. Working with our customers, we were able to release our spike detection algorithm to the world.

---

We were finally able to perfect project spike detection to bring you more intelligent error alerts. We rolled this out yesterday and think it'll make your Bugsnag experience even better. Give it a try! Configure your [email](https://app.bugsnag.com/settings/) and [notification settings](https://www.bugsnag.com/integrations/) so you can get notified of spiking error activity in your applications. Let us know what you think by reaching out on [Twitter](https://twitter.com/bugsnag).
