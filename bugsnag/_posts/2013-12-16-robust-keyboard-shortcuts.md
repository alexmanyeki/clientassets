---
layout: post
title: How to add robust keyboard shortcuts to your site
publish_date: December 16th, 2013
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

Power-users love keyboard shortcuts. They save time, and let them interact with your app on autopilot. We recently added [keyboard shortcuts](/keyboard-shortcuts/) to Bugsnag. The hard bit was not choosing which key should do what, as we mostly re-used them from sites our users use like Gmail, Twitter and Github, but adding the shortcuts in a way that was reliable and robust.

Getting started
---------------

The first step is to add a keyboard shortcut library. We use ccambell's [mousetrap](https://github.com/ccampbell/mousetrap), which is excellent. The library already handles some edge-cases for us, for example disabling keyboard shortcuts when the user is typing in an input field, and handling punctuation on non-US keyboards.

Next you'll want to annotate your HTML so that it's easy to refer to important actions with jQuery. We use the `data-action` attribute for this so that it's obvious in the markup that the button is important. This makes it less likely we'll break keyboard shortcuts when refactoring our HTML and CSS.

This is how it looks in practice:

```html
<nav>
<ul>
    <li class="prev disabled">
      <a data-action="prev-page" href="#">‹</a>
    </li>
    <li class="next">
      <a data-action="next-page" href="/bugsnag/website/errors?offset=2013-12-06">›</a>
    </li>
</ul>
</nav>
```

You can see that the disabled link to the previous page (shortcut: `[`) and the working link to the next page (shortcut `]`) both have a separate `data-action`.

Wiring it up
------------

Making Mousetrap click a button with jQuery when you press a key is delightfully easy:

```javascript
Mousetrap.bind('[', function () {
    $('[data-action="prev-page"]').click()
});
```

Unfortunately clicking a button with jQuery often isn't enough. If you want to be able to open actual links using keyboard shortcuts, you need to use the underlying browser `click()` function instead. This requires getting the DOM element out of the jQuery selector, and clicking it if it's actually there:

```javascript
Mousetrap.bind('[', function () {
    var button = $('[data-action="prev-page"]');
    if (button.length) {
        button[0].click()
    }
});
```

Edge cases
----------

After I'd added most of our shortcuts I noticed another problem. Like in the example above, sometimes we disabled links or even hid them completely in the UI to prevent the user from interacting with them. It was accidentally still possible to click these links using the keyboard, because we just use jQuery to find them.

As we already had a strong convention that everything on the site that is disabled uses the CSS class `disabled`, it was easy to filter out disabled links. I used jQuery's [`closest()`](http://api.jquery.com/closest/) so that we'd also ignore buttons in disabled sections of the site. I then check whether the element [`is(":visible")`](http://api.jquery.com/visible-selector/), which returns true if the button both exists and is visible.

The final code looks like this:

```javascript
function click(button) {
    if (button.closest(".disabled").length) {
        return;
    }
    if (button.is(":visible")) {
        button[0].click();
    }
}
```

And it's now easy to wire up all the shortcuts we need:

```javascript
Mousetrap.bind('[', function () {
    click($('[data-action="prev-page"]'));
});
Mousetrap.bind(']', function () {
    click($('[data-action="next-page"]'));
});
```

If you've done something similar to this, please [let me know](https://twitter.com/ConradIrwin), it'd be fun to compare notes :).
