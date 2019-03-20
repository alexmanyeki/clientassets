---
layout: post
title: Effective Error Reporting with Bugsnag and EmberJS
publish_date: March 17th, 2015
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: guides
---

>This is a guest blog post written by [Todd Smith-Salter](https://twitter.com/ToddSmithSalter), VP of Product Strategy at [12 Stars Media](http://12starsmedia.com/). He explains how [Candidio](https://twitter.com/candidio) uses EmberJS with Bugsnag to capture errors.

An important part of a professional application is catching and reporting bugs. In [Candidio](http://candidio.com/), we report bugs from our [EmberJS](http://emberjs.com/) application to [Bugsnag](https://www.bugsnag.com).

![EmberJS and Bugsnag](/img/posts/bugsnag-and-emberjs.png)

Bugsnag has [great documentation](https://docs.bugsnag.com) and a good amount of language support with their first-party notifier libraries. We're quite happy with their service and look forward to using them for the foreseeable future. Here's how we've setup Bugsnag with our application to track errors in Candidio.

## Bugsnag.js

Get Bugsnag's [Javascript notifier](https://github.com/bugsnag/bugsnag-js) with [Bower](http://bower.io/) using the command `bower install --save bugsnag`. Import the bugsnag.js source into your app in `Brocfile.js` with `app.import('bower_components/bugsnag/src/bugsnag.js');`.

In `.jshintrc` add `"Bugsnag": true` to the `predef` hash, so you don't get squawked at every time you use the `Bugsnag` global variable.

## Initializer

Create a new initializer at `app/initializers/bugsnag.js` on the command line with the `ember g initializer bugsnag` command. In the initialize function, we're going to declare the Bugsnag API key, the releaseStage (current environment), and the stages we want to notify Bugsnag from. In Candidio, we only send Bugsnag errors from our staging environment and the production site.

```javascript
Bugsnag.apiKey = config.APP.BUGSNAG.API_KEY;  
Bugsnag.releaseStage = config.environment;  
Bugsnag.notifyReleaseStages = ["staging", "production"];
```

### Routing Errors

The first type of error we want to report is routing and edge cases, which we'll catch with Ember.onerror. In this error report and the following, we're sending along the current path, rather than letting Bugsnag grabbing the URL from `location.href`. I've found that in the context of EmberJS development, this is more useful.

```javascript
Ember.onerror = function(error) {  
  Bugsnag.context = appController.get('currentPath');;
  Bugsnag.notifyException(error);
};
```
### Promise/AJAX Errors

We should also catch errors from rejected Promises, which we can do similarly with the RSVP.on('error') method.

```javascript
Ember.RSVP.on('error', function (error) {  
  Bugsnag.context = appController.get('currentPath');
  Bugsnag.notifyException(error);
});
```

## Bonus: JavaScript Sourcemaps

Sourcemaps are enabled by default on the ember-cli development build, but to get a sourcemap on every build, including production, add the following `sourcemaps` hash in `Brocfile.js`. Bugsnag will get the sourcemap declaration at the bottom of our concatenated source and give you a *much* improved stack track over the minified source.

```javascript
// Brocfile.js
var app = new EmberApp({  
  ...
  sourcemaps: {
    "enabled": true,
    "extensions": ["js"]
  }
});
```
[Gist of the Bugsnag integration](https://gist.github.com/ToddSmithSalter/23ad9ed91a693b498709)

## Other useful details you can send to Bugsnag

* [Current user data](https://github.com/bugsnag/bugsnag-js#user)
* [Meta data](https://github.com/bugsnag/bugsnag-js#metadata) about the current user's session, containing entities, or account

*Update*: You should still log errors to your log files in addition to sending them to Bugsnag. Thanks to Ben Holmes for the tip!

---

Follow Todd on [Twitter](https://twitter.com/ToddSmithSalter), and be sure to checkout Bugsnag's [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/).
