---
layout: post
title: A CPU Profiler for Node.js
publish_date: September 18th, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

Profiling real-world Node code is extremely difficult. It's very hard to track
which CPU cycles were used by what. Callbacks can execute in any order, and
the call stack gets destroyed each time you have an async break in your code.

[async-profile](https://github.com/ConradIrwin/async-profile) is a new Node CPU
profiler that doesn't have these problems. It's the first of its kind, and tracks the flow of your code
through continuations, callbacks and promises, and accurately counts how much
CPU time is used where.

Features
========

In addition to tracking the total amount of time spent in each callback, [async-profile](
https://github.com/ConradIrwin/async-profile) summarizes key performance metrics of your code.

    $ coffee example.coffee
    total: 1.823ms (in 2.213ms real time, CPU load: 0.81, wait time: 3.688ms)

* How much CPU time was used
* How much real time was used (as measured by a clock)
* How much of the time was spent using the CPU (The ratio of CPU time to real time)
* How much time callbacks spent waiting to run (High wait time is indicative either
  of slow external services, or callbacks blocking each other. Node is optimized for
  code where wait time is high and CPU time is low because waiting is free.)

Example
=======

The main profiler output shows the tree of callbacks that run. They're nested so
the information about a callback is indented underneath the code that created it.

    start | length | created at
    ---------------------------------------------------------------------
    0.879: 0.011ms    at Function.Project.fromCache (project.coffee:12:16)
    1.668: 0.043ms        at Event.hash (event.coffee:238:16)
    1.780: 0.064ms          at event.coffee:246:21
    2.016: 0.364ms            at Object.exports.count (throttling.coffee:12:14)
    2.506: 1.166ms                at throttleProjectEvent (throttling.coffee:132:14)
    1.947: 0.002ms            at Object.exports.count (project.coffee:52:19)
    1.593: 0.001ms        at Event.hash (event.coffee:238:16)
    0.775: 0.003ms    at Function.Project.fromCache (project.coffee:13:20)

In this example, you can see that there's one callback using almost all of our
CPU time (the one that's created at `throttleProjectEvent` in
`throttling.coffee:132`). It's using `1.166ms` of synchronous CPU time! This
is very bad because it's blocking the entire Node process for that entire time.

Installation
============

[async-profile](https://github.com/ConradIrwin/async-profile) gives you essential
insight into the performance of your node.js programs, and can help you find and
debug performance problems much more easily than with a traditional CPU profiler.

We've used it with great success to find performance problems in Bugsnag. And
I'd strongly encourage you to `npm install async-profile` and [give it a
go](https://github.com/ConradIrwin/async-profile).

Let me know on [Twitter](https://twitter.com/bugsnag) if you have any questions
or feedback.
