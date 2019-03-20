---
layout: post
title: Sinatra, Bugsnag, and Pretty Error Pages
publish_date: December 9th, 2014
author_name: Katrina Owen
author_twitter: kytrinyx
author_avatar: kytrinyx
categories: guides
---

Exception monitoring just didn't seem particularly important on my little open source side project, until one day I found myself tailing Heroku production logs while asking some person I didn't know to _"try it again"_ so that I could see the error happen before the logs disappeared into the black hole of the not-so-distant past.

How awkward.

I was a bit giddy to discover that Bugsnag [loves open source](/bugsnag-loves-open-source), and was willing to set [exercism.io](http://exercism.io/) up for free.

A couple of days and a bit of flailing later, I came to the unsatisfactory conclusion that I could either have a pretty error page, or I could get notified via Bugsnag automatically, but I couldn't have both.

Getting set up in Sinatra with Bugsnag is deceptively easy:

```ruby
    Bugsnag.configure do |config|
      config.api_key = "MY_API_KEY"
    end

    class App < Sinatra::Base
      use Bugsnag::Rack
      enable :raise_errors

      get '/' do
        raise 'hell'
      end
    end
```

Bugsnag is notified, and the user is presented with a plain-text response that says, simply _Internal server error_.

Minimalistic, yes. Lots of whitespace, yeah, that too. But to be honest, it's boring, unfriendly, and, frankly, kind of embarrassing.

The response can be spruced up using Sinatra's `error` block:

```ruby
    class App < Sinatra::Base
      use Bugsnag::Rack
      enable :raise_errors

      error 500 do
        erb :so_so_so_sorry
      end

      get '/' do
        raise 'hell'
      end
    end
```

While this does result in a nice, custom error page, the drawback is that Bugsnag isn't notified about the problem because the `error` block gets called before the `Bugsnag::Rack` middleware can jump in and get word of the exception off to the Bugsnag API.

So, forget about the `Bugsnag::Rack` middleware, that's not going to work.

That said, all is not lost, because the `bugsnag` gem lets you trigger notifications explicitly.

```ruby
    error 500 do
      Bugsnag.auto_notify($!)
      erb :so_so_so_sorry
    end
```

And with four lines of code you can send the most recent exception to the Bugsnag API, _and_ provide a beautiful, friendly error message to the poor individual who encountered a problem.
