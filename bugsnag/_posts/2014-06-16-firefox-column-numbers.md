---
layout: post
title: Column numbers in Firefox!
publish_date: June 16th, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

Firefox 30 is [out](https://developer.mozilla.org/en-US/Firefox/Releases/30)!
And excitingly, it now provides column numbers in exception stack traces.

This is doubly exciting for us, because we actually wrote the code to make this
work. Bringing Firefox up to feature-parity with other modern browsers is one
of the best things we could do to improve [JavaScript error
monitoring](https://www.bugsnag.com/platforms/javascript/) for everyone.

### Why are column numbers useful?

Column numbers are becoming increasingly valuable as most people now minify
their JavaScript.  Some websites have only one line of JavaScript, total. This
means it's essential to have the column number to work out which code was
executing at the time it crashed.

With the column number, we can use [source
maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) to
figure out the line of actual code which crashed. This makes debugging much
easier in many cases, as you can quickly see what your code was trying to do
when it crashed.

### How does Firefox compare?

The holy grail of JavaScript error monitoring is access to the error object in
window.onerror, but this is still a while away in most browsers. In lieu of
that the Bugsnag notifier uses a handful of [magic
tricks](/js-stacktraces/) to catch all exceptions and
read a stack trace from them.

<table>
  <tr>
    <th></th>
    <th>IE</th>
    <th>Firefox</th>
    <th>Chrome</th>
    <th>Safari</th>
  </tr>
  <tr>
    <th>stack property on exceptions</th>
    <td>10+</td>
    <td>✔</td>
    <td>✔</td>
    <td>✔</td>
  </tr>
  <tr>
    <th>column number in stack trace</th>
    <td>10+</td>
    <td>30+</td>
    <td>✔</td>
    <td>7+</td>
  </tr>
  <tr>
    <th>error object in window.onerror</th>
    <td>✘</td>
    <td>31β+</td>
    <td>✔</td>
    <td>✘</td>
  </tr>
  <tr>
    <th>column number in window.onerror</th>
    <td>8+</td>
    <td>17+</td>
    <td>✔</td>
    <td>7+</td>
  </tr>
</table>


As can be seen Firefox comes a pretty close second to Chrome for exception
features. Once Firefox 31 is out (estimated July) with access to the error
object from `window.onerror` (we were involved with fixing
[that](https://bugzilla.mozilla.org/show_bug.cgi?id=355430) too) there will be
nothing to choose between the two.

If you're looking for a tool that uses all of this information to report errors
reliably, install [Bugsnag's JavaScript
notifier](https://github.com/bugsnag/bugsnag-js), and get started with Bugsnag
for free.
