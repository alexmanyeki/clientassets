---
layout: post
title: Upload JavaScript source maps to Bugsnag  
publish_date: May 12, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We're excited to launch expanded support for JavaScript [source maps](http://blog.teamtreehouse.com/introduction-source-maps) — you can now upload your source maps directly to Bugsnag. Every time we capture an error in your JavaScript application, we'll use your source maps to show you the exact line of code that crashed in your stacktrace.  

![unminified stacktrace](/img/posts/unminified-error.png)

## What are source maps?

Source maps are files that map your minified JavaScript code back to your original source code. It allows you to see a full stacktrace for an error, making it far easier to debug. With source maps, you can take advantage of the performance benefits of compressing your JavaScript code, and still be able to debug errors for your users.

Mike Bull from our engineering team in [Bath, England](https://blog.bugsnag.com/bugsnag-bath-office/) shares how to get setup with this feature he built.  

![Mike Bull](/img/posts/mike-bull.jpeg)

## How do I upload source maps?

> To upload source maps you need to make a request to https://upload.bugsnag.com/. You can specify the Notifier API key for the project, the minified URL, and the source map file and it will be uploaded to our servers. We will then use that uploaded source map file whenever we receive an error event from that URL. You can also specify which version of your app the file applies to and upload the associated source files if required. You can learn more about this in the [Bugsnag' documentation](https://docs.bugsnag.com/api/js-source-map-upload/).

## Why would I upload source maps instead of hosting them myself?

> Uploading the source map allows us to gather the required information to reverse minification without you needing to host your source files (which may be sensitive). It also means that we won't need to go to your servers to fetch the files every time an error is received (reducing the load on your servers).

> In the case you do want to host them yourself, we still support fetching the source maps on the fly if you include the `SourceMappingURL` comment at the end of your Javascript file or the `X-SourceMap` header.

---

We've supported source maps since the early days of Bugsnag's [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/). We hope this expanded functionality will allow more users to take advantage of this feature.

And for the latest feature updates from our team, follow us on [Twitter](https://twitter.com/bugsnag).
