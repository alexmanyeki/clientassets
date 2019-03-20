---
layout: post
title: 🎉 Universal JavaScript support 🚀
publish_date: November 27th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Improve the stability of your Universal JS applications, with automatic error detection so you can prioritize and fix errors.    
categories: features
hero_image: bugsnag-universal-js.png
cover_image: bugsnag-universal-js-cover.png
---

Today we're excited to share official support for Universal JavaScript 🎉! With this launch, we have unified the Bugsnag JS and Node libraries into a single, cohesive library that supports all JavaScript projects whether they run in the browser or on the server.

Whether you're using Bugsnag in a Universal JS, Node.js, or browser-based Javascript application, you'll now use the same library - [`@bugsnag/js`](https://www.npmjs.com/package/@bugsnag/js). We're deprecating the old [`bugsnag`](https://www.npmjs.com/package/bugsnag) and [`bugsnag-js`](https://www.npmjs.com/package/bugsnag-js) packages on npm and they will now only receive critical bug fixes.

## What's this Universal JavaScript business?

In case you're newer to Universal JS (also called [Isomorphic JS](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)), it refers to the same JavaScript code being run across browser and server. Here are a couple of the advantages of Universal JS.

### Server-side rendering (SSR)
Modern client-side JavaScript apps typically suffer from a delay while the JavaScript app is sent over the network, then parsed and executed by the browser, and eventually rendered into something useful. When you can run the client application on the server too, you can provide a better user experience (and better SEO) by rendering the initial state of the page on the server and sending the full HTML over the network.

### Code reuse
If you want to provide a decent UX on the forms on your web app, you'll want to do ad-hoc input validation client side as well as on the server when the form gets submitted. When you use a different language on the server as you do on the client (for example, a Rails app with a React front-end), you end up writing and maintaining the same code in two different languages. Universal JavaScript means you can write, test, and maintain this kind of logic just once.

## Bugsnag for Universal JavaScript

This release of Bugsnag allows authors of JS applications — whether they are running on the client, server, or universally across both – to use the `@bugsnag/js` module in exactly the same way on each platform. The package will automatically load the correct internals based on whether it is running in Node.js or being bundled into a client-side application.

We care about the performance of your applications, and therefore client bundle size, so it's important to note that only browser relevant code is included when you import `@bugsnag/js` with Webpack/Browserify, or load it from the [CDN](https://d2wy8f7a9ursnm.cloudfront.net/v5.0.0/bugsnag.min.js).

Bugsnag Node users will appreciate the greatly modernized interface and superior user experience with the new library. The original [Bugsnag Node](https://github.com/bugsnag/bugsnag-node) library will no longer be updated, but it will still be available for users who put off upgrading. Upgrading to the new library will require the same custom configurations done when you initially setup Bugsnag Node, like setting up metadata in your error reports or notifying Bugsnag of handled errors.

---

Get started with our [documentation](https://docs.bugsnag.com/platforms/javascript), and checkout the [upgrade guide](https://github.com/bugsnag/bugsnag-js/blob/master/UPGRADING.md) for more information if you're updating from an existing version of Bugsnag.

If you're new to Bugsnag, you can [try out](https://app.bugsnag.com/user/new) Universal JS support free for 14-days.
