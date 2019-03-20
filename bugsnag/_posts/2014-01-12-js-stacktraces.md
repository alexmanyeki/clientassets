---
layout: post
title: JS stacktraces. The good, the bad, and the ugly.
publish_date: January 12th, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

Error monitoring in JavaScript is a thorny problem. On the one hand
[`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onerror)
will at least notify you when something goes wrong. On the other, it won't give
you enough information to actually debug the problem. Notably absent in many
cases is the stack trace.

That said, with a little bit of work it's possible to get stacktraces that are
reasonably complete in all browsers. Bugsnag's [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/) uses the techniques below, ordered by
effectiveness.

## The Good

Modern Chrome and Opera (i.e. anything based around the
[Blink](http://www.chromium.org/blink) rendering engine) fully support the HTML
5 draft spec for
[ErrorEvent](http://www.w3.org/html/wg/drafts/html/master/webappapis.html#the-errorevent-interface)
and
[`window.onerror`](http://www.w3.org/html/wg/drafts/html/master/webappapis.html#onerroreventhandler).
In both of these browsers you can either use `window.onerror`, or (amazingly!)
bind to the 'error' event properly:

```javascript
// Only Chrome & Opera pass the error object.
window.onerror = function (message, file, line, col, error) {
    console.log(message, "from", error.stack);
};
// Only Chrome & Opera have an error attribute on the event.
window.addEventListener("error", function (e) {
    console.log(e.error.message, "from", e.error.stack);
});
```

## The Bad

Unfortunately Firefox, Safari and IE are still around and we have to support
them too. As the stacktrace is not available in `window.onerror` we have to do
a little bit more work.

It turns out that the only thing we can do to get stacktraces from errors is to
wrap all of our code in a [`try{ }catch(e){
}`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
block and then look at [`e.stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack).  We can make the process somewhat easier with
a function called `wrap` that takes a function and returns a new function with
good error handling.

```javascript
function wrap(func) {
    // Ensure we only wrap the function once.
    if (!func._wrapped) {
        func._wrapped = function () {
            try{
                func.apply(this, arguments);
            } catch(e) {
                console.log(e.message, "from", e.stack);
                throw e;
            }
        }
    }
    return func._wrapped;
};
```

This works. Any function that you wrap manually will have good error handling,
but it turns out that we can actually do it for you automatically in most cases.

## Automating

A new stack is created every time an event handler is called in JavaScript.
This means you have to remember to wrap the function every time an event
handler is called. Luckily in modern browsers (IE 10+) JavaScript uses
prototype based inheritance.

Prototype based inheritance makes it easy to override a given function on lots
of objects at the same time. The function we're interested in is
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener),
which is defined on the
[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
prototype and inherited by DOM nodes, Windows, XMLHttpRequests and anything
else that you can add an event listener to.

By changing the global definition of `addEventListener` so that it
automatically wraps the callback we can automatically insert `try{ }catch(e){
}` around most code. This lets existing code continue to work, but adds
high-quality exception tracking.

```javascript
var addEventListener = window.EventTarget.prototype.addEventListener;
window.EventTarget.prototype.addEventListener = function (event, callback, bubble) {
    addEventListener.call(this, event, wrap(callback), bubble);
}
```

We also need to make sure that `removeEventListener` keeps working. At the
moment it won't because the argument to `addEventListener` is changed. Again
we only need to fix this on the prototype object:

```javascript
var removeEventListener = window.EventTarget.prototype.removeEventListener;
window.EventTarget.prototype.removeEventListener = function (event, callback, bubble) {
    removeEventListener.call(this, event, callback._wrapped || callback, bubble);
}
```

Just to make things a little more tricky, in some browsers the class hierarchy
is non-standard, so to make this work properly there are about twenty different
prototypes to hook into.  You can see the finished code
[here](https://github.com/bugsnag/bugsnag-js/blob/23d65d3d384fdb4ec9f522fa6e2dee2417a234c1/src/bugsnag.js#L542).

## The Ugly

The above prototype trick coupled with similar handling of `setTimeout` and
friends gives us stack traces in all modern browsers. Regrettably there are
still a [large number](https://gist.github.com/ConradIrwin/8344018) (>10%) of
people using old browser versions. It'd be nice to force such people to
upgrade, but in the meantime we have one more trick up our sleeves.

In IE <9, `window.onerror` is called with the function call stack intact. This
means we can use `arguments.callee.caller` recursively to build up a fake
stacktrace. It only gives us function names, not line numbers, but it's much
better than nothing.

```javascript
// IE <9
window.onerror = function (message, file, line, column) {
    var column = column || (window.event && window.event.errorCharacter);
    var stack = [];
    var f = arguments.callee.caller;
    while (f) {
        stack.push(f.name);
        f = f.caller;
    }
    console.log(message, "from", stack);
}
```

## The Future

I've updated Bugsnag's [JavaScript error monitoring](https://www.bugsnag.com/platforms/javascript/)
to include all of these techniques, but there are still things I wish we could
improve on.

1. Stacktraces in IE 9. `window.onerror` was called with the call stack intact
   in IE 6,7 and 8; and exceptions have `.stack` properties in IE 10 and 11.
   This means that IE 9 is in limbo, you can't get a stacktrace using any of the
   above techniques.

2. Column numbers in Firefox. Firefox is the only browser that doesn't support
   column numbers for exceptions. This makes debugging minified javascript
   essentially impossible. I've sent one
   [patch](https://bugzilla.mozilla.org/show_bug.cgi?id=762556) but there's a
   lot more to do.

3. Other async entry points. We've hooked into `setTimeout`, `setInterval` and
   `requestAnimationFrame`. I think there are a few other candidates for
   wrapping automatically, but I can't think of a reliable way to find them all.

If you've got ideas to fix these please send [pull
requests](https://github.com/bugsnag/bugsnag-js) in exchange for fame, glory,
and Bugsnag credit :).
