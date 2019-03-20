---
layout: post
title: SPDY on Rails
publish_date: August 5th, 2012
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: engineering
---

At [Bugsnag](https://www.bugsnag.com) we use SPDY on our production rails
application. For our users who run modern browsers, this can make the site
feel much faster and more responsive. Want to get SPDY working on your
production rails app? Read on.


What is SPDY?
-------------

[SPDY](http://en.wikipedia.org/wiki/SPDY) is a modern networking protocol for
the web which has been designed from the ground up to reduce page load times
and latency, as well as improve security. The SPDY protocol was developed by
Google, and is a candidate to be used as the basis for HTTP/2.0.


Is SPDY Ready for Production Use?
---------------------------------

Major sites, including Google and Twitter are using SPDY right now, and
Facebook are currently in the process of
[implementing SPDY](http://lists.w3.org/Archives/Public/ietf-http-wg/2012JulSep/0251.html).

The latest stable versions of modern web browsers, including Chrome and
Firefox, already support SPDY. In fact, if you are using Google Chrome and
you head to a SPDY-enabled website, your browser will automatically use SPDY,
falling back to HTTP if SPDY is not supported.

You can track [which browsers currently support SPDY](http://caniuse.com/spdy),
but with the transparent fallback to HTTP, you can use SPDY right
now. Think of it as progressive protocol enhancement.

Short answer: *YES*.


Adding SPDY Support to Your Rails App (Nginx+Passenger)
-------------------------------------------------------

I'm going to discuss Bugsnag's production setup, as it is one of the most
common production configurations for rails apps, and it is very easy to add
SPDY support.

Bugsnag uses [Nginx](http://nginx.org/) with the
[Phusion Passenger](http://www.modrails.com/) module to serve our rails app.
Since Passenger is implemented as an Nginx module, by adding SPDY support to
Nginx, you will automatically get SPDY support on your rails apps.

To add SPDY support to Nginx, you'll have to apply the Nginx SPDY patch to a
development version (1.3.x) of Nginx. Both the Nginx development branch and
the SPDY patch are considered *experimental*, but we have been using them both
in production for months with no issues.

The following script automatically builds Nginx with Passenger and SPDY
support:

<https://gist.github.com/loopj/3266998>


Configuring Nginx to Use SPDY
-----------------------------

Most browsers with SPDY support require that SPDY uses SSL. If your production
site is not already SSL compatible (or even SSL-only) you will first have to
obtain an SSL certificate and configure Nginx to use SSL.

Setting up SSL is outside the scope of this blog post, but I recommend getting
a [free SSL certificate from StartSSL](http://www.startssl.com/) and following Simon Westphahl's
excellent
[Setting up HTTPS with Nginx and StartSSL](http://www.westphahl.net/blog/2012/01/03/setting-up-https-with-nginx-and-startssl/)
guide. You can also check out the
[official Nginx SSL documentation](http://nginx.org/en/docs/http/configuring_https_servers.html).

Once you have got your app working with SSL/HTTPS, enabling SPDY is as
simple as adding the `spdy` configuration flag to your Nginx server directive:

<https://gist.github.com/3267466>

For more details about Nginx SPDY configuration, check out the
[Nginx SPDY docs](http://nginx.org/en/docs/http/ngx_http_spdy_module.html).


Testing & Benchmarking SPDY on Your Site
----------------------------------------

Once you have installed Nginx+Passenger with SPDY support, and updated
your Nginx config files, you should be ready to (re)start Nginx and test
that SPDY is working.

For an instant yes/no answer, I recommend installing the
[Chrome spdy indicator extension](https://chrome.google.com/webstore/detail/mpbpobfflnpcgagjijhmgnchggcjblin)
which will show a green lightning bolt in your address bar if SPDY is active
on the current page:

![](/img/posts/spdy-indicator.png)

You can also type `about:net-internals` into Chrome's address bar to see more
detailed information about active SPDY sessions.

If you would like to benchmark your shiny new SPDY setup, check out the
[Chrome benchmarking extension](http://www.chromium.org/developers/design-documents/extensions/how-the-extension-system-works/chrome-benchmarking-extension)
or [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).


Monitoring SPDY in Production
-----------------------------

Since SPDY-compatible browsers should automatically fall back to HTTPS when
SPDY is not available, you can continue to use your current production
site monitoring systems such as [Monit](http://mmonit.com/monit/) or
[Pingdom](http://www.pingdom.com/).

If you would like to have SPDY specific monitoring, consider writing a Monit
monitoring script which uses the `spdycat` tool from
[spdylay](https://github.com/tatsuhiro-t/spdylay). Pingdom does not currently
support monitoring the SPDY protocol.



SPDY on Rails Without Nginx
---------------------------

If you are using Apache, check out [mod_spdy](http://code.google.com/p/mod-spdy/).
It doesn't look like Unicorn supports SPDY right now, but it might be
possible to use a SPDY proxy.


Conclusion
----------

- SPDY is ready to use right now
- It is easy to get your Rails apps using spdy with nginx + spdy patch + passenger
- Falls back to plain HTTP, progressive protocol enhancement
