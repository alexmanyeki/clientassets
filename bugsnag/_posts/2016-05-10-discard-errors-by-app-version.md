---
layout: post
title: Discard errors by app version in Bugsnag
publish_date: May 10th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

To make your apps better, you iterate often, releasing new versions to your customers regularly. After a while, errors in older app versions become less important as you work to maintain newer versions while continuing to build more features for your customers. In fact, you probably want to start ignoring errors from your oldest versions and focus your attention on the new.

Now you can discard errors by app version in Bugsnag, helping make your Dashboard clearer and more relevant to you.

![Discard errors by app version](/img/posts/discard-by-app-version.png)

You can set this up on your projects easily through our new [settings center](https://blog.bugsnag.com/new-bugsnag-settings/). Navigate to *Projects* in settings and select the project you'd like to configure. You'll find the option for *Discard by app version* under *Error Processing*.

![Error processing](/img/posts/error-processing.png)

You can specify version numbers in a few different ways — this feature supports [ranges](https://github.com/npm/node-semver#ranges), [regular expressions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_meaning_in_regular_expressions), and wildcards. Once you've configured this option, Bugsnag won't notify you anymore about errors happening in the app versions you specified.

---

We hope this feature will help make your error data more actionable. Be sure to follow us on [Twitter](https://twitter.com/bugsnag) for more new features from our team.
