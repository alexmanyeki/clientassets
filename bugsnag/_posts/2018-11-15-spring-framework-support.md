---
layout: post
title: Spring framework support
publish_date: November 15, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: We've released first-class support for the Spring framework. Modern Java applications can now use Bugsnag out of the box for stability monitoring in order to stabilize their app and prioritize and fix bugs.
categories: features
---

We're excited to announce first-class support for the [Spring](https://spring.io/) framework for Java applications. If you currently use Bugsnag Java on a Spring application, we recommend upgrading to Bugsnag Spring to take full advantage of the automatic functionality and improvements. [Please visit the upgrade guide](https://github.com/bugsnag/bugsnag-java/blob/master/UPGRADING.md) on GitHub for step by step instructions.

## Spring + Spring Boot support

Bugsnag now works automatically with Spring and Spring Boot applications. Installation has been simplified so that set up is handled automatically using Gradle, Maven, or a manual Jar file. Learn more about getting set up in [the docs](https://docs.bugsnag.com/platforms/java/spring/#installation).

### Releases dashboard

Bugsnag Spring also automatically unlocks the Releases dashboard. When you upgrade to Bugsnag Spring, you will automatically collect sessions data in order to see a stability score for each release. The stability score is color coded so you can see at-a-glance if your application release hits your stability targets. It also includes a prioritized list of the most widespread errors in each release. You can learn more about this feature in [the documentation](https://docs.bugsnag.com/platforms/java/spring/#session-tracking).

![Stability Score](/img/posts/stability-score.png)

### Logback support

Bugsnag Java and Bugsnag Spring now both provide a Logback appender. The appender will automatically report logged exceptions to Bugsnag, so there is no need for additional instrumentation when you integrate with the Bugsnag library. Any logged exceptions will appear as handled exceptions in Bugsnag. Please visit [the docs](https://docs.bugsnag.com/platforms/java/spring/configuring-logback/) to learn how to get setup with the logback appender. 

---

Learn more and get started in [the docs](https://docs.bugsnag.com/platforms/java/spring/) and on [GitHub](https://github.com/bugsnag/bugsnag-java). We have [example apps](https://github.com/bugsnag/bugsnag-java/tree/master/examples) available to help you see how the integration works.  

If you're new to Bugsnag, you can [try it free](https://app.bugsnag.com/user/new) for 14-days with our trial.
