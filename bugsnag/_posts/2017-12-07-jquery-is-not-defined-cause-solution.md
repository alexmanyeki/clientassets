---
layout: post
title: "jQuery is not defined: Common causes and a simple solution"
publish_date: December 7th, 2017
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: engineering
excerpt: Learn about some of the causes and simple solutions for one of the most common JavaScript errors, jQuery is not defined.
hero_image: jquery-is-not-defined.png
cover_image: jquery-is-not-defined-cover.png

---

One of the most common JavaScript errors we see affecting our customers is `jQuery is not defined`. This can be a pretty serious problem if your web app relies on jQuery ([73% of all sites!](http://w3techs.com/technologies/details/js-jquery/all/all)), since if jQuery fails to load, it can make your JavaScript code unusable.

![](/img/posts/jquery-not-defined.png)


What are the common causes of jQuery is not defined?
---------------------------

The most obvious cause of this error is that you forgot to include jQuery before you used it, but there are also more subtle causes that you’ll not see until you deploy your site to production.

### 1. Your CDN-hosted jQuery might be blocked

If you are using a [CDN-hosted](http://jquery.com/download/#using-jquery-with-a-cdn) version of jQuery such as [Google’s Hosted Libraries](https://developers.google.com/speed/libraries/devguide?csw=1#jquery), these CDNs might be blocked by a filter or proxy service on your customers' connection. We typically see this issue with requests originating from Chinese or Indonesian IP addresses.


### 2. Your CDN-hosted jQuery is down or timing out

Another common example of this bug is when the CDN hosting your jQuery script is unreliable or slow to load. Browsers typically have a timeout of around 20-30 seconds for each script tag.


How can I fix a jQuery is not defined error?
-------------------

Luckily there is a simple solution to most of these issues. You can easily provide a locally-hosted fallback version of jQuery as follows:

```html
// First try loading jQuery from Google's CDN
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

// Fall back to a local copy of jQuery if the CDN fails
<script>
window.jQuery || document.write('<script src="http://mysite.com/jquery.min.js"><\/script>'))
</script>
```

If you have a Rails app, you can alternatively use the [jquery-rails gem](https://github.com/rails/jquery-rails), which automates this fallback process for you.

This technique is used on many popular sites, including [jquery.com](http://jquery.com), and solves most `jQuery is not defined` errors. If the CDN jQuery fails load, it will almost certainly load fine from your own domain, but you'll also see the benefits of using a CDN-hosted jQuery for most of your users.

Another option is to [install jQuery using npm](https://www.npmjs.com/package/jquery#babel) or another package manager and bundle it with the rest of your JavaScript. To do this, first run `npm install jquery --save` and then `import $ from 'jquery'`.


Is jQuery a problem on my site?
--------------------------------

It is practically impossible to protect against every JavaScript issue when developing your application, since variables such as browser, operating system, country, and ISP can greatly differ in production.

You can check if this is a problem on your site by using a JavaScript error monitoring service like [Bugsnag](https://www.bugsnag.com). Bugsnag provides comprehensive [JavaScript error reporting](https://www.bugsnag.com/platforms/javascript/) which detects this and all other JavaScript errors.

---

Getting started is incredibly easy, and you'll immediately begin receiving error reports that include user and browser error details. Learn how some of our customers use Bugsnag to monitor JavaScript errors, like [Eventbrite](https://www.bugsnag.com/customers/eventbrite/) and [StubHub](https://www.bugsnag.com/customers/stubhub/). Or, get started now and [try it free for 14 days](https://app.bugsnag.com/user/sign_in/).

*Editor's Note: This blog was originally published in February 2014 and has been updated for accuracy.*
