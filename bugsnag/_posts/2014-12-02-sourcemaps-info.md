---
layout: post
title: "Sourcemaps.info: Get the most out of your JavaScript stacktraces"
publish_date: December 2nd, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

At Bugsnag, we're proud to be an early adopter of source maps which've
helped us enhance our [JavaScript notifier](https://www.bugsnag.com/platforms/javascript/).
Today I've released a tool to help you make the most of source maps, and to
help debug problems you may be having with them.

<a href="https://sourcemaps.info">
<img src="/img/posts/sourcemaps.info.png" alt="screenshot of sourmaps.info website"/>
</a>

[Source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) are an initiative by Google and Mozilla to make debugging easier. When sending your code to a browser, making sure it loads fast is a priority. This is why developers minify their JavaScript code, stripping it down to a small file. Unfortunately, this makes debugging especially difficult since the stacktraces returned after this process are unreadable.

Source maps help solve this problem. They let debugging tools, like the Chrome Developer Console or Bugsnag, make sense of the minified stacktrace, giving you readable, helpful debugging information. From the point cited in the minified stacktrace from your JavaScript or CSS, source maps find the matching point in your original source code. You'll quickly figure out why a given problem is happening.

You can visit [sourcemaps.info](https://sourcemaps.info), and paste
in a stacktrace from your minified JavaScript. We'll then look up any
source maps that are required, and expand the URLs referenced in the stacktrace.

Sometimes we can't discover the source map for you, but  when this happens, it
gives you a detailed error message instead so you can pinpoint the problem. In
some cases, it's not possible for us to fetch the source map ourselves, like
when it's on your computer or a private network. In that case you can upload
the source map manually.

Over time I hope that [sourcemaps.info](https://sourcemaps.info) will grow
into the ultimate reference for everything related to source maps; if you'd
like to help with that please [fork it on
GitHub](https://github.com/ConradIrwin/sourcemaps.info)!
