---
layout: post
title: JavaScript Error Monitoring Leaves Beta
publish_date: January 24th, 2014
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

We're excited to announce that our JavaScript error monitoring is leaving beta
today with our 2.0 release!

If you add [`bugsnag.js`](https://github.com/bugsnag/bugsnag-js) to your site,
we can now automatically catch *every error* in *every browser* and show it to
your Bugsnag dashboard!

```html
<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js"
        data-apikey="YOUR-API-KEY-HERE"></script>
```


Near-Perfect Error Grouping
---------------------------

Errors of the same type are grouped together no matter which browser they
occurred in, helping you prioritize and fix errors must faster. We even group
errors correctly if you are minifying your js or using cache-busting techniques!

![](/img/posts/browser-os-breakdown.png)


Improved Debugging Data
-----------------------

If an error occurs due to a button click, AJAX request, or any other browser
event, we'll now show this information in error reports on your browser
dashboard. No more guessing what your users were doing when an error occurred!

![](/img/posts/better-debugging-data.png)


Source Code Snippets
--------------------

We'll now automatically show you the exact line of code that crashed, directly
in your dashboard. No complicated sourcemaps setup required.


Browser Targeting
-----------------

Many companies (including Google) choose to target only modern browsers when
developing their apps. We now allow you to ignore errors from old browsers to
help you focus on the crashes you care about.

![](/img/posts/browser-targeting.png)


We'd Love Your Feedback
-----------------------

You can find out more about the new release in the
[documentation on GitHub](https://github.com/bugsnag/bugsnag-js).

Install [bugsnag.js](https://github.com/bugsnag/bugsnag-js) on your site and
let us know what you think! Get in contact with us [via
email](mailto:support@bugsnag.com) or on [twitter](https://twitter.com/bugsnag).
