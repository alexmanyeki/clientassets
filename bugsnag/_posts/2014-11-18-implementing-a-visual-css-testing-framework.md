---
layout: post
title: "Implementing a visual CSS testing framework: Using automatic screenshot comparison to catch style regressions"
publish_date: September 18th, 2014
author_name: Jessica Dillon
author_twitter: jessicard
author_avatar: jessica
categories: engineering
---

Working with large CSS codebases can be hard. Large-scale refactors, or even just tweaking styles on our more general elements, could end up having unintended consequences on the rest of the site. To catch these problems we would manually check every page on our site, which is a slow and error-prone approach. We needed a better way to test our CSS.

!["Admin visual diff dashboard"](/img/posts/visual-diffs/admin-diffs.png)

## Creating a plan

We looked up various ways to test CSS, including trying libraries like [Huxley](https://github.com/facebook/huxley). Although some of it was what we needed, the frameworks ultimately didn't end up integrating well enough for what we wanted to do. After looking at the minimal amount of support each framework was adding, we decided it would be best to rollout our own visual diffing system for our specific needs. We outlined a plan that included the components we'd need:

1. [Tests that'll hit each of our pages](#testing)
1. [A way to screenshot each page](#screenshotting)
1. [Somewhere to upload our screenshots](#storing)
1. [A diffing tool for our screenshots](#diffing)
1. [Somewhere to view our screenshots and diffs](#viewing)

## Testing

!["RSpec tags"](/img/posts/visual-diffs/rspec.png)

The first step was creating [RSpec](http://rspec.info/) tests in our Rails app. We only wanted our main tests to run locally, so we used [RSpec tags](https://www.relishapp.com/rspec/rspec-core/v/2-4/docs/command-line/tag-option) to tag our visual tests. This enabled us to exclude our visual tests from our test suite, but still be able to run them manually if we specified the visual tag. We wanted to exclude running the visual screenshots locally because we didn't need them in most cases, and they slowed down our main tests. We made it so our visual tests only ran on our CI, [Buildbox](https://buildbox.io).

Separating our visual tests from the main tests on Buildbox also meant that we didn't have to wait for the visual tests to finish to see whether the main build had broken. Buildbox made this easy by letting us break out our visual tests into a different step.

!["Buildbox steps"](/img/posts/visual-diffs/buildbox.png)

## Screenshotting

Next we'd need a way for our tests to screenshot the pages on our CI. To do this we'd need a service that would be able to use a browser to hit our Rails server. We found that services like [Saucelabs](https://saucelabs.com/) and [Browserstack](http://www.browserstack.com/), which both use [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/), worked best. In the tests, we ran a proxy to the service, and then a forked rails server running Bugsnag that the driver could hit. From there, we'd spin up a Selenium WebDriver to take screenshots of our site's pages.

We discovered that browser support for screenshotting isn't fully developed yet. IE & [Chrome](https://code.google.com/p/chromedriver/issues/detail?id=294) don't actually have ways to screenshot full pages, only the current viewport. This was a problem, but we found that Firefox *does* support full page screenshots. This helped us with diffing, but once Chrome & IE support full page screenshots, we'll also be able to use our screenshotting system to do browser and backwards compatibility testing.

After writing tests for static pages such as our homepage, we quickly realized that we'd have an issue with the dynamic data on our dashboard. With dynamic data, you can get false positive diffs because data can change between the viewing times. To combat this, we set up fixture data for our RSpec tests, and manually adjusted any other data not covered by fixtures using Selenium's Javascript support.

## Storing

The screenshots needed to be stored somewhere, so we chose to make an [AWS S3](http://aws.amazon.com/s3/) bucket to save them to. We used their [Ruby SDK](http://docs.aws.amazon.com/AWSRubySDK/latest/frames.html) to upload our current screenshot, and to download the latest master screenshot so we could create a diff between the two. We ended up using a naming pattern of `"/#{commit-sha}/#{area-of-site}/#{page-name}/#{image-type}.png"` in our bucket. The image-types would be `current` screenshot we took, the `master` screenshot we downloaded from S3, and the `diff` we made from the two screenshots.

## Diffing

!["Imagemagick diffs"](/img/posts/visual-diffs/diff.png)

To do our image diffing, we used [Imagemagick](http://imagemagick.org/). Imagemagick has a [`compare`](http://www.imagemagick.org/script/compare.php) command-line tool, which takes two images and creates a new diff image. It also outputs the percent difference comparison between the two images. This allows for tests that pass or fail based on diff percentage. Right now, all of our tests pass whether or not there's a diff - they'll only fail if there's an issue executing the test. The diff percentage could also be used to skip uploading 0% diffs.

We did run into some issues using Imagemagick. The first issue was that diffing ended up being the slowest part of our tests by far. While the rest of the actions took well under a second, running a diff between two images took anywhere in the 5-30 second range each, depending on the size of the images and diff percentage differences.

We also realized that if for some reason the screenshots ended up being different sizes, `compare` wouldn't run a diff. To get around that, we used [`-subimage-search`](http://www.imagemagick.org/script/command-line-options.php#subimage-search), which would diff between different sized screenshots, but this unfortunately slowed down diffing.

Another issue we encountered was that by default `compare` wouldn't diff images that were too dissimilar, so if you had an extremely large diff percent, it would not run. We ended up turning up the [`-dissimilarity-threshold`](http://www.imagemagick.org/script/command-line-options.php#dissimilarity-threshold) threshold to allow us to diff these images, but this too slowed down our diffing even more.

## Viewing

!["Admin dashboard"](/img/posts/visual-diffs/admin.png)

Once we had all of our screenshots and diffs uploaded to our S3 bucket, we wanted to view them easily. To do this we created a page in our admin dashboard to view the screenshots. The screenshot viewer allowed us to visit a specific commit on a pull request and very easily browse for glaring diffs that we needed to take a look at. It only pulls the last three commits out of active branches that had screenshots uploaded to S3.

!["Admin visual diff dashboard"](/img/posts/visual-diffs/admin-diffs.png)

## The future

We've been using this for a few weeks now, and it's proven to be quite useful. Some improvements we may make for the future include not uploading 0% diffs and making the test status meaningful. We also might start automatically attaching these diff screenshots to our pull requests if we can find a way to do it without creating too much noise. Support for diffing against the previous commit in your current branch instead of master would also be extremely useful, as would diffing between master commits. We really wanted to use our framework for browser testing and backwards compatibility testing, but we'll unfortunately have limited support on this until IE & Chrome allow for full page screenshots.

Does your company do automated visual CSS testing? Let us know how you do it by [tweeting at us](http://www.twitter.com/bugsnag)!
