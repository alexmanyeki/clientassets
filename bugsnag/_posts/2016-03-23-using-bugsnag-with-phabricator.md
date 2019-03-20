---
layout: post
title: Manage Bugsnag errors in Phabricator
publish_date: March 23rd, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We're excited to offer another way to make your error data actionable. Today we're releasing our integration with [Phabricator](http://phabricator.org/) to help you automate the process of fixing bugs. If you use Phabricator's [Maniphest](https://phacility.com/phabricator/maniphest/) for project management, you can now integrate with Bugsnag to track errors efficiently.

![Phabricator and Bugsnag](/img/posts/phabricator-bugsnag.png)

Using Bugsnag with Phabricator saves you time by helping you avoid manual entry of your error data. Simply click the Create Issue icon from within your Bugsnag Dashboard and a task will automatically open in Maniphest. You can even opt to have issues automatically opened for new types of errors in production and they'll be assigned to the Phabricator projects you specify.

---

We hope the Bugsnag integration with Phabricator will help make debugging easier and faster for you and your team.

To see if Bugsnag integrates with your tools, see our full [list of integrations](https://www.bugsnag.com/integrations/#all).
