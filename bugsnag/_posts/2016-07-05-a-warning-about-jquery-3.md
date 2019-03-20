---
layout: post
title: "A Warning About jQuery 3"
publish_date: July 6th, 2016
author_name: Christian Schlensker
author_twitter: wordofchristian
author_avatar: christian
categories: engineering
---

> *Update: Since we published this blog post, the jQuery team [released](https://blog.jquery.com/2016/07/07/jquery-3-1-0-released-no-more-silent-errors) version 3.1.0 to specifically address this issue. Now, exceptions in the ready handler will automatically get re-thrown. Props to @timmywil, @markelog, @mgol, and the jQuery team for such a quick update.*

---

jQuery recently had a major update to version 3. With it came a subtle change
that might cause some headaches for you if your aren't prepared for it.

## The Problem

The `$(document).ready` function now uses a jQuery deferred promise internally.
This is probably for the best but it has an unfortunate side effect of
swallowing any exceptions that happen inside the callback.

Take for example this typical jQuery hello world application.

```html
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
    <script>
      $(function() {
        $('#app').text('hello world');
      });
    </script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

![](https://www.dropbox.com/s/bcqnqombabzuebz/Screenshot%202016-07-01%2014.30.33.png?dl=1)

Now see what happens when we introduce an error into our code to simulate an uncaught exception:

```javascript
  $(function() {
    throw new Error('boom!')
    $('#app').text('hello world');
  });
```

![](https://www.dropbox.com/s/08wow5gs4nvzryd/Screenshot%202016-07-01%2014.31.28.png?dl=1)

Just like in jQuery 2 we get a blank page and the application is completely
broken, but unlike jQuery 2 the console is also completely empty.

![](https://www.dropbox.com/s/obhiz2j44u8vjgo/Screenshot%202016-07-01%2014.32.04.png?dl=1)

Before we would have had an error thrown and it would have been obvious what was broken. Now, without an uncaught exception, not only is debugging harder, but we also won't see the error automatically reported to Bugsnag. There could be a broken page in production right now and we wouldn't be able to rely on our existing instrumentation to find it.

## The Solution

There are two ways around this problem. Deciding which one is better depends on how much of
the application code is dependent on jQuery.

### Option 1. Use `fail` and `throw` to re-raise errors

jQuery 3.0 now formally supports the promise syntax for listening to `.ready()`.

```js
jQuery.ready.then(function() {
  throw new Error('boom');
  $('#app').text('hello world');
}).fail(function(error) {
  throw error;
});
```

By using the promise syntax for initialization of the application we can catch errors
and re-throw them. This will not only show them in the browser console, but
also cause them to be caught by the Bugsnag exception tracker.

![](https://www.dropbox.com/s/dbmo076ms9q4vwd/Screenshot%202016-07-01%2014.29.18.png?dl=1)

### Option 2: Don't use jQuery for app initialization.

As browsers get more advanced, several of the problems that jQuery is designed to solve
can increasingly be dealt with by native Javascript. Maybe you'll decide that actually, [You Might not need
jQuery](http://youmightnotneedjquery.com/), or at the very least you don't need
it for initializing an application. If you include your application script at the bottom of the page, then the DOM should be ready by the time it gets executed anyway. You could then relegate all your jQuery usage to cases when you need to do DOM manipulation.

## Conclusion

It is important that when software fails, it fails loudly, explicitly, and in a way that is
obvious to track down. Otherwise problems linger in silence without your knowledge. jQuery 3.0 has made great efforts to be more explicit about failures but there are still some gotchas that can trip up the unsuspecting application developer if they aren't expecting them.
