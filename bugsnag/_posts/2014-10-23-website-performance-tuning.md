---
layout: post
title: Tips for improving website performance
publish_date: October 23rd, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

At Bugsnag, one of the things we pride ourselves on is speed. Usually crashes
appear on your dashboard within a second of occurring (and that includes the
few hundred milliseconds it takes your app to connect to our servers over SSL
and report the crash).

At the beginning of October we began to notice that while errors were showing
up in the dashboard quickly, loading the dashboard in a web-browser was taking a
significant amount of time. We had one report from a user in New Zealand where it took 8 seconds to load the login screen.

Clearly something had to be done, and over the last week or so I've sped up the
site by a factor of 2 to 4, depending on where you're connecting from. This post
will share some of the techniques I used.

## 1. Measure the performance

There're lots of amazing tools out there for analyzing web performance. All
web browsers include a network timeline in their developer tools, and
[WebPageTest](http://www.webpagetest.org/) by Google lets you capture this
information from all around the world. This is a particularly bad example
from New Zealand:

<a href="/img/posts/slow-bugsnag.png" title="Bugsnag being slow from New Zealand">
<img src="/img/posts/slow-bugsnag.png" alt="screenshot of website test that shows slow performance"/>
</a>

The time I care most about is time until DOMContentLoaded has run (the purple
line at 7.5s), since that's the point the user can interact with Bugsnag. The
remaining requests are for analytics purposes.

If you want advice on how to improve this, then both [YSlow](http://yslow.org/) and
[PageSpeed](https://developers.google.com/speed/pagespeed/) are useful. They'll tell
you which requests are causing the most problems, and point out quick fixes.

## 2. Use a CDN for assets

A CDN removes latency by moving cacheable assets closer to your users. This
matters particularly if you're serving assets over https, as setting up
connections is slower. We're hosted on Amazon EC2, so we configured
[CloudFront](https://aws.amazon.com/cloudfront/) to sit in front of our assets.

CloudFront acts as a transparent proxy, so this didn't require any change to
how we deploy; CloudFront just requests the assets from `bugsnag.com` and then
caches them. If it receives a request that isn't an asset, it redirects back to
the home page.

## 3. Set long cache headers

We're using Rails, so every time an asset changes, its URL changes. This means
we can just set up a blanket rule that everything in `/assets/` can be cached forever.
The exact nginx configuration we're using is:

```
  location ~ ^/(assets|fonts)/  {
    # also sets Cache-Control: max-age=3153600
    expires 1y;
    add_header Cache-Control public;

    # set by cloudfront
    add_header Last-Modified "";
    add_header ETag "";

    # Allows debugging script tags on a CDN
    # https://www.bugsnag.com/docs/notifiers/js/cors
    add_header Access-Control-Allow-Origin "*";
  }
```

## 4. Delete unused code

We had a few scripts we didn't need anymore, and some of these actually included more
script tags asynchronously. Deleting those helped significantly both with time until
`DOMContentLoaded`, and with time until the load event fired.

## 5. Minifying assets

When we'd upgraded to Rails 4, we didn't spot the memo that the API to enable JavaScript
minification had changed. Re-enabling that helped, as did compressing the big PNG image by
90% using [ImageOptim](http://imageoptim.com/) and [ImageAlpha](http://pngmini.com/).

We also started bundling jQuery with our assets instead of using the one from
Google's CDN.  This avoided an extra connection, and since connection latency is
highly variable, the fewer connections you're making, the less variable your
page load time will be.

Finally, we enabled gzip compression on our JavaScript, CSS and SVG files at the nginx level.
CloudFront won't gzip assets for you, but if you serve assets that've been gzipped, it'll cache them like that.

## The results

<a href="/img/posts/fast-bugsnag.png" title="Bugsnag from New Zealand before optimization">
<img src="/img/posts/fast-bugsnag.png"alt="screenshot of website test that shows fast performance"/>
</a>

With all of this in place, we reduced the cold load time from around 7.5s down
to 1.8s! The benefit was even greater though because now most assets don't need
to be re-downloaded. Whereas before every page load took almost 7.5s, now
subsequent page loads take closer to 900ms.

There's still room to improve. In the future I want to play with using an SSL
accelerator, possibly coupled with SPDY to improve connection times. We also
need to optimize the amount of JavaScript and CSS we load to improve download
times. And once that's done, I'm sure there're some quick wins in terms of
rendering pages more quickly from Ruby.

If you have any tips for performance, please let me know [on
Twitter](https://twitter.com/conradirwin). Otherwise, to use the fastest exception
notification service around [sign up for Bugsnag](https://www.bugsnag.com) in a
flash.
