---
layout: post
title: "Replacing the Rails asset pipeline with Gulp: Using Gulp to compile and cache our assets"
publish_date: February 20th, 2015
author_name: Jessica Dillon
author_twitter: jessicard
author_avatar: jessica
categories: engineering
---

At Bugsnag, we used [Rails](http://rubyonrails.org/)'s [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) to compile and deploy our assets. It was really convenient since the asset pipeline is bundled into Rails, and it solved many problems for us right out of the box. It dealt with caching our assets and generating the correct URLs for them, plus cache busting. Not only that, it also compiled and minified all  our assets. We also discovered [Rails Assets](http://rails-assets.org/), a way to bridge [Bundler](http://bundler.io/) with [Bower](http://bower.io/), which came in handy for handling our front-end dependencies easily. This allowed us to load in our bower components as gems.

![Gulp](/img/posts/gulp.png)

So this all sounds perfect, right? Why would we change what we had? Unfortunately, the asset pipeline had significant issues. Any time we compiled locally or deployed, it was always painfully slow. We were also frustrated because it was extremely hard to debug and test what was going on since so much magic was happening behind the scenes with Rails. Plus, the asset pipeline didn't allow us to harness [sourcemaps](http://blog.teamtreehouse.com/introduction-source-maps) to fix up our JavaScript stacktraces which we knew would make [debugging our JavaScript](https://www.bugsnag.com/platforms/javascript/) way easier. We decided we wanted a better way.

---------------------------

# What is Gulp?

After some research, we decided to use a tool called [Gulp](http://gulpjs.com/) for our asset compilation needs. Gulp is a Node.js streaming build system, strictly providing streams and a basic task system. This means that we can use Gulp to automate common tasks we need in our website, like compiling assets for deployment. We decided to go with Gulp because of its intuitive code-over-configuration stance, as well as its simple but effective plugins.

To install Gulp, check out [Gulp's getting started document](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

---------------------------

# Setting up for development

In development, we don't need to worry about caching, deployment, or any of the other tasks associated with pushing out to production. For now, we'll want to pull out the Rails asset pipeline, install Gulp, and get Gulp building our development assets and serving them to `public/assets`.

## Pulling out the Rails asset pipeline

In Rails 4, you can turn asset pipeline off easily. In your `config/application.rb`, you just need to disable your assets:

```ruby
config.assets.enabled = false
```

And if you use generators, you'll want to prevent the cli generator from creating assets when generating a scaffold:

```ruby
config.generators do |g|
  g.assets false
end
```

## Hooking up Gulp

Gulp allows us to separate our backend Rails app from our frontend app. We'll want to create a `frontend` directory in the root of the application in which to keep our assets. From there, we'll compile a `public/assets` directory so the assets can be served up with Rails. We'll have to be in the `frontend` directory whenever we run any of our `gulp` commands.

Our `frontend` directory will also contain our `gulpfile`, which will contain the code for our tasks. When we run `$ gulp` from the command line, we want our default `gulp` task to:

```coffee
gulp.task "default", ["js", "sass", "images", "fonts"]
```

1.  Concatenate all JS bower files, vendor files, and source files into one file; add to public; create JS sourcemaps

    ```coffee
    sourceMaps = require "gulp-sourcemaps"
    liveReload = require "gulp-livereload"
    filter     = require "gulp-filter"
    coffee     = require "gulp-coffee"

    gulp.task "js", ->
      gulp.src("paths/to/your/js")
        .pipe(sourceMaps.init())
        .pipe(coffeeFilter)
        .pipe(coffee())
        .pipe(coffeeFilter.restore())
        .pipe(concat("application.js"))
        .pipe(sourceMaps.write("."))
        .pipe(gulp.dest("../public/assets"))
        .pipe(liveReload())
    ```

2.  Create Sass sourcemaps, add to public

    ```coffee
    sass = require "gulp-sass"
    autoPrefixer = require "gulp-autoPrefixer"
    sourceMaps = require "gulp-sourcemaps"
    liveReload = require "gulp-livereload"

    gulp.task "sass", ->
      gulp.src("sass/dashboard/application.css.scss")
        .pipe(sourceMaps.init())
        .pipe(sass({includePaths: "path/to/code", sourceComments: true, errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(rename("application.css"))
        .pipe(sourceMaps.write("."))
        .pipe(gulp.dest("../public/assets"))
        .pipe(liveReload())
    ```

3.  Add our images to public

    ```coffee
    liveReload = require "gulp-livereload"

    gulp.task "images", ->
      gulp.src("images/**/*")
        .pipe(gulp.dest("../public/assets/images/"))
        .pipe(liveReload())
    ```

4.  Add our fonts to public

    ```coffee
    liveReload = require "gulp-livereload"

    gulp.task "fonts", ->
      gulp.src("fonts/**/*")
        .pipe(gulp.dest("../public/assets/fonts/"))
        .pipe(liveReload())
    ```

After our default task finishes, we'll have our assets compiled into `public/assets` in a way we can use for development.

## Live Reloading

We recommend setting up a `reload` task that includes live reloading for your assets. We use this so that any time someone edits a JavaScript or CSS file, their browser will automatically refresh after compiling, saving time and effort:

```coffee
gulp.task "reload", ["watch", "js", "sass", "images", "fonts"]
```

Since we're using the Ruby gem [rack-livereload](https://github.com/johnbintz/rack-livereload), our `watch` task can now enable live reloading:

```coffee
gulp.task "watch", ->
  liveReload.listen
  gulp.watch "paths/to/your/sass", { interval: 500 }, ["sass"]
  gulp.watch "paths/to/your/js",  { interval: 500 }, ["js"]
```

---------------------------

# Setting up for production

Next we need to set up for getting our code out to production. This entails setting up caching and cache busting, sending our assets up to [S3](http://s3.amazonaws.com), and setting up Capistrano for deployment.

## Adding production Gulp tasks

### `gulp js`

In our `js` gulp task, we'll want to add in uglification of JavaScript after concatenation.

```coffee
sourceMaps = require "gulp-sourcemaps"
liveReload = require "gulp-livereload"
filter     = require "gulp-filter"
coffee     = require "gulp-coffee"
uglify     = require "gulp-uglify"

coffeeFilter = filter ["**/*.coffee"]

gulp.task "js", ->
  stream = gulp.src("paths/to/your/js")
    .pipe(sourceMaps.init())
    .pipe(coffeeFilter)
    .pipe(coffee())
    .pipe(coffeeFilter.restore())
    .pipe(concat("../public/assets"))

  if ["production, staging"].indexOf(railsEnv) != -1
    stream = stream
      .pipe(uglify())

  stream.pipe(gulp.dest("../public/assets"))
    .pipe(sourceMaps.write("."))
    .pipe(liveReload())
```

### `gulp sass`

Similar to our `js` gulp task, we'll want to add in minification of Sass.

```coffee
sass = require "gulp-sass"
autoPrefixer = require "gulp-autoPrefixer"
sourceMaps = require "gulp-sourcemaps"
liveReload = require "gulp-livereload"
minifyCSS  = require "gulp-minify-css"

gulp.task "sass", ->
  stream = gulp.src("sass/dashboard/application.css.scss")
    .pipe(sourceMaps.init())
    .pipe(sass({includePaths: "path/to/code", sourceComments: true, errLogToConsole: true}))
    .pipe(autoprefixer())
    .pipe(rename("application.css"))

  if ["production, staging"].indexOf(railsEnv) != -1
    stream = stream
      .pipe(minifyCSS())

  stream.pipe(gulp.dest("../public/assets"))
    .pipe(sourceMaps.write("."))
    .pipe(liveReload())
```

### `gulp production`

This task will run after we've built our production assets using `RAILS_ENV=production gulp`. In addition to those tasks, `gulp production` will also have to do some production-specific things. We'll use [gulp-rev-all](https://github.com/smysnk/gulp-rev-all) to set up our files for caching, and to create a cache manifest to map our cached files to the real URLs.

```coffee
gulp.task "production", ->
  gulp.src(["../public/*assets/**"])
    .pipe(revAll()
    .pipe(gulp.dest("../public/assets/production"))
    .pipe(revAll.manifest())
    .pipe(gulp.dest("../public/assets/production"))
```

### `gulp publish`

We're using [AWS](http://aws.amazon.com/) to store our assets. We use [Cloudfront](http://aws.amazon.com/cloudfront/) as our [CDN](http://en.wikipedia.org/wiki/Content_delivery_network), which is set up to read from our AWS bucket. This task uses [gulp-awspublish](https://github.com/pgherveou/gulp-awspublish) to gzip, cache our upload, and send our assets to AWS:

```coffee
gulp.task "publish", ->
  publisher = awspublish.create(bucket: 'your-s3-bucket-name')

  gulp.src("../public/assets/production/**")
    .pipe(awspublish.gzip())
    .pipe(parallelize(publisher.publish({"Cache-Control": "max-age=31536000, public"}), 20))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
```

## Monkeypatching Rails

Since we're changing where all of our assets are, we need to update some of our helper methods to find the correct assets from our Gulp manifests. Our `rev-manifest.json` will map our cached URLs to the originals. We'll need our Rails URL helpers to intercept the cached URLs from the manifest first if they're available. We're going to make an `AssetManifest` class with all of the methods we need in `config/initializers/asset_manifest.rb`:

```ruby
class AssetManifest
  def self.manifest
    if File.exists?("rev-manifest.json")
      @manifest ||= JSON.parse(File.read("rev-manifest.json"))
    end
  end

  def self.stylesheet_path(url)
    if AssetManifest.manifest
      url += ".css" unless url.end_with?(".css")
      AssetManifest.manifest[url] || url
    else
      url
    end
  end

  def self.javascript_path(url)
    if AssetManifest.manifest
      url += ".js" unless url.end_with?(".js")
      AssetManifest.manifest[url] || url
    else
      url
    end
  end

  def self.asset_path(url)
    if AssetManifest.manifest
      AssetManifest.manifest[url] || url
    else
      url
    end
  end
end

```

This class helps us by mapping our asset filenames to the cached versions of the filenames produced by `gulp-rev-all`.

And then in your `app/helpers/application_helper.rb`:

```ruby
  def stylesheet_link_tag(url, options={})
    url = AssetManifest.stylesheet_path(url)

    super(url, options)
  end

  def crossorigin_javascript_include_tag(url, options={})
    url = AssetManifest.javascript_path(url)

    super(url, options)
  end

  def image_tag(url, options={})
    url = AssetManifest.asset_path(url)

    super(url, options)
  end

  def image_path(url, options={})
    url = AssetManifest.asset_path(url)

    super(url, options)
  end

  def image_url(url, options={})
    url = AssetManifest.asset_path(url)

    super((ActionController::Base.asset_host || "") + url, options)
  end
```

This way, we'll call our `AssetManifest` methods, giving us the correct URLs, and then call `super` so we call the original Rails helper methods.

## Setting up Capistrano 3 to use Gulp

We now need to hook up deployment of our site. For this, we'll use [Capistrano 3](http://capistranorb.com/). In your `config/deploy.rb` we'll have to run our precompile script and upload our Gulp manifest to our machines:

```ruby
namespace :assets do
  desc "Publish assets"
  task :publish do
    run_locally do
      execute "script/precompile.sh #{fetch(:current_revision)} #{fetch(:stage)}"
    end
  end

  desc "Transfer asset manifest"
  task :manifest do
    on roles(:all) do
      # All roles need to be able to link to assets
      upload! StringIO.new(File.read("public/assets/production/rev-manifest.json")), "#{release_path.to_s}/rev-manifest.json"
    end
  end

  after "deploy:updated", "assets:publish"
  after "deploy:updated", "assets:manifest"
end
```

The `deploy.rb` file is going to look for a `precompile.sh` script, where precompiling assets will take place. That's where you'll run your `gulp` tasks to compile your assets.

```bash
#!/bin/bash

NEW_SHA=$1
RAILS_ENV=$2

mkdir -p precompile

cd precompile
git clone .. . || git fetch
git checkout $NEW_SHA

cd frontend
cp -r ../path/to/frontend/dependencies .

export RAILS_ENV=$RAILS_ENV
gulp install
gulp default
gulp production
gulp publish
```

---------------------------

# Retrospective

We're really happy with the results we've had since switching over to Gulp. Asset compilation times have gone down from minutes to seconds which is an amazing improvement. Local development is running more smoothly due to our site live reloading. And we now have access to our JavaScript sourcemaps which makes JavaScript debugging way easier. Not to mention [we support JavaScript sourcemaps for better stacktraces](/sourcemaps-info) at Bugsnag!

---------------------------

Hooking up Gulp as our asset pipeline has been very helpful for us. Let us know if this post ends up helping you change your asset pipeline by [tweeting at us](http://www.twitter.com/bugsnag) or [emailing us](mailto:support@bugsnag.com)!
