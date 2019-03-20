---
layout: post
title: RubyConf 2014 Recap
publish_date: 2014-11-25
author_name: Jessica Dillon
author_twitter: jessicard
author_avatar: jessica
categories: news
---

This year Bugsnag had the pleasure of sponsoring [RubyConf 2014](http://rubyconf.org/). RubyConf, which is held in a different city each year, is a 3-day, 4-track conference, put on by the lovely folks at [Ruby Central](http://rubycentral.org/). This year's RubyConf was in San Diego at the San Diego Convention Center, the same building that holds the legendary [Comic Con](http://www.comic-con.org/). We left San Francisco at a cool 50 degrees Fahreinheit, and were very appreciative of San Diego's warm, 70 degree weather all last week (what a treat for late November!).

![RubyConf Logo](/img/posts/rubyconf-2014/logo.png)

Many people attend Ruby conferences just for the welcoming community, but this conference even had the hallway-track attendees going to watch the talks. Since it's a 4-track conference, I was disappointed to know I'd be missing at least thee-fourths of the talks. Luckily, videos of all the talks will be published, so everyone (including me!) will be able to catch up on everything they missed.

![RubyConf Venue](/img/posts/rubyconf-2014/venue.jpg)

## Talks
It's impossible to choose which talks were my favorites, especially since there were 3 days and 4 tracks worth of awesome content. Instead, I'll share a couple of highlights that I happened to catch from each day:

![Matz Keynote](/img/posts/rubyconf-2014/matz.jpg)

1. [Yukihiro Matz](https://twitter.com/yukihiro_matz) has given the keynote at all RubyConf's except one. This one was especially fun because his introduction touched on all his previous RubyConf keynotes. He outlined main points from his previous talks, and the feature predictions he'd made for future Ruby versions. It turns out he's been 30% accurate in his predictions of features that ended up making it into production. This was a big lead up to his latest suggestion for Ruby 3.0, and quite controversial: introducing static typing into the language. [Omniref](https://www.omniref.com/) wrote up [a good summary](https://www.omniref.com/blog/blog/2014/11/17/matz-at-rubyconf-2014-will-ruby-3-dot-0-be-statically-typed/) of Matz's thoughts on how we could go about implementing static typing in Ruby, and if Ruby could even be considered Ruby at that point.

1. [GitHub](https://github.com/) recently released an entire rewrite of their permissions system, and [Jesse Toth](https://twitter.com/jesseplusplus) gave us some insight into how her team managed it in her talk "[Easy Rewrites with Ruby and Science!](https://speakerdeck.com/jesseplusplus/easy-rewrites-with-ruby-and-science)". GitHub has a large codebase, many users, and a lot of complicated permissions for those users. When making changes to their permissions system became nearly impossible, they decided it was time for a rewrite. Over the course of 3 years, they were able to do it with the help of a gem they made called [Scientist](https://github.com/github/scientist). Scientist is a Ruby library for carefully refactoring critical paths. Scientist lets you create an "expirement" where you run two separate code paths at the same time and then compare the results afterward. This allowed them to compare their legacy code to their updated code without interfering, making sure they weren't introducing unexpected behavior or bad data.

1. The second day of the conference, [Olivier Lacan](https://twitter.com/olivierlacan) gave a talk called "[Polishing Ruby](https://speakerdeck.com/olivierlacan/polishing-ruby-rubyconf-2014)". This talk was one of my favorites, telling a story all too familiar to developers. You're using some Ruby method in your program, and you realize it doesn't work the way you think it should. You generally end up raving about how stupid it is on Twitter and just move on. This happened to Olivier, but he didn't move on. In fact, he ended up with [Nobuyoshi Nakada](https://github.com/nobu) proposing a patch to Ruby with the functionality he desired. Before his talk, I generally assumed that contributing to Ruby meant I'd have to be an expert C programmer or I'd have to learn Japanese. He debunked these myths, and described different ways to get into contributing. Although I don't think I'll be jumping headfirst into contributing to Ruby, this lowered the barrier to entry and made it seem more approachable.

1. Not many people in the programming field are qualified to talk about education at an in-depth level, especially as it relates to teaching our youth to program. [Liz Abinante](https://twitter.com/feministy), an engineer with a background in youth education, tackled this issue in her talk "[Programming, Education, and the American Dream](https://speakerdeck.com/feministy/programming-education-and-the-american-dream)". In our field, we proclaim the romantic idea that "Anybody can learn to code!" But can *anyone* learn to code? In her talk, Liz discussed the present-day American education system and how it's not enabling our youth to learn these skills we assert are downright essential. If we're failing to get kids to their proper reading and writing level, how can we expect them to be able to code?

1. [Justin Searls](https://twitter.com/searls) kicked off the last day at RubyConf, keynoting about "[The Social Coding Contract](https://speakerdeck.com/searls/the-social-coding-contract)". Asked to adopt the late [Jim Weirich](https://twitter.com/jimweirich)'s [rspec-given](https://github.com/jimweirich/rspec-given) gem, Justin reflected on the complicated process to think about how he uses and creates open source software. This experience gave him insight into building open source projects that can be kept running, even after the maintainer moves on. He also discussed how businesses and individuals can use open source tools in a safe way, avoiding as much risk to their software as possible. If you want to preview his talk before RubyConf releases their videos, [check out an earlier version](http://vimeo.com/108589852) he gave at the [Level Up](http://levelupcon.com/) conference.

![Fish Tacos](/img/posts/rubyconf-2014/tacos.jpg)

The Bugsnag team had so much fun at RubyConf. Having a good balance of technical to non-technical talks is hard, but I was impressed with RubyConfs talk schedule. Besides the talks, it always amazes me how friendly the Ruby community is. If you're looking for a conference where you can walk away with a lot of useable knowledge, as well as a bunch of new friends, RubyConf is a good place for you. Hope to see you there next year!

---

Do you have feedback for us? Reach us on [Twitter](https://twitter.com/bugsnag).
