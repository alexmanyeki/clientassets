---
layout: post
title: Exception#cause in Ruby 2.1
publish_date: January 3rd, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

One of my favourite things about Ruby is that they release new versions on Christmas day! This year [2.1](http://www.ruby-lang.org/en/news/2013/12/25/ruby-2-1-0-is-released/) came out with a range of neat features, but the most exciting from our point of view is the new `cause` method on Exception objects.

The `cause` method tells you the original problem that was being handled when this exception was raised.


## Raising Application-Specific Exceptions

Knowing the cause of an exception is incredibly useful when you deliberately raise a more descriptive
exception inside your error handler; as described by [Avdi Grimm](http://devblog.avdi.org/2013/12/25/exception-causes-in-ruby-2-1/):

```ruby
begin
  # ...
rescue KeyError
  raise MyLib::Error, "Bad key: #{key}. Valid keys are: #{valid_keys}"
end
```

Rails' `ActionView` does something similar when an exception occurs in a view helper. The original exception is wrapped in an `ActionView::Template::Error`, and made available through the `original_exception` method so that you can tell quickly where the problem was.


## Debugging Crashes in Your Exception Handlers

`Exception#cause` is also very useful for diagnosing bugs in your exception handlers. If your exception handler has a bug, a second exception will be raised to tell you about the bug. For example:

```ruby
begin
  # ...
rescue
  # Bug which throws a NoMethodError in your exception handler
  nil.some_method
end
```

Before `Exception#cause` this second exception would completely hide the first, making it almost impossible to figure out why your program crashed originally.


## Bugsnag Supports Exception#cause

The Bugsnag user interface has supported showing exception causes since day one. This was predominantly to support languages that already had a similar feature, like Java's [`getCause()`](http://docs.oracle.com/javase/7/docs/api/java/lang/Throwable.html#getCause) and Rails' `ActionView::Template::Error`.

![](/img/posts/caused-by.png)

Now that Ruby 2.1 provides a standard mechanism for showing the causes of exceptions, we've updated our [ruby notifier](https://github.com/bugsnag/bugsnag-ruby) to automatically collect and display these causes. You can get the latest version with `bundle update bugsnag`.


## Using Exception#cause With Older Ruby Versions

If you're not yet using Ruby 2.1 you can get all the benefits of `Exception#cause` by installing the [cause gem](https://github.com/ConradIrwin/cause). It provides a backport of the `cause` method to ruby 1.8.7 and above so that if your error handlers ever
crash, or you want to make use of descriptive error classes, you can still debug the original problem effectively.
