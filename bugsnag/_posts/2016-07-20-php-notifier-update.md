---
layout: post
title: Upgrades to the PHP notifier
publish_date: July 20th, 2016
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
---

We're excited to share an overhaul of the Bugsnag PHP notifier that includes major improvements designed specifically for modern PHP apps. Be sure to [upgrade](https://github.com/bugsnag/bugsnag-php/blob/master/UPGRADING.md#2x-to-3x) to take advantage of the new ease of use and customization options.   

Here's what's new:

### New unified way to modify all error reports

Changing variables in your error report before they're sent is now more flexible as `notify()`, `notifyException()`, and `notifyError()` accept a callable that Bugsnag runs later. This allows you to modify any part of an error report in a consistent way. Take a look at our [documentation](https://docs.bugsnag.com/platforms/php/other/customizing-error-reports/#the-report-object) to see how it works.

### Namespaced library under `Bugsnag`

We've changed the names of the files to be more consistent with language standards and, as a result, shorter to type. The library is now namespaced under `Bugsnag`.

### Transport handling with Guzzle   

We've implemented [Guzzle](http://docs.guzzlephp.org/en/latest/) as the HTTP client for Bugsnag PHP. With the addition of this community standard, the Bugsnag PHP library is now smaller and focuses solely on crash detection while Guzzle handles HTTP transport concerns.

### Laravel notifier update

We've upgraded the Bugsnag Laravel notifier to take advantage of these changes, so its extra powerful under the hood.

And finally, we've resolved all known bugs in both the [Laravel](https://docs.bugsnag.com/platforms/php/laravel/) and [PHP](https://docs.bugsnag.com/platforms/php/) libraries.

We're excited about these changes because it makes the PHP library much easier to use, and we hope you and your team have a great experience with it.

---

To take advantage of these improvements, you'll need to upgrade to v3 of the Bugsnag PHP library. There are changes you'll need to make to your current setup, so please be sure to take a look at our [upgrade guide](https://github.com/bugsnag/bugsnag-php/blob/master/UPGRADING.md#2x-to-3x). This notifier requires PHP 5.5 or higher, but you can still use v2 if you're using an older version. v2 will continue to be maintained.

To read the full list of changes, please see our [PHP Changelog](https://github.com/bugsnag/bugsnag-php/blob/master/CHANGELOG.md#300-2016-07-07). Learn more about Bugsnag's [PHP error reporting](https://www.bugsnag.com/platforms/php/). 
