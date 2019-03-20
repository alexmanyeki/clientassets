---
layout: post
title: "API Toolkit for Ruby Build Ruby apps using your Bugsnag data"
publish_date: September 15th, 2014
author_name: James Smith
author_twitter: loopj
author_avatar: james
categories: guides
---

The [Bugsnag API](https://docs.bugsnag.com/api/data-access/) already gives you a powerful way to interact with your Bugsnag errors, projects and other data, but today we're making things even easier with the release of our [API Toolkit for Ruby](https://github.com/bugsnag/bugsnag-api-ruby/).

![](/img/posts/ruby-api-toolkit.png)

This library allows for quick read/write access to the Bugsnag API from your Ruby applications. You can use this library to build your own applications which leverage data found in your Bugsnag dashboard.


### Basic Usage

Using the API toolkit is simple. Just authenticate using your [Bugsnag user credentials](https://www.bugsnag.com/docs/api#user-authentication) or [account auth token](https://www.bugsnag.com/docs/api#account-authentication), and call the desired API methods. For example:

```ruby
# Authenticate with the Bugsnag API
Bugsnag::Api.configure do |config|
  config.email = "example@example.com"
  config.password = "password"
end

# Fetch a list of my Bugsnag accounts
accounts = Bugsnag::Api.accounts
```

Check out the [documentation](https://docs.bugsnag.com/api/data-access/) or the [RDoc reference](http://www.rubydoc.info/gems/bugsnag-api) for more details.


### Philosophies

This library borrows heavily from the code and philosophies of the fantastic [Octokit](https://github.com/octokit/octokit.rb) library. A big thanks to [@pengwynn](https://github.com/pengwynn) and the rest of the Octokit team!

The underlying HTTP calls are made through the excellent [Faraday](https://github.com/lostisland/faraday) library, and traversing between resources is made possible through [Sawyer](https://github.com/lostisland/sawyer), a "secret" hypermedia client for Faraday.

---

We'd love to hear about the apps you're building with the API toolkit for Ruby! Reach out to us via [email](mailto:support@bugsnag.com) or [Twitter](https://twitter.com/bugsnag), and we'll let the world know what you're working on!
