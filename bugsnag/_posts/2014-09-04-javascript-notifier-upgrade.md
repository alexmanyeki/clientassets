---
layout: post
title: Improved JavaScript Stacktrace Support
publish_date: September 4th, 2014
author_name: Kyrylo Silin
author_twitter: kyrylosilin
author_avatar: kyrylo
categories: features
---

JavaScript [stack traces](http://en.wikipedia.org/wiki/Stack_trace) can be messy. You’ve probably seen how varied they are, with different browsers using their own unique style to display them. Some older browsers don’t even have stack traces, like Internet Explorer 9 or Safari 5.1, making it extra challenging to track down an error. But what does this all mean for a developer? How can you reliably debug your JavaScript code across all browsers? You need a powerful tool to help you — one that takes all these differences into account, and provides you with answers that make sense.

![stack trace](/img/posts/stacktrace.png)

Today we’re pleased to announce a huge upgrade to the [Bugsnag Javascript Notifier](https://www.bugsnag.com/platforms/javascript/) to better support stack traces from all browsers. We now group exceptions better across the board, get more information from IE 9, and group exceptions correctly inside `eval()` most of the time.

## Stack Trace Formats

A stack trace is typically exposed via the `stack` property of a thrown Exception. Newer browsers have more detailed exceptions, but they can be too detailed at times. Here is an example of a function that crashes and and prints a stack trace for the caught exception.

```javascript
function oops() {
  (function(a) {
    try {
      a.undefined();
    } catch (ex) {
      console.log(ex.stack)
    }
  })(null);
}
```
Running the code in Chrome, Opera or IE 10+ gives the following stack trace:

```
TypeError: Cannot read property 'undefined' of null
    at file:///Users/kyrylosilin/crashy.html:13:8
    at oops (file:///Users/kyrylosilin/crashy.html:17:9)
    at file:///Users/kyrylosilin/crashy.html:19:1
```
But in Firefox, or Safari, you get:

```
"oops/<@file:///Users/kyrylosilin/crashy.html:13:7
oops@file:///Users/kyrylosilin/crashy.html:17:1
@file:///Users/kyrylosilin/crashy.html:19:1
"
```

Bugsnag now recognizes these, and many other minor variations, as exactly the same stack trace. So exceptions will be grouped together correctly, and displayed in an easy to read format on the Bugsnag dashboard.

We now have better support for grouping exceptions and showing stack traces in Opera Mobile, Internet Explorer 9 and older, Android 2 and 3. On top of that, Bugsnag support for eval has been vastly improved for all browsers.

[Get started](https://www.bugsnag.com) catching exceptions right now!
