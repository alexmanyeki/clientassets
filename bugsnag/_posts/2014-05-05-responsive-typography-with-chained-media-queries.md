---
layout: post
title: "Responsive typography with chained media queries: Leverage Sass to improve the power and flexibility of your media queries"
publish_date: May 5th, 2014
author_name: Max Luster
author_twitter: maxluster
author_avatar: max
categories: design
---

*This article is part 3 of a series on responsive design and typography systems. Read [part one](/responsive-typography-with-rems) and [part two](/responsive-typography-with-modular-scale).*

In the first two articles of this series, we established a technical foundation for a scalable typographic system. I'll briefly recap: if you're designing websites, your first order of business is to stop using pixels and train yourself to think and code using *relative* units, in particular [REMs](/responsive-typography-with-rems). With pixels out of the picture, you can define meaningful relationships between the size of your type and other design elements using a [modular scale](/responsive-typography-with-modular-scale).

With your fluid foundation in place, incrementally expand or contract the scale of your design by modifying a single property, the `font-size` of the `HTML` element.

- - -

Even though the code presented in my first two posts was viable in production, it wasn't elegant, readable, or easily maintained. If we're going to be introducing a lot of new media queries to our code base they must be easily authored. In addition, we're going to need to globally coordinate *named breakpoints*, a subset of the responsive changes scattered throughout our codebase that align with major changes in our design. For example, a breakpoint that introduces a new content column or a major change in navigation.

With a bit of <abbr>sass</abbr> we can slice through these problems, write less code, and build interfaces that give us control over the most important aspects of our website's design. Let's get started!

### A declarative syntax for chained media queries

With a flexible foundation in place, you're going to want to introduce a lot of new media queries to scale your design. Most likely, far more than you're used to. The optimal number of breakpoints varies from project-to-project, but it can easily take 10 or more media queries to optimize the scale of a design from phone-sized screens up through cinema displays and beyond. Take a read through Trent Walton's *[Fluid Typography](http://trentwalton.com/2012/06/19/fluid-type/)* and Oliver Reichenstein's *[Responsive Typography: The Basics](http://ia.net/blog/responsive-typography-the-basics/)* to better understand when and why to adjust scale.

In <abbr>css</abbr> your code would look something like this:

```css
html{
  font-size: 11px;
}
@media screen only and (min-width: 600px){
  html{
    font-size: 12px;
  }
}
// Repeat media queries to manipulate font-size across many breakpoints
```
Fortunately, we can be far more efficient using <abbr>sass</abbr>. To design responsive sites with a lot of breakpoints, we need <abbr>sass</abbr> to provide us with a declarative syntax for repeatedly manipulating properties like the root `font-size`.

Here's what I've put to work inside Bugsnag and on this blog:

```css
html{
  @include responsive("font-size", 11px,
    (
       600px: 12px,
       800px: 13px,
      1180px: 14px,
      1300px: 15px,
      1750px: 16px,
      1900px: 17px,
      2100px: 18px,
      2400px: 19px
    )
  );
}
```
With this syntax we can read the changes happening to the scale of our design as a sentence. The the root `font-size` has a default value of 11px; therefore `1rem = 11px`. With a minimum viewport width of 600px, the value of `1rem = 12px`. At 800px, `1rem = 13px` &mdash; and so on.

### Chaining multiple properties

There are cases where you'll want to responsively manipulate two or more properties that share the same value. For example, it can be useful to set an container element's `padding-left` and `padding-right`, instead of it's `width`, so that its background can extend to the edges of the page.

```css
#container{
  width: 100%;
  background: $background-color;
  @include responsive("padding-left" "padding-right", 5%,
    (
       600px: 8%,
       800px: 11%
    )
  );
}

```

### Chaining complex media queries

Sometimes min-width media queries don't give us the control we need. Imagine you wanted to override a default set of min-width based queries specifically on iPads in landscape mode:

```css
@include responsive("font-size", 11px,
  (
    600px : 12px,
    800px : 13px,
    (min-device-width 768px)
    (max-device-width 1024px)
    (orientation landscape) : 16px
  )
);
```
If that media query syntax looks familiar, it's because you may already be using it in your projects via the popular [Compass](http://compass-style.org/) extension, *[Breakpoint](http://breakpoint-sass.com/)*. If your project includes Breakpoint, the `responsive` mixin calls it to generate each of the chained media queries. That means we can use additional features of Breakpoint in our chained queries. For example, we can set a global variable, `$breakpoint-to-ems: true`, to take advantage of the [benefits of em-based media queries](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/).

### Referencing named breakpoints

So far we've been looking at examples that use one-off values for media queries. However, it's often important to be able to synchronize some of our media queries with changes occurring elsewhere in our design. We'll utilize <abbr>sass 3.3</abbr> maps to conveniently store our named breakpoints in a global variable `$named-breakpoints`.

```css
$named-breakpoints: (
    "xs": 350px,
     "s": 600px,
     "m": 800px,
     "l": 1420px,
    "xl": 2100px,
  "ipad": (min-device-width 768px) (max-device-width 1024px)
);
```

Now you can reference named breakpoints inside chained media queries, and fill in the gaps with anonymous media queries as necessary.

```css
@include responsive("font-size", 11px,
  (   
      "xs" : 12px,
     450px : 13px,
    1100px : 14px,
       "l" : 15px,
    1600px : 16px,
    "ipad" : 14px
  )
);
```

- - -

Chained media queries are a natural fit inside scalable, modular <abbr>css</abbr> architectures like [atomic design](http://bradfrostweb.com/blog/post/atomic-web-design/) and <abbr>[smacss](http://smacss.com/)</abbr>. Instead of aggregating unrelated changes into large media query blocks, we can use SASS to independently manipulate individual properties across a spectrum of devices. Also, as long as you're minifying and gzipping your <abbr>css</abbr>, the filesize impact of introducing even hundreds of new media queries is minimal.

### Including `responsive` in your project

To start chaining your media queries using <abbr>sass 3.3</abbr>, grab a copy of the `responsive` mixin from [this gist](https://gist.github.com/maxluster/168e650267bac9faaafd). <abbr>Sass 3.2</abbr> users can grab [this gist](https://gist.github.com/maxluster/c9ecc6e4a6770e507c2c) instead.

I'd love to hear what you think about chained media queries. Is the `responsive` mixin a fit for your projects? Is there anything it could do better? Send us your feedback on twitter [@maxluster](https://twitter.com/maxluster) or [@bugsnag](https://twitter.com/bugsnag), or via email at support@bugsnag.com.
