---
layout: post
title: "Responsive typography with REMs: How to build a scalable typographic foundation in three steps"
publish_date: March 4th, 2014
author_name: Max Luster
author_twitter: maxluster
author_avatar: max
categories: design
---

*This article is part 1 of a series on responsive design and typography systems. Read [part two](/responsive-typography-with-modular-scale) and [part three](/responsive-typography-with-chained-media-queries).*

To date, the practice of [responsive web design](https://alistapart.com/article/responsive-web-design/) has been centered on two key techniques.

1.  **Fluid grids** &middot; The use of a fluid width grid to contain blocks of content and control layout. Horizontal divisions in content, including the main content column, are set as a percentage of their containing element.
2. **Adaptive layouts** &middot; The use of <abbr>css3</abbr> <code>@media</code> queries to adapt designs to a variety of screen characteristics &mdash; most importantly, the resolution of the viewport.

Unfortunately, with only these two techniques, responsive sites struggle to maintain the integrity of their design the further you adjust your screen resolution from a set of defined width breakpoints.

Most of the design problems are typographic. Unlike responsive images and [videos](http://fitvidsjs.com/), which scale vertically as the width of their content column adjusts, text set in pixels does not automatically adjust its size as the window resizes &mdash; it wraps. That quickly leads to lines of text that are either too short or too long to be easily read.


<div class="medium frame">
  <img src="/img/posts/responsive-type-image.png" alt="screenshot examples showing how responsive type changes with screen size"/>
</div>

We faced these problems during the most recent redesign of the Bugsnag dashboard. As a result, we introduced a third technique, [fluid typography](http://trentwalton.com/2012/06/19/fluid-type/), to the design process.

<ol start="3"><li><strong>Fluid typography</strong>: The use of a scalable typographic foundation. Typographic sizes and vertical divisions in content, including all margins and padding, are set in EMs or REMs.</li></ol>

## Building a scalable typographic foundation

While designers and developers have embraced the use of relative units, percentages, to divide the horizontal space of a web page, many continue to rely on static units, pixels, to size vertical space. You'll see this through the use of pixels to set margins, padding, and size.

If you've attempted to make responsive an element that uses pixels to define these measures, you'll know how hard it is to coordinate changes across breakpoints. When you change one element's pixel-based property value to make a particular breakpoint look better, you'll have to manually tune every other element's various pixel-based properties to keep your design in balance.

#### Introducing EM to your design

<a href="http://en.wikipedia.org/wiki/Em_(typography)">EMs</a> enable you to define the relative size, padding, and margin of design components. With `em` sizing it becomes trivial to manipulate the *absolute* size of an entire design while preserving the *relative* size of design elements. Let's take a quick look at how both EMs and REMs, their more useful counterpart, behave in <abbr>css</abbr>:

<script async src="https://jsfiddle.net/loopj/d5d3kdv3/embed/html,css,result/"></script>

In <abbr>css</abbr>, EMs are sized relative to the font-size of their parent container. While it's occasionally useful to leverage EM's nested scaling behavior, in practice you're almost always going to want `1em` to maintain the same value throughout the entire document. REMs, which are always equal to the font-size of the root `HTML` element, are supported [in all modern browsers](http://caniuse.com/rem) including <abbr>ie9+</abbr>.

If you're supporting legacy browsers use the broadly supported `EM` in your <abbr>css</abbr>. Ensure that you control for the EM's nested scaling behavior in your <abbr>css</abbr> code. Try to apply `font-size` directly on type elements like `h1`, `h2`, and `p`, and not nestable container objects like `div` or `li`.

##### 1.) Sizing type with REM

Let's begin by selecting a reasonable default value for `1rem` in pixels.

```css
html{
  font-size: 16px;   // 1rem = 16px
}
```

Next, we can define the *relative* size of a few typographic elements.


```css
h1{
  font-size: 2rem;
}
h2{
  font-size: 1.5rem;
}
p{
  font-size: 1rem;
}
```
While the sizes of `H1` and `H2` will change from design to design, anchoring the size of `p` at `1rem` is a useful convention. As you set REM based margins and paddings to create space between objects, working in units relative to your paragraph font-size helps to create a [vertical rhythm](http://typecast.com/blog/4-simple-steps-to-vertical-rhythm) that will guide the reader's eye down the page.

##### 2.) Setting vertical space with REM

Now that we've set the size of our content in REM, we need to ensure that the vertical whitespace between our elements scales in proportion too.

To achieve this, we're going to add REM sized margins and padding to our type elements. With percentage based left and right padding, `section` becomes the outer wrapper to a simple one column layout. REM based top and bottom padding is used to create vertical space between each `section`.

<script async src="https://jsfiddle.net/loopj/o2cnp6qt/embed/html,css,result/"></script>

##### 3.) Scaling your design with media queries

Now, with our REM based flexible foundation in place, we can change a single <abbr>css</abbr> value to manipulate the absolute size of every single element within our design, without changing their relative size.

<script async src="https://jsfiddle.net/loopj/67s5dy2b/embed/html,css/"></script>

Check out the <a href="https://jsfiddle.net/loopj/67s5dy2b/embedded/result/">full screen demo</a>, and watch as the entire design scales in proportion as you shrink your browser's width down to it's minimum.

## Next steps: Responsive typography with modular scale & SASS

At this point, the font sizes that we picked for h1 and h2 are arbitrary, but in real life design situations, it's far more useful to have a system for creating a meaningful relationship between your type sizes. In my next post I'll show you how to leverage the power of [modular scales](https://github.com/Team-Sass/modular-scale) to create a family of type sizes, and share SASS techniques to create repetitious strings of media queries like the one above with elegant syntax.
