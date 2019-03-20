---
layout: post
title: You don't have enough tests and you never will!
publish_date: January 24, 2017
author_name: William Starling
author_twitter: bugsnag
author_avatar: william
categories: engineering
---

Ask any software developer if their app has enough tests and chances are they'll say "no". Often they'll feel they have to justify this lack of testing, but why is this the norm, and what should we do about it?

### The problem of testing

Software teams are increasingly facing the pressure of having to deliver quality software while still staying ahead of their competition. Release buggy software and users will be quick to switch away, but lack the features your competitors provide and you will have trouble attracting new users.

![Buggy software](/img/posts/not-enough-tests_buggy-software.jpg)

The traditional view of software testing is that the earlier you can find a bug, the cheaper it is to fix. If a developer finds a bug shortly after writing the code, they can quickly fix it; if the bug is found in production it needs to be diagnosed, fixed and the software re-verified and released which can be an expensive process.

Whether you are performing unit testing, integration testing or system testing, a balance has to be struck between the cost and the value testing provides.

#### Unit testing

Unit testing seeks to break code into small, logical units and then test that functionality in isolation from the rest of the code. It is typically performed by the developer and allows them to verify that their code works as they expect, as well as testing boundary cases which are difficult to produce in later stages of testing.

Many software teams put high importance on writing a lot of unit tests as catching bugs early can save time and money later on. However these tests are time consuming to write, often difficult to understand and maintain, and are too low level to catch logical bugs across the codebase.

#### Integration testing

Individual modules of an application can be integrated together and tested as a group - this is integration testing. At this level whole features can be tested in context and logical bugs discovered. Integration tests can be brittle when code is refactored and can take a lot of effort to fix. As with unit tests, they are expensive to write and are not necessarily well suited to finding edge cases.

#### System testing

System testing is performed once all the software has been written. Its aim is to ensure that the complete system behaves as expected, is usable, stable and secure. This often involves a lot of manual ad-hoc testing alongside automated testing, which makes it difficult to perform consistent testing on every release. This makes it easier for bugs to slip through the cracks.

### Striking a balance

Testing is hard and software is complex. No matter how much testing you do there will always be bugs that find their way into your releases. So what is the best testing strategy?

A lot of software teams get caught up in trying to measure how much testing is being done; this can lead to unhelpful testing strategies like "100% line coverage in unit testing". Even if good coverage is achieved, you may be testing for the wrong behaviour and the tests themselves could be buggy or not actually verifying outcomes as intended.

In order to come up with a useful testing strategy that improves the quality of your code, you first have to answer the question "what do I want my testing to achieve?". The answer to this question can depend a lot on the context (for example a bug in your self-driving car is a lot more concerning than a bug in a game), but typically the answer is that you want few bugs experienced by the end users and no serious defects that could affect security or integrity.

![Self driving car bug](/img/posts/not-enough-tests_self-driving-car-bug.jpg)

The following are some things you should consider when creating a testing strategy.

#### Focus on what's important

More tests does not necessarily equal fewer bugs, but targeting testing effort in the right places can make a real difference to code quality. Here are some examples of areas where testing can make a difference:

- *Complex logic* --- Bugs in areas where the logic is very complex or convoluted can be subtle and hard to diagnose, with regressions being hard to spot. These areas should be tested more exhaustively.

- *Publicly accessible interfaces* --- Ensure that interfaces which can be reached publicly do only what they are intended to do. This includes verifying that requests are appropriately validated to avoid interfaces returning more information than intended or modifying data in unintended ways.

- *High impact code* --- Focus testing in areas that have the greatest impact on your users. A feature used by a small percentage of users may be less important to test than core functionality.

#### Design for damage control

Ultimately bugs will happen, but when they do you want to control the impact. You can do this at the code level, for example handling exceptions where appropriate, or at the design level, for example using transactions when modifying databases. Thinking about what happens when things go wrong can help reduce the severity of bugs when they do occur.

#### Monitor bugs

Once your software is in the wild, how do you know if your testing strategy is working and how can you monitor the experience your users are getting? Error monitoring (such as [Bugsnag](https://www.bugsnag.com)) allows you to see errors that are occurring and make decisions about what needs to be fixed based on how much of an impact a particular bug is having. You can focus on fixing the edge cases that actually matter in production, which can be difficult to discover during testing.

![Monitoring bugs](/img/posts/not-enough-tests_monitoring-bugs.jpg)

You can use error monitoring to get an early warning when things are going wrong, which means you can either fix things before they become too disruptive to users or even roll back a release if the impact appears significant.

Bugs in software are inevitable, but being able to get immediate feedback on how your software is performing post-release is a valuable last line of defence in an effective testing strategy.

### Final thoughts

Software is a complicated, collaborative exercise, and trying to produce it with as few defects as possible is time consuming and costly. You will never have enough tests to catch everything that could possibly go wrong, but with the right testing strategy and design you will be able to produce good quality software - without being bogged down by writing and maintaining too many tests.

---

Thanks to [Becky Hayling](http://bekmeh.com) for the illustrations!
