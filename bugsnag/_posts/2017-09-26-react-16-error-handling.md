---
layout: post
title: "React 16: What’s new? Error handling!"
publish_date: September 26th, 2017
author_name: Ben Gourley
author_twitter: bengourley
author_avatar: beng
categories: engineering
hero_image: react16-blog.png
---


__React [shipped][react-16-launch] a major version (v16.0) this week.__ Because
the project is developed in the open, the community has been able to [track the progress of this release][16-release-issue],
get a feel for what’s on the horizon, and even shape what lands in it. Naturally,
we’ve been eagerly anticipating the overhaul of error handling.

Here we’ll summarise what’s new, dive into error handling and show you how to make
the most of the new features by hooking them up to Bugsnag.

## What’s changed?

From the outside: in short, not a huge amount. However, the internals have had a
_complete_ rewrite – a project known as "[Fiber][fiber]", which has been underway
for over a year.

Because of this huge internal changeset, the maintainers [focused largely on compatibility][16-rc-issue]
with existing apps – wisely enabling them to leverage the huge ecosystem of working
React apps in the wild as a catalogue of real-life test cases. Luckily for you,
some ahead-of-the-curve teams tried out the release candidates and helped to iron
out the creases. 😉

As part of the rewrite many private/internal APIs have changed or been removed,
so if you were monkeypatching or fiddling with anything you shouldn’t have, you
will probably need to update that.

The main feature additions are:

- Support for [custom DOM attributes][custom-dom-attributes]
- Support for new `render()` return types: [fragments, portals and strings][render-return-types]
- Vastly improved error handling with [Error Boundaries][error-boundaries]

You can read all about the custom DOM attributes and `render()` return types on
the [React blog][react-16-launch] – they’re nice, but we’re much more interested
in error handling (surprised, much?).

## Handling errors in React

[Handling][error-issue-1] [errors][error-issue-2] in [React][error-issue-3]
[has][error-issue-5] [been][error-issue-6] a [frustrating][error-issue-6] [endeavour][error-issue-7].
There’s been no consistent and failsafe way to catch and deal with errors, until now!
The Fiber rewrite laid the groundwork for better error handling, starting with a
new feature called __Error Boundaries__.

An error boundary is a React component with a `componentDidCatch(err, info)` method.
Any errors occurring in a component tree get reported up to the nearest error boundary’s
`componentDidCatch` function, giving your app the chance to:

- Handle the error gracefully (e.g. call `setState(…)` to render an error/fallback state).
- Send the error to a reporting service, such as Bugsnag (more on this in just a sec!).

Additionally, unhandled errors (those _not_ caught by an error boundary) will cause
the entire tree to be unmounted. Quite a drastic measure indeed, but considering
the alternative of attempting to continue with the app in some undefined state…
that’s what got us into this mess in the first place!

The upshot is that __you should use error boundaries__ in your app so that when
something goes wrong, you provide your users with a sensible UI, and yourselves
with a detailed report of what happened.

## Sending React errors to Bugsnag

We’d find it hard to disagree with this advice from the React team when
they [introduced][error-boundaries] Error Boundaries to the world…

> We … encourage you to use JS error reporting services … so that you can learn
> about unhandled exceptions as they happen in production, and fix them.

Bugsnag helps you do exactly that. We provide [error reporting for browser JavaScript][js-platform]
(amongst over 20 different platforms) and a [React-specific integration][bugsnag-react]. You can [sign up][sign-up]
and start sending errors using our [browser integration guide][bugsnag-docs] in a matter of minutes.

Our JavaScript notifier reports uncaught exceptions by default, which means if
your tree gets unmounted you will already get notified. However, if you purposefully
catch errors with error boundaries, you can report them with more contextual information
which will help to you find and fix issues quicker. The [bugsnag-react integration][bugsnag-react]
provides an `<ErrorBoundary />` component, which you can use as follows:

```js
// initialize bugsnag ASAP, before other imports
import bugsnag from 'bugsnag-js'
const bugsnagClient = bugsnag('API_KEY')

import ReactDOM from 'react-dom'
import React from 'react'
import createPlugin from 'bugsnag-react'

// wrap your entire app tree in the ErrorBoundary provided
const ErrorBoundary = bugsnagClient.use(createPlugin(React))
ReactDOM.render(
  <ErrorBoundary>
    <YourApp />
  </ErrorBoundary>,
  document.getElementById('app')
)
```

Any component lifecycle errors within the `<ErrorBoundary />` will be caught and
handled by the `componentDidCatch()` method. It’ll be reported to your dashboard
like so:

![Example React error in the Bugsnag dashboard](/img/posts/react-component-stack.png)

If you were wondering why we wrapped the `<YourApp/>` component rather than having
the top-level component become an error boundary, note that an error boundary _cannot_
handle its own errors, only those occurring within its subtree.

To explore this in more detail, check out our [example project][example-project].

---

So hopefully you’re as excited as we are about finally being able to handle errors
gracefully in React. We wish you a smooth and speedy upgrade to v16.0 and hope
to see you sending some high quality reports to your dashboard in the near future!
🎉

*Editor's Note: This post was updated on December 11, 2017, for accuracy and comprehensiveness.*

[16-release-issue]: https://github.com/facebook/react/issues/8854
[fiber]: https://gist.github.com/duivvv/2ba00d413b8ff7bc1fa5a2e51c61ba43
[16-rc-issue]: https://github.com/facebook/react/issues/10294#issue-245838506
[custom-dom-attributes]: https://facebook.github.io/react/blog/2017/09/08/dom-attributes-in-react-16.html
[error-boundaries]: https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html
[error-issue-1]: https://github.com/facebook/react/issues/2461
[error-issue-2]: https://github.com/facebook/react/issues/4910
[error-issue-3]: https://github.com/ReactTraining/react-router/issues/2338
[error-issue-4]: https://github.com/facebook/react/issues/1593
[error-issue-5]: https://github.com/facebook/react/issues/4026
[error-issue-6]: https://github.com/facebook/react/issues/6895
[error-issue-7]: https://github.com/facebook/react/issues/8579
[example-project]: https://github.com/bugsnag/bugsnag-react/tree/master/example
[react-16-launch]: https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html
[render-return-types]: https://facebook.github.io/react/docs/react-component.html#render
[bugsnag-docs]: https://docs.bugsnag.com/platforms/browsers/react/
[bugsnag-react]: https://github.com/bugsnag/bugsnag-react/
[sign-up]: https://app.bugsnag.com/user/new
[js-platform]: https://www.bugsnag.com/platforms/javascript/
