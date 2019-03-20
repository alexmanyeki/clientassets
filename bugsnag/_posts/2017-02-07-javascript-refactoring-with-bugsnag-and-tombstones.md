---
layout: post
title: Safely remove dead code with Bugsnag and Tombstones
publish_date: February 7, 2017
author_name: Emily Nakashima
author_twitter: eanakashima
author_avatar: emily
categories: engineering
---

_Part one in a two-part series on javascript refactoring and Bugsnag_

Exception monitoring is great for capturing bugs that slip through the cracks,
but in a perfect world, we'd rather catch every bug before it gets to
production. In this two-post series, we'll cover two techniques to help refactor
your legacy javascript safely and increase the number of issues you catch before
your users ever see them in production.

## The problem of dead code

We successfully launched our rewritten dashboard app just over a year ago, and
since then we've completed major rewrites of a few other areas of the site,
including a redesign of our settings pages and the removal and rebuilding of our
marketing site. While re-architecting areas of our site gives us a great chance
to update our code in line with our latest best practices, it sometimes has the
downside of leaving behind bits of legacy code that might or might not be used.

This has got me thinking about the problem of how to safely find and remove
dead code. This possibly-dead code may not cause obvious problems for our users,
but it creates more subtle issues, bloating our asset bundles, slowing test run
times, and increasing the overhead to understand and update existing behavior.
Unfortunately, sometimes it's not completely clear whether code is dead or not.
For that, we can use Tombstones.

## Using tombstones to find dead code

I first heard of the Tombstone technique from a [Seth Walker](https://twitter.com/sethwalker)
[talk](http://sethwalker.me/talks/continuous-experimentation/) on tooling and
techniques to support continuous experimentation, but there's also a great
Velocity [Ignite Talk](https://www.youtube.com/watch?v=29UXzfQWOhQ&feature=youtu.be)
that explains Tombstones in a few minutes.

TL;DR, every time you see suspicious code in your codebase that _might_ be dead,
you mark it with a tombstone. For example, we have two versions of our
[Breadcrumbs](/javascript-automatic-breadcrumbs/) component,
the original and a newer one that supports displaying Breadcrumb types:

#### Legacy Breadcrumbs

![breadcrumbs](/img/posts/breadcrumbs.png)

#### Current Breadcrumbs

![JavaScript automatic breadcrumbs](/img/posts/js-auto-breadcrumbs.png)

I'm guessing we don't need the legacy one anymore, but I can't tell just from
looking at our codebase — the event data they render is piped through a series
of backend services, and it's hard to tell just by glancing through the code if
the existing infrastructure could generate a legacy breadcrumb or not. So I mark
it with a tombstone:

```javascript
  // In the LegacyBreadcrumbs component:
  import tombstone from 'lib/tombstone';

  // We call the tombstone function whenever the component is used in the UI:
  componentDidMount() {
    tombstone('LegacyBreadcrumbs', '2017-01-24', { breadcrumbs: this.props.breadcrumbs });
  },
```

The tombstone function is a small wrapper around bugsnag-js's notify function
that takes three arguments:

- **Name**: A string name that will help us quickly understand where this
  tombstone is. For us, this would probably be the name of a React component or
  a Reflux store.
- **Date string**: Today's date, so we know when the tombstone was deployed
- **Metadata**: A metadata object for any additional information we want to send
  that will help explain why this code path was called.

Here's the tombstone wrapper code in its entirety:

```javascript
import Bugsnag from 'bugsnag-js';

function tombstone(component, date, metaData = {}) {
  Bugsnag.notify('Tombstone', `Live code found in ${component}`, {
    tombstone: {
      component,
      date,
      ...metaData,
    }
  });
}

export default tombstone;
```

If all goes well, our tombstone will never call `Bugsnag.notify`, and when
someone happens across it in a few months (or we go searching for tombstones to
cull) we'll know we can safely delete the code surrounding it.

If you've made a terrible mistake and the tombstone happens to be in a commonly
used code path, you can either "ignore" or "discard" the original error to avoid
the noise, and then delete the tombstone call out of your codebase.

![ignore or discard the error](/img/posts/discard.png)

For tombstones that are only called or "resurrected" a few times, we can search
Bugsnag occasionally for error class "Tombstone" and decide whether it's worth
refactoring that code path away or just deleting the tombstone call.

![filtering by class Tombstone in Bugsnag](/img/posts/tombstone.png)

## Why not just call Bugsnag.notify directly?

Tombstones are so simple that you might ask why they need their own name and
convention at all. Why not just call `Bugsnag.notify` directly?

```javascript
  componentDidMount() {
    Bugsnag.notify('Notice', 'We thought this code was unused, but we were wrong');
  },
```

You certainly could do this. But using the Tombstone wrapper has a few advantages:

- **Team Communication**: tombstones give you an easy way to communicate to
  teammates, "I looked at this code and thought it was dead" and help get newer
  team members in the habit of trying to identify and remove dead code.
- **Searchability**: search for "tombstone" in the codebase and look at all your
  identified possibly-dead code at once. A few language communities even have
  open-source plugins for easily collecting historical tombstone stats.
- **Visibility**: Consistently using a single class like "Tombstone" will help
  you easily see all your resurrected tombstones in Bugsnag at once.

## What next?

Tombstones are a simple technique that helps you verify whether code is dead with
minimal effort. But is there a less-manual way we could achieve the same goal?
Maybe. Our linting tools have become better and better at helping us identify
unreachable code during our build process, and we're looking forward to trying
out Webpack 2's [tree shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)
abilities to remove modules and functions from our production asset bundles if
they are never required in our app. Tree-shaking won't remove the code from our
codebase, but it would reduce the benefits of time spent manually identifying
dead code. And using type checking tools like [Flow](https://flowtype.org/) or
[Typescript](https://www.typescriptlang.org/) at more points in our event
pipeline and dashboard app could help us avoid cases where the types of data
rendered in the UI may be unclear. But for now, Tombstones are still a useful
tool for verifying whether code is dead with relatively low effort.

Dead code is one thing, but what about refactoring critical code that's still
very much in use? In the next post, I'll cover a refactoring technique
inspired by GitHub's [Scientist](https://githubengineering.com/scientist/) gem
for refactoring your most important js while it's still being used in production.
