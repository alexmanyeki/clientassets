---
layout: post
title: Bugsnag's CSS Architecture
publish_date: September 11th, 2014
author_name: Max Luster
author_twitter: maxluster
author_avatar: max
categories: design
---

A few months ago, a number of designers and UI engineers, inspired by a [popular blog post](http://markdotto.com/2014/07/23/githubs-css/) from GitHub's [Mark Otto](https://twitter.com/mdo), published articles on their approaches to writing and organizing CSS. In this post, I'm going to follow suit and take you through a breakdown of the tools we use, as well as the architecture of Bugsnag's CSS. There's no surefire method for organizing CSS for all situations; the content that follows is not a guide for writing awesome CSS. However, the better we understand the tools, techniques, and philosophies being used, the better we can tailor our approach to the unique needs of the projects we work on.

## Contents
- [Quick Facts](#quick-facts)
- [CSS Preprocessing](#css-preprocessing)
- [Mixin Libraries & UI Frameworks](#mixin-libraries-ui-frameworks)
- [Architecture](#architecture)
- [Naming Convention & Code Style](#naming-convention-code-style)
- [Concatenation & Compression](#concatenation-compression)
- [Developing Your Own Approach](#developing-your-own-approach)

## Quick Facts
- Our website is built on Rails
- We write our markup using a combination of Slim templates and Markdown
- Our CSS preprocessor of choice is [Sass](http://sass-lang.com/)
- We have roughly 60 individual stylesheet files that are concatenated into two CSS files: one for our marketing website and the other for our application's dashboard
- Less than 0.4% of our visitors use browsers that lack support for CSS3
- Our units of choice are [REMs](/responsive-typography-with-rems) and percentages, with pixels in use for a few select items
- We follow an architecture derived from both [SMACSS](https://smacss.com/) and [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/)
- We do not use a strict naming convention along the lines of [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)


## CSS Preprocessing
CSS Preprocessing is at the center of everything we do in CSS. If you're not familiar with CSS preprocessors yet, or aren't convinced they're for you, take a read through [this article](https://alistapart.com/article/why-sass). Of the two most popular preprocessors available to work with, LESS and Sass, I've chosen to work with Sass. The differences between LESS and Sass are important but nuanced, so I'll save an analysis of "Why Sass over LESS" for another post. Suffice it to say we're taking full advantage of [advanced features](http://thesassway.com/news/sass-3-3-released) and other niceties that only Sass can provide us with.

In addition to preprocessing in Sass, we make use of [Autoprefixer](https://github.com/postcss/autoprefixer). As its name suggests, Autoprefixer lets you forget about vendor prefixing altogether&mdash;you simply write standard CSS and it automatically includes prefixes using data from [caniuse.com](http://caniuse.com). It's worked flawlessly for us and I've found it to be cleaner than using the proprietary syntax provided by mixin libraries like [Compass](http://compass-style.org/) or [Bourbon](http://bourbon.io/).

## Mixin Libraries & UI Frameworks
With concerns around browser prefixing taken care of by Autoprefixer, the Sass utilities that we've included in Bugsnag's website are lightweight and focused on specific needs that we have.

Here's a partial list of helper mixins, functions, and boilerplate that we're using:

- **Grid System:** [Susy](https://github.com/ericam/susy/)
- **Modular Scales:** [Modular Scale](https://github.com/Team-Sass/modular-scale)
- **Map manipulation:** [Sassy Maps](https://github.com/Team-Sass/Sassy-Maps)
- **Reset:** [Normalize](https://github.com/necolas/normalize.css/)

I've taken a similarly cautious approach to introducing open source UI components in Bugsnag. In situations where it makes sense to bring 3rd party UI components into Bugsnag, I tend to exclude their bundled CSS to avoid writing overrides. This method works better than I initially expected&mdash;a lot of open source components separate behavior from style quite well.

I also include my own loosely organized "library" of Sass utilities which includes my tool for [chained media queries](/responsive-typography-with-chained-media-queries), [responsive.scss](https://gist.github.com/maxluster/168e650267bac9faaafd).

## Architecture
Our architecture is derived from both [SMACSS](https://smacss.com/) and [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/). Ultimately, all of these sort of approaches boil down to taking an object oriented approach, both in design process and in CSS. If you're new to the concept of OOCSS in Sass, take a read through [this article](http://ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css/) to get up to speed on the basics. Also critical is an understanding of CSS [specificity and inheritance](http://nicolasgallagher.com/css-cascade-specificity-inheritance/).

#### Style Layers
The key idea in SMACSS is to separate your styles into categories of rules. I've modified the official SMACSS categories to suit our needs, but the concept of separating concerns remains. I like to visualize each category of styles as a layer. Within a layer, source order is unimportant&mdash;but source ordering of our CSS between layers helps to define style specificity and can help you avoid writing unnecessary overrides. Here's a brief rundown of our layered structure:

1. **Vendor:** Includes 3rd party components, resets, and Sass utils that are not modified
2. **Utilities:** My personal 'library' of Sass mixins and functions
2. **Base:** Global constants and style blocks stored in Sass variables, mixins, and placeholder classes for color, modular scale, typographic grid, and so on. These constants are used to standardize styles across all subsequent layers
3. **Components:** Styles for simple individual elements including typographic elements and other bits that are shared across modules&mdash;similar to the concept of an *atom* in Atomic Design
3. **Modules:** Like *molecules* in Atomic design, modules define the styles for complete interface elements built up of components. For convenience, they often also define components that aren't shared between modules.
3. **Regions:** Regions define styles for complete sections of an interface such as a *header*, *sidebar*, *footer*, etc. Regions are comprised of multiple modules, overridden as necessary within the context of each region.
3. **Themes:** Themes define stylistic modifications to components, modules, and regions. For example, the content and core structure of our footer may be a constant throughout our website, but across *settings* screens, has visual modifications.
3. **Views:** Views, or pages, define styles specific to individual screens in a website. All view styles are scoped using the page's unique ID attached to the root HTML element, giving styles here precedence over all other previous definitions with ease.

## Naming Convention & Code Style
I've been fairly loose with Bugsnag's CSS when it comes to enforcing element naming conventions and code style. That's partially because when I joined Bugsnag, roughly a year ago, Sass support for [BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) was very limited. That's changed&mdash;now you can trivially write BEM code without much effort. Style layers in combination with Sass's nested syntax are working well enough for us now, but that could change as our application increases in complexity and we build out our team.

Beyond BEM syntax, there's a lot of talk about class prefix conventions like `.js-` for classes relied on by JavaScript, and `.is-` prefixed classes for state information. We're not doing that right now, but we probably should be.

## Concatenation & Compression
This is important because many of us are working with Sprockets or another tool to concatenate partial CSS files. You may be tempted to use it to pull everything together. Don't! Sass needs you to use `@import` to allow things like variables and mixins to be referenced across files.

For a while I was maintaining a single manifest file `application.css.scss` that used `@import` to grab each and every individual SCSS file in the order I specified. It was frustrating to have to update that file every time I added a new stylesheet, so I decided to use [Sass Globbing](https://github.com/chriseppstein/sass-globbing) to include my style layers in one go, since they're organized into folders. The style layer imports looks like this:

```
@import "modules/**/[a-z]*";
@import "regions/**/[a-z]*";
@import "themes/**/[a-z]*";
```

Each import grabs all of the files located in a specified style layer directory and its subdirectories as long as the file starts with characters a-z. I force regular stylesheets to start with alphabetical characters a-z so that I can omit partial files by prefixing them with an underscore: `_partial-name.scss`. Then I use Sass to manually import partials at specific locations in individual source files.

Once Sass has done its magic, Autoprefixer adds prefixes, then sprockets handles minification and gzip compression.

## Developing Your Own Approach
It's really important to remember that the approach I've taken at Bugsnag isn't appropriate for everyone's needs. Also, there are things we do now that I'm advocating as great, but in a few months time, we're probably going to find major opportunities for improvement. That's just how it goes. Because of that, I try to remember to avoid overgeneralization at the expense of productivity. Write CSS that *isn't* reusable to develop your design ideas. Eventually, opportunities to broaden the scope and reusability of your code will shake out.

---

What's your take on CSS architecture? Share your thoughts with us on [Twitter](https://twitter.com/bugsnag).
