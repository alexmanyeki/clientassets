---
layout: post
title: Advanced Sass color utilities with chromatic-sass
publish_date: April 5, 2017
author_name: Max Luster
author_twitter: maxluster
author_avatar: max
categories: design
hero_image: chromatic.png
---


Before diving into the details of [chromatic-sass](https://github.com/bugsnag/chromatic-sass) and the variety of [things it can help you do](#getting-started-with-chromatic-sass), let’s take a look at one of the ways our existing color utilities often fail us: gradients.

Here’s a standard CSS gradient from `red` to `teal`:

`background-image: linear-gradient(red, teal);`

![RGB Red to Teal](/img/posts/chromatic-sass/rgb_red_teal.png)


Notice how in the middle, the colors look washed out, darker, and grayer than expected? Now take a look at the same gradient, also rendered in CSS and defined with one line of code, but generated using chromatic-sass:

`background-image: chromatic-gradient(red, teal);`

![LAB Red to Teal](/img/posts/chromatic-sass/lab_red_teal.png)


If you’re curious why the chromatic-sass generated gradient appears to be more natural and aesthetically pleasing, read on!

## Goodbye RGB, hello LAB

The magic of chromatic-sass is that it unburdens you from manipulating colors in terms of their red, green, and blue components (RGB). Without going too deep into the [technical details](https://en.wikipedia.org/wiki/RGB_color_space), suffice it to say RGB was created to allow computers to define and manipulate color without doing complex math. Considering the way humans perceive and reason about colors was an afterthought.

It’s pretty easy to see the flaws of the RGB when trying to reason about a color manipulation in RGB.  For example, consider this pastel blue:

`rgb(96, 194, 244)`

![Blue Swatch](/img/posts/chromatic-sass/blue_swatch.png)


Imagine you liked this color, but wanted to find a complementary color that appeared half as bright while retaining the same hue and color intensity (chroma). How would you do that using RGB? Perhaps you divide the value of each RGB component by 2? The result:

`rgb(209, 236, 252)`  →  `rgb(105, 119, 127)`

![Blue RGB Swatch](/img/posts/chromatic-sass/blue_rgb.png)


Our transformation shifted the color towards black in RGB, reducing the color intensity. It’s extremely difficult to imagine the correct adjustments to the RGB values that would result in the desired transformation.


### HSL

Perhaps HSL, RGB’s close relative, will fare better? On first look, HSL (Hue, Saturation, Lightness) appears to have modeled color in such a way where we can simply halve the original color’s lightness, while maintaining its color’s intensity (saturation) and hue. The result:

`hsl(202, 1, .9)`  →  `hsl(202, 1, .45)`

![Blue HSL Swatch](/img/posts/chromatic-sass/blue_hsl.png)

With HSL, a 50% reduction in lightness does indeed yield a darker color, but the intensity of the resulting color far exceeds the pastel original, and the hue appears to have shifted ever so slightly towards a pure blue.


### LAB

Now let’s take a look at LAB. LAB (Lightness, Position between red/green, Position between blue/yellow) is fundamentally different than the previous two examples in that in the LAB color model, the function into which we input numbers to get a color out, operates in the LAB color space. Unlike RGB, the LAB color space was designed from the ground up to mirror the visual response of the human eye. As a result, when the L, lightness value, of LAB decreases by half, the perceived lightness of the color should be reduced by half while maintaining its hue and intensity. How does it fare?

`lab(92, -6.5, -12)` → `lab(46, -6.5, -12)`

![Blue LAB Swatch](/img/posts/chromatic-sass/blue_lab.png)

Much better! We’ve adjusted the lightness of our original blue, but have maintained the intensity and hue of the original color.

LAB is a perceptually uniform color space. That means the difference between two LAB colors' values will correspond to an equal perceived difference between the colors. This isn’t the case when manipulating RGB or HSL, where changes in color values often result in unpredictable differences in perception.

However, the key problem to working with LAB are its A and B components. While they act as a useful system for defining and manipulating colors, they’re too abstract to reason about. Enter HCL, which is related to LAB as HSL is to RGB. In HCL, colors are modeled by their Hue, Chroma (color intensity), and Lightness.

It’s important to note that the LAB color space is significantly larger than sRGB, today’s standard color space for most of the screens we use. LAB is so large that it encompasses colors outside of the range of human perception. In contrast, sRGB is significantly narrower than our perception — there are many colors that we could see that it cannot represent. If you start using `chromatic-sass`  to use HCL to define colors in your project, keep in mind that as it converts colors back into RGB, it will find the closest matching color that it can define in the RGB model.

So, to return to my original example, why does this gradient look so much better than the default one our browser produces?

`background-image: chromatic-gradient(red, teal);`

![LAB Red to Teal](/img/posts/chromatic-sass/lab_red_teal.png)

In this example, chromatic-gradient converts `red`  and `teal` to the LAB color space, then interpolates 5 equidistant color stops between them. Once its calculations are complete, the function returns a regular CSS linear-gradient, with the 5 stops between `red` and `teal` converted back into normal RGB colors. The browser does the rest of the work, using the sRGB color space to calculate the value of each pixel between the color stops that  `chromatic-gradient` calculated in LAB. The result is an approximation of the LAB gradient that is indistinguishable from the real thing.


## Getting started with chromatic-sass

Chromatic-sass is a [node-sass](https://github.com/sass/node-sass) wrapper around the excellent [chroma.js](https://github.com/gka/chroma.js/) with a few Sass-specific utilities added in. It can:


- Create perceptually uniform gradients using the conventional CSS3 linear-gradient syntax
- Procedurally generate aesthetically pleasing color scales
- Convert colors defined in LAB, HCL, and many others into RGB
- Analyze and transform colors in a wide range of color spaces

Because of its ability to perform color operations in LAB, Chromatic's color manipulation abilities can act as drop-in improvements for Sass's native color manipulation functions such as `darken`, `saturate`, and `mix`.

Chromatic-sass works with `node-sass >= 3.4` and can easily be installed via NPM.

To get started, check out [chromatic-sass on GitHub](https://github.com/bugsnag/chromatic-sass).
