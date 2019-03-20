---
layout: post
title: "Rails 3.2.13: Performance Regressions and Major Bugs"
publish_date: March 20th, 2013
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: engineering
---

Rails 3.2.13 was [released yesterday](http://weblog.rubyonrails.org/2013/3/18/SEC-ANN-Rails-3-2-13-3-1-12-and-2-3-18-have-been-released/), containing some important security fixes, but it is causing headaches for many developers.

After some recent well documented rails vulnerabilities, many developers are making sure to upgrade their rails versions as soon as security patches are released, but you might consider holding off until 3.2.14 comes out, or risk running into the following performance regressions and bugs:


Broken action_missing
---------------------

The `action_missing` function, which is a Rails controller's equivalent of ruby's `method_missing` was completely broken in 3.2.13. See this issue and the attached pull request for details:

<https://github.com/rails/rails/issues/9799>


Broken ActiveRecord Scopes
--------------------------

This issue has been well documented, since GitHub ran into an [embarrassing bug](https://github.com/blog/1440-today-s-email-incident) caused by the scope behavior change. Basically, certain scoped database query parameters can be overwritten by later chaining operations in certain situations.

<https://github.com/rails/rails/issues/9813>


Performance Regressions
-----------------------

There are performance regressions in 3.2.13 for both view loading and asset loading. Rails 3.2.13 changed the way assets paths are resolved, handing that task to Sprockets instead of resolving internally, which seems to be the cause of the performance issues.

<div class="small">
<blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/quamen">quamen</a> @<a href="https://twitter.com/charliesome">charliesome</a> confirmed here as well, got like 5 second page loads going on</p>&mdash; Charlie Somerville (@charliesome) <a href="https://twitter.com/charliesome/status/314247580366290945">March 20, 2013</a></blockquote>
</div>

For more details, check out the following GitHub issues: <https://github.com/rails/rails/issues/9803>, <https://github.com/rails/rails/pull/9820>


More ActiveRecord Regressions
-----------------------------

There are a bunch more ActiveRecord issues relating to database encoding and relations, so make sure to check out the full list of [open rails issues](https://github.com/rails/rails/issues) to check which 3.2.13 regressions will affect your apps.


What's Different About This Release?
------------------------------------

It looks like there were a total of [296 commits](https://github.com/rails/rails/compare/v3.2.12...v3.2.13) that went into Rails 3.2.13, so it is easy to see how multiple issues crept into this release. Compare that to the [7 commits](https://github.com/rails/rails/compare/v3.2.11...v3.2.12) that made up 3.2.11.

A "security fixes only" release would have gone a long way to avoiding the complexity that caused these issues to slip in.


How Can I Help?
---------------

Thanks to the Rails team for staying on top of recent security issues and being proactive in fixing them. If you'd like to help, there are a few things you can do:

-   Check out the [Rails Issues on GitHub](https://github.com/rails/rails/issues) and submit additional diagnostic information or pull requests.

-   Follow the [Rails Blog](http://weblog.rubyonrails.org/) and help out by testing release candidate builds of rails in your staging or production environments.
