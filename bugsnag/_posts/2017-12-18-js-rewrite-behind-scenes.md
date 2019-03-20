---
layout: post
title: "JS notifier rewrite: Behind the scenes"
publish_date: December 18th, 2017
author_name: Ben Gourley
author_twitter: bengourley
author_avatar: beng
categories: engineering
hero_image: js-behind-the-scenes.png
cover_image: js-behind-the-scenes-cover.png
---

Earlier this month we shipped a major version of our JavaScript notifier. If you're not yet using it, you should definitely give it a spin. This was a full rewrite – so much so that the [new](https://github.com/bugsnag/bugsnag-js/tree/master) and [old](https://github.com/bugsnag/bugsnag-js/tree/v3) branches don't [share _any_ git history](https://github.com/bugsnag/bugsnag-js/compare/master...v3) – a true clean slate!

We’d like to take you through the __whys__ and the __hows__ of the rewrite – what prompted it, the implementation, and interesting details along the way.

## The times, they have a-changed

The first version of Bugsnag JS was born in January 2013. Seemingly not that long ago in the grand scheme of things, but within the geological landscape of Javascript, a period of just under five years is enough to see tectonic shifts. Over time, Bugsnag JS saw many feature additions, bug fixes and improvements, and though few lines survived untouched from five years ago, the original architecture remained largely intact.

Meanwhile, the JS community saw widespread adoption of bundlers such as [browserify](http://browserify.org/) and [webpack](https://webpack.js.org/), paving the way toward a means of writing modular code and a robust way to depend on third-party libraries.

The advent of <abbr title="browsers that auto-update without prompting the user">evergreen</abbr> browsers started to bear fruit as use of archaic browsers such as IE6/7 finally tailed off, meaning features and improvements were delivered quicker and to a wider user-base than ever before.

Adoption of front-end build processes – be it simple minification and concatenation, bundler module resolution, or even compiling another language to JS – was the backdrop to an increased appetite for tools that convert a "modern" (sometimes futuristic) version of JavaScript into a common-subset that has wider browser support. By using a tool like [Babel](https://babeljs.io/), developers can take advantage of language features that don't exist in browsers they need to support.

## Unwrapping goodness

The minimal requirements for a useful error report are:

- error name/message
- line number
- column number
- file name

In older browsers, not all of this info is present when handling an error. The only way to get it all is to find __every__ available asynchronous entrypoint and wrap the callback in a `try/catch` block. The previous version of Bugsnag basically had no option than to take [this mightily intrusive approach](https://github.com/bugsnag/bugsnag-js/blob/9cee10eca1a1bf6d66b89c31e5b42a5b186a74ad/src/bugsnag.js#L1310-L1343).

Thankfully, browser quality has improved and usage moved enough that we no longer need to do this! The only native functions Bugsnag JS `v4` will wrap are:

- `history.pushState`, `history.replaceState`
- `console.debug`,`console.info`, `console.warn`, `console.error`

The purpose of which is non-essential to error reports but to provide [breadcrumbs](https://docs.bugsnag.com/platforms/browsers/js/#leaving-breadcrumbs) for useful error context. They can be switched off if desired.

The removal of the majority these function wrappers helps Bugsnag have as little impact as possible on the performance of the page.

## Delivering the `POST`

Previous iterations of Bugsnag needed to support IE6/7 – neither of which provide a means of making an AJAX request to a different domain than the page was loaded on. Considering the fact that our error reporting server lives at `notify.bugsnag.com`, and no website (not even ours) lives there, this was a big problem!

The way we got around this was actually pretty crafty. The error report would be serialized and encoded in a query string, then `notify.bugsnag.com/js?{querystring}` would be set as the `src` property of a `new Image()` object. The browser would make a `HTTP GET` request to what it believed was the source of an image, but in reality it just transmitted some data to a server on a different domain.

The main problem with this approach (and there were a few!) is that the amount of data you can transmit in a URL is [limited to about 2000 characters](https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers). This meant that the amount of metadata and breadcrumbs in error reports was severely limited – even for browsers that were able to send cross-domain AJAX requests.

In almost all the browsers we support in Bugsnag JS `v4`, you can simply make cross-domain `HTTP POST`s with AJAX, and in the remainder – IE8/9 – thankfully Microsoft provided a proprietary `XDomainRequest` object which can be used in basically the same way.

Now errors can be sent with as much metadata as our other notifiers, capped at a sensible limit of 1MB. This means much more context can be provided around reported errors, making them easier to diagnose and fix.

## Architecture

The last version of Bugsnag JS existed before the widespread use of bundlers for browser code, and as such, it was one huuuuuge `.js` file*. By using a bundler for the rewrite we were able to build the notifier with nice modular architecture, and easily depend on modules from npm. Bundle size is an important aspect for us, since we recommend Bugsnag is loaded in the `<head/>` of a page – the critical path – it's important that we keep file size as small as possible. We set a bundled gzipped size budget of `10kB` (at the time of writing, it's `8.76kB`).

Having logically named files with lengths up to ~200 lines (compared with the ~1.4k lines in `v3`) makes the codebase easier to comprehend, makes it possible to test parts in isolation, and enables us to decouple moving parts.

The core abstractions – the [client](https://github.com/bugsnag/bugsnag-js/blob/master/base/client.js), [report](https://github.com/bugsnag/bugsnag-js/blob/master/base/report.js), and [breadcrumb](https://github.com/bugsnag/bugsnag-js/blob/master/base/breadcrumb.js) classes – are separated from the [environment specific functionality](https://github.com/bugsnag/bugsnag-js/tree/master/browser). This helps to encapsulate features in distinct units, again making them easier to test isolation, but also reducing churn in core parts of the module which should rarely need to change. This additionally has the benefit of making the core abstractions usable in other JS environments, such as Node.js, React Native, Electron and Unity – all of which currently have disparate implementations which we plan to unify.

The way browser-specific features are injected into the library is also exposed publicly as a plugin interface. Along with the `v4` release, we shipped first-class integrations for [Vue](https://github.com/bugsnag/bugsnag-vue), [React](https://github.com/bugsnag/bugsnag-react) and [Angular](https://github.com/bugsnag/bugsnag-angular).

With our bundler (we settled on browserify), we export a UMD bundle so that the notifier can be included via any module loader, or by putting it in a `<script>` tag on a webpage. To optimize the output size, we use [uglify-js](https://github.com/mishoo/UglifyJS2) – the de-facto JS minifier, and [browser-flack-pack](https://github.com/goto-bus-stop/browser-pack-flat) – which flattens all of the bundled modules into a single scope for better compression. The JS community is very excited about "tree-shaking" or "dead code elimination" at the moment – however, the use of these is more appropriate for applications than libraries – there is simply no "dead code" to eliminate from Bugsnag!

<small>* It also remained that way because until recently a single JS file would minify more efficiently than a bundled module, which contains multiple scopes and additional method calls to import and export between them</small>

## TypeScript support

As with the previous incarnation of Bugsnag JS, we provide support for TypeScript by authoring `.d.ts` files to accompany the JS.

This time we've put more attention in the QA and validity of the types, using [tslint](https://palantir.github.io/tslint/) to enforce good style and help prevent errors.

Additionally – due to the lack of a tool which will verify the correctness of TS types for JS* – there are unit tests to [generate a TS program](https://github.com/bugsnag/bugsnag-js/blob/master/types/test/types.test.js) using all the available config options and check that it compiles.

<small>* [tscheck](https://github.com/asgerf/tscheck) looked promising, but is very [out of date](https://github.com/asgerf/tscheck/issues/6#issuecomment-346691266)</small>

## Release robot

Doing a release of Bugsnag JS involves coordinating a bunch of tasks. Humans – full of organic matter and fallibility – basically suck at repetitive tasks but computers, thankfully, are quite the opposite. So we enlisted the help of computers such that the human only has to decide whether the release is a major/minor/patch, and then type:

```
npm version major|minor|patch
```

The automated release process will:

- prompt the human to populate a changelog entry
- update size badge in readme (because devs love badges!)
- create a version tag
- create a version commit
- upload `dist` bundles to the CDN
- invalidate the CDN cache
- push branch and tags to GitHub
- publish to the npm registry

---

We're really happy with our shiny, new notifier and pleased to share the details with you.

It's a solid base on which to build new features and we're looking forward to providing exciting new features (and of course, boring robustness and stability!). We hope this look behind the scenes was interesting and if you fancy a deeper perusal, the source is – of course – open [on GitHub](https://github.com/bugsnag/bugsnag-js).

<!--

### Outline

#### intro

- you may have noticed we shipped a major version of our JavaScript notifier
- this was a ground-up rewrite
- this post explores the why and the how

#### times they have a-changed

- js ecosystem has changed a lot in the last five years
- browsers now auto-upgrade (yay)

#### unwrap

- previously the only way to get good stack traces was to wrap every async entrypoint
- we no longer have to do that since browsers generally provide good stacktraces
- aside, complain about lack of async stacktraces

#### HTTP POST

- explain the ol' hacky delivery mechanism which supported IE6/7
- explain the new shiny, but explore the XDomainRequest madness in IE8/9
- mention the ability to handle arbitrarily large payloads (limit 1MB)

#### architecture/bundling

- the old notifier existed before widespread use of bundlers in browser js
- it was a huuuuge single file
- the new notifier has a modular architecture, makes it
  - easier to test
  - easier to comprehend
  - decouple components and make better abstractions
- the core abstractions are separate from the environment-specific functionality
- using browserify to bundle the library and export a UMD interface for consumption
- could have used rollup/webpack
- aside, talk about browserify
  - why? want to eventually use same codebase for node and browser notifier
  - UMD export
  - optimizing bundle size

#### automate ALL the things

- automated release process

  - prompts for changelog
  - updates size badge in readme (because devs love badges)
  - tags and version commits
  - uploads to cdn
  - pushes to github
  - publishes to npm

-->
