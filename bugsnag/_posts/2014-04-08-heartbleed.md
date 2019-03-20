---
layout: post
title: Heartbleed SSL Bug Response
publish_date: April 8th, 2014
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: news
---

As you may have already heard, a critical OpenSSL vulnerability known as [Heartbleed](http://heartbleed.com/) was discovered recently which affects most web servers and load balancers on the internet.

Bugsnag is **no longer vulnerable** to the Heartbleed attack. Our technology providers at Amazon swiftly moved to eliminate the threat, and we've reissued our SSL certificates.

As an additional precaution, we've upgraded our SSL end-points to provide [perfect forward secrecy](http://vincent.bernat.im/en/blog/2011-ssl-perfect-forward-secrecy.html)
to minimise the impact of similar bugs in the future.

![Heartbleed logo](/img/posts/heartbleed.png)

Although there is no evidence to suggest that Bugsnag accounts were in any way compromised, we recommend that you change your Bugsnag passwords as a best practice.

If you have any questions at all, don't hesitate to reach out to us at <support@bugsnag.com>.
