---
layout: post
title: Official Bugsnag PHP Notifier Released
publish_date: January 14th, 2013
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: features
---

Today we are pleased to announce the release of the official
[Bugsnag PHP Notifier](https://docs.bugsnag.com/platforms/php/).
The Bugsnag PHP Notifier gives you instant notification of exceptions thrown
by your PHP apps.

![PHP Logo](/img/posts/php-notifier.png)


Automatic Error Handling
------------------------

The Bugsnag PHP Notifier comes with full support for automatic error and
exception handling, since we provide handler functions that can be passed
directly to PHP's built-in
[set\_exception\_handler](http://php.net/manual/en/function.set-exception-handler.php) and
[set\_error\_handler](http://php.net/manual/en/function.set-error-handler.php) functions.

```php
// Initialize Bugsnag with your API key
Bugsnag::register("your-api-key-here");

// Attach the automatic error handlers
set_error_handler("Bugsnag::errorHandler");
set_exception_handler("Bugsnag::exceptionHandler");
```

See the [Bugsnag PHP Notifier docs](https://docs.bugsnag.com/platforms/php/)
for more information about the full capabilities of the notifier.


Manual Error Handling
---------------------

For user-defined errors, you can also notify Bugsnag manually using the
`Bugsnag::notifyError` or `Bugsnag::notifyException` functions.

```php
// Notify Bugsnag manually of an error
Bugsnag::notifyError("PaymentFailedError", "The payment failed due to missing name");

// Notify Bugsnag manually of an exception
Bugsnag::notifyException(new Exception("Something bad happened"));
```

You can find
more details about this and other functions in the
[Bugsnag PHP Notifier docs](https://docs.bugsnag.com/platforms/php/).


Send Application-Specific Data With Errors
------------------------------------------

Bugsnag already collects and displays as much information as possible to help
you debug your exceptions, including HTTP params, app environment and number
of unique users affected, but as a developer you’ll know exactly which pieces
of application data are most important to you.

To send custom data from your PHP apps, you can use `setMetaDataFunction`,
for example:

```php
// Tell Bugsnag to use a metadata function
Bugsnag::setMetaDataFunction("bugsnag_metadata");

// Define the bugsnag metadata function
function bugsnag_metadata() {
    return array(
        "user" => array(
            "name"  => "Bob Hoskins",
            "email" => "bob@example.com",
            "role"  => "Super Mario"
        )
    );
}
```

Adding custom data will give you more insights into your exceptions, which
should ultimately allow you to resolve them faster.


Thanks
------

We'd also like to say a big thanks to
[Taylor Otwell](https://github.com/taylorotwell) for making his unofficial PHP
notifier available before this release!

Learn more about [Bugsnag's automatic PHP error reporting](https://www.bugsnag.com/platforms/php/).
