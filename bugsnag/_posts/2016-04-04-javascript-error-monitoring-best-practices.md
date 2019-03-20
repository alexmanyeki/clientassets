---
layout: post
title: Best practices for JavaScript error monitoring
publish_date: April 4th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: engineering
---

Our team at Bugsnag thinks about error monitoring every day. We even use Bugsnag to monitor Bugsnag — everything from our Rails API to our [React Dashboard](https://blog.bugsnag.com/moving-bugsnags-frontend-to-react/). Since we're constantly working to make error monitoring easier and more powerful for engineering teams, we're surprised when we meet some who aren't actively monitoring their JavaScript applications.

Even with tests, the broad range of browsers and versions means your users are likely running into bugs you could easily fix for them. What we hear though is that monitoring JavaScript seems like the wild west where anything goes, and so it's easier to avoid the noise. But without it, you won't know about the errors your users encounter, or be able to fix them to improve their experience with your product.

The good news is you can get started monitoring errors in your JavaScript applications with a few best practices in mind. We sat down with [Emily Nakashima](https://twitter.com/eanakashima) from our team to get some insights and tips for getting setup with the best possible JavaScript error monitoring. Her six suggestions will have you up and running with reliable frontend error monitoring so you can take a proactive approach to code quality.

![Emily Nakashima](/img/posts/emily-headshot.jpg)

## 1. Domain whitelisting

Domain whitelisting is a powerful way to eliminate many of the noisy JavaScript errors you don't care about. Bugsnag allows you to whitelist your domain so you can automatically ignore errors that happen on other domains, even if they're using your API key. This way you can focus solely on the errors you know are coming from *your* JavaScript code.

As an example, if you load some debugging scripts or third-party scripts from another domain, whitelisting lets you automatically ignore errors from those scripts. It also saves you trouble in the case where someone copy-pastes all your JavaScript onto another website or a local file and starts doing weird stuff with it that throws errors, which is actually oddly common for large sites.

## 2. Strip out exceptions from browser extensions

Browser extensions can be a challenge for implementing good frontend monitoring. Beyond the multitude of browsers to choose from, each is also unique because of the great variety of browser extensions your users can install. It's likely that some will cause your JavaScript to crash, creating noise you'll want to ignore. Since these crashes will mostly be unrelated to your code, stripping them out is a good strategy for configuring your frontend error monitoring.

In Bugsnag, we automatically ignore errors with browser extension files in the stack trace, so there's zero configuration needed to deal with browser extensions in most cases.   

## 3. Ignore old browsers

Older versions of browsers are much harder to deal with since they're more prone to crashing, and many don't even give you stacktraces with error reports. Since fewer users still run these older versions they may be less important to support. By silencing notifications about crashes in older versions of browsers, you can focus on fixing the errors that impact the majority of your users.

## 4. Use sourcemaps

One of the most powerful tools you can use to debug in JavaScript, and any language for that matter, is to see the line of code that crashed. If you minify your JavaScript code, you'll need to setup [sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) to make this work, but it'll be worth your time in terms of the effort and hassle you'll avoid down the line. Sourcemaps will map your minified code to your actual lines of code, so that Bugsnag can show you your code in the stacktrace.

![JS Sourcemaps](/img/posts/js-sourcemaps-best-practices.png)

## 5. Correlate errors to user or IP address

Because JavaScript monitoring can be noisy, looking at raw error counts alone can make it difficult to understand what's happening. A serious spike in errors could be caused by only one user, in which case it isn't as serious as you thought. But you could waste a lot of time investigating along the way, only to discover it isn't something worth spending your time fixing. If you correlate errors to users or IP address, you'll be able to map errors to the number of users affected.

You can sort errors by event and user counts in Bugsnag which is really helpful for understanding the overall impact of an error. You can even [save these filter settings](https://blog.bugsnag.com/filter-saving-and-defaults/) as a default to see user counts automatically every time you look at your Dashboard.

![User counts for JS](/img/posts/sorted-by-users-inbox.png)

## 6. Assign version numbers to your JS to track with each error

People can keep a single browser window open for days without refreshing it, and so there's no guarantee that your current deployment includes the code that caused the error. In Bugsnag, we allow you to easily track JavaScript deployments. Assigning your JavaScript a unique version number lets you know whether you truly fixed a bug with the latest deploy (and you're just seeing a final few errors trickling in from older versions of your JS), or if you're still seeing the same bug hanging around in your new code.

---

These six steps from Emily should help get your JavaScript error monitoring production-ready. There's no reason it can't be as informative and actionable as your backend monitoring — it just takes a little more configuration to get there.

To get started, check out Bugsnag's [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/).

Emily Nakashima leads up our frontend [engineering team at Bugsnag](https://www.bugsnag.com/about/). To learn more from her, follow her on [Twitter](https://twitter.com/eanakashima).
