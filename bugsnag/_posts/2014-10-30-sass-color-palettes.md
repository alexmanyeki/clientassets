---
layout: post
title: Managing color palettes with color scales and Sass maps
publish_date: October 30th, 2014
author_name: Max Luster
author_twitter: maxluster
author_avatar: max
categories: design
---

Before the release of Sass 3.3 and its [maps feature](http://sass-lang.com/documentation/file.SASS_CHANGELOG.html#330_7_march_2014), I found the best way to manage color was through the use of a large set of global variables. Adhering to a strict naming convention made this process relatively sane. In the following example, I'm using [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) style naming to organize a set of colors. I'm also defining all of our colors in human readable [HSL](http://css-tricks.com/yay-for-hsla/).

```
$color__blue--0: hsl(198, 74%, 49%);
$color__blue--1: hsl(200, 72%, 61%);
$color__blue--2: hsl(200, 71%, 73%);

$color__red--0: hsl(3, 72%, 62%);
$color__red--1: hsl(4, 85%, 66%);
$color__red--2: hsl(4, 84%, 78%);
```

Despite the clarity of our naming convention, there're a number of things we can't do with our colors when stored inside of variables. Because there's nothing that explicitly links colors of a particular hue, generating a simple button in a variety of colors means we have to repeat our code.

```
.button--blue{
  color: $color__blue--0;
  background: $color__blue--4;
  &:hover{
    background: $color__blue-3;
  }
}

.button--red{
  color: $color__red--0
  background: $color__red--4;
  &:hover{
    background: $color__red--3;
  }
}
```

In the previous example, I used a simple numeric scale to codify the lightness and intensity of colors in our palette. For example, `$color__blue--0` will visually match to `$color__red--0`. While the exact properties of each step on the scale will differ across projects, the highest numbered color, `$color__blue--4`, is a pastel, and `0` on our color scale is a deep, fully saturated color. The number of steps needed and their meaning within a given project will vary.

![Color palette example](/img/posts/color-palette.png)

With the introduction of Sass 3.3's maps feature earlier this year, we now have an improved way of storing our color data that alllows us to group our color scales together by hue. This'll allow us to [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) out our code and improve code readability.

## Leveraging the power of Sass maps

Now, instead of having potentially hundreds of individual color variables, we're going to store all of our color data in `$colors` using nested maps.

```
$colors: (
  blue: (
    0: hsl(198, 74%, 49%),
    1: hsl(200, 72%, 61%),
    2: hsl(200, 71%, 73%),
    [...]
  ),
  red: (
    0: hsl(3, 72%, 62%),
    1: hsl(4, 85%, 66%),
    2: hsl(4, 84%, 78%),
    [...]
  )
)
```

To retrieve individual colors from our color palette, we need a simple accessor function.

```
@function get-color($color, $value: 0) {
    @return map-get(map-get($colors, $color), $value);
}
```

Now let's put it into practice on our simple button.

```
.button--blue{
  color: get-color(blue, 0);
  background: get-color(blue, 4);
  &:hover{
    background: get-color(blue, 3);
  }
}

```
The new syntax is much cleaner and easier to parse. Now let's generate a bunch of buttons at once! First, let's map semantic names for our buttons to their corresponding color.

```
$buttons: (
  "primary": "orange",
  "secondary": "green",
  "warning": "red"
)
```
We can loop over the `$buttons` map to generate our button classes.

```
@each $button-name, $color in $buttons{
  .button--#{$button-name} {
    color: get-color($color, 0);
    background: get-color($color, 4);
    &:hover{
      background: get-color($color, 3);
    }
  }
}

```

The benefits of this approach really shine as the number of objects associated with colors increases. In Bugsnag, we maintain a map of almost 30 project types, each with a color representation in our UI. For example, Ruby on Rails is associated with red and PHP is associated with purple. By storing this data in a map, we can create multiple objects related to our project types.

---

What are your thoughts on managing color palettes? Share them with us on [Twitter](https://twitter.com/bugsnag).
