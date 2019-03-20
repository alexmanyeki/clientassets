---
layout: post
title: "Today I learned: Handy developer tips"
publish_date: March 3rd, 2016      
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: engineering
---

One of the ways we learn at Bugsnag is through our #til Slack channel where our team is constantly posting interesting tips and tricks discovered through our work or scanning the internet. It's a pretty cool feeling to discover new things that are genuinely interesting every day, and we thought we'd share some of those findings with our friends and followers on Twitter. For those of you who haven't kept up with #til on Twitter, here's a roundup of some of our most popular learnings.

## Did you know...

### Reproduce web requests from Chrome by copying them into a curl command

The first #til fact ever was a huge hit! Right click on the web request in the developer console in Chrome and select Copy to cURL. You can then replay it in your terminal to reproduce.

![Chrome Curl Command](/img/posts/curl-command-til.png)

[Share on Twitter](https://twitter.com/bugsnag/status/694663600330375168)

### Readable timestamp in dmesg

When you use dmesg, how annoying is it to see something like this?

`[28503191.683325]`

Try `dmesg -T` for a more readable version of the timestamp.  

![dmesg -T](/img/posts/dmesg-til.png)

[Share on Twitter](https://twitter.com/bugsnag/status/696756154387533825)

### Is bundle install slowing you down?

We've all been there, annoyed when bundle installing takes forever. But did you know that you can speed things up by installing gems in parallel? With some help from [thoughtbot's guide](https://robots.thoughtbot.com/parallel-gem-installing-using-bundler), try parallel installation to avoid waiting around.

`bundle config --global JOBS '3'`

![Bundle install chat](/img/posts/bundle-install-chat.png)

[Share on Twitter](https://twitter.com/bugsnag/status/698220524418240512)

### A helpful tool for canned responses in GitHub

Do you ever find yourself typing the same thing over and over in GitHub? Here's a useful [Chrome Extension](https://chrome.google.com/webstore/detail/github-canned-responses/lhehmppafakahahobaibfcomknkhoina) that'll save you loads of time — you can setup canned responses that'll appear in a dropdown menu in the comment view.

[Share on Twitter](https://twitter.com/bugsnag/status/700492232571404288)

### Avoid deleting files forever by mistake

Running `rm` by mistake can be a huge pain when you accidentally delete things permanently. To avoid mistakes, alias `rm` to move files to trash instead. Check out  [http://hasseg.org/trash/](http://hasseg.org/trash/) for OS X and [trash-cli](https://github.com/andreafrancia/trash-cli) for Linux.

[Share on Twitter](https://twitter.com/bugsnag/status/703011963295670273)

---

What're your favorite developer tips and tricks? Share them with us on Twitter, and you could make it to our next #til roundup.

For more #til Tweets and learnings from our team, follow us on [Twitter](https://twitter.com/bugsnag).
