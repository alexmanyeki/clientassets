---
layout: post
title: Bugsnag Heroku Addon
hide_footer: true
publish_date: November 12th, 2013
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: features
---

Today we are excited to launch the Bugsnag [Heroku Addon](https://addons.heroku.com/bugsnag)! This makes it an easy two-step process to get high quality exception tracking into your app, no matter which language you're using.

<a href="https://addons.heroku.com/bugsnag">
  <img src="/img/posts/heroku.png" alt="Heroku logo" />
</a>

## Automatic

As part of this release, we've updated our most popular notifiers to automatically configure themselves once you've added Bugsnag to your app. This means that if you're using [Ruby](https://github.com/bugsnag/bugsnag-ruby), [Python](https://github.com/bugsnag/bugsnag-python), or [Node.js](https://github.com/bugsnag/bugsnag-node), all you need to do is:

1. `heroku addons:add bugsnag`
2. Add bugsnag to your Gemfile, requirements.txt, or package.json

And that's it! The next time you push your code, Bugsnag will be enabled, ready to catch your unhandled exceptions.

<div style="background: black; margin: auto; width: 500px; height: 200px; border: 1px solid black;">
<iframe style="width: 500px; height: 200px; margin: auto; display: block; border:none" src="https://showterm.herokuapp.com/b8f30e231304bf7002899"></iframe>
</div>

## Tightly integrated

The Bugsnag addon is fully managed via Heroku. There's no need to set up a new user account or billing with us. To access the Bugsnag dashboard for your app, just use `heroku addons:open bugsnag` or follow the link from your app's page on Heroku.

If you're on a large team you can invite collaborators to Bugsnag via Bugsnag's Account settings. These users can receive email notifications when things go wrong, and can log into Bugsnag without needing administrative access to your Heroku account.

## Flexible

Bugsnag is free by default, but as your team grows you'll find some of our more advanced features useful. Heroku's pricing model makes it very easy to start paying only for what you're using. As you grow you can upgrade without even restarting your app!
