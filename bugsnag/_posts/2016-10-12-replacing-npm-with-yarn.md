---
layout: post
title: Replacing npm with Yarn
publish_date: October 11, 2016
author_name: Christian Schlensker
author_twitter: wordofchristian
author_avatar: christian
categories: engineering
---

Hold on to your sweaters. There's a brand new tool hot out of the dryer. Yesterday
[Facebook announced](https://code.facebook.com/posts/1840075619545360/yarn-a-new-package-manager-for-javascript/)
a new package manager for Javascript that is meant as a replacement for NPM.


The initial gut reaction may be to get wound up about
the notion of forking essential tooling. However, yarn works
in a way that is compatible with existing infrastructure. It still uses the existing npm registry and its CLI is mostly identical to that of `npm`.

The Bugsnag frontend team was on pins and needles to give it a spin, primarily because we have frequently gotten tangled up by dependencies changing
between different developers' machines. We often have to delete our node_modules folder and re-install everything
to solve mysterious problems. We've tried npm's shrinkwrap feature before, but, like Facebook, there were
issues with it getting out of date so we've been itching for an alternative solution for some time.

Yarn solves this problem by using an automatically updated "lockfile" to tie down the dependencies
to a specific version. After this file is committed to source control, we should never have to worry
about inconsistent dependencies between machines or variations over time.

## Moving from npm to Yarn

The migration process was extremely simple. Just run the `yarn` command and commit the resulting
`yarn.lock` file. Then grep all our docker and deploy scripts for references to `npm` and replace them
with the yarn equivalents.

## Performance improvements

Some initial rough benchmarks look very promising. Just so you know the wool hasn't been pulled
over your eyes, here are the raw numbers.

![](/img/posts/yarn-install.gif)

|command|time (in seconds)|
|---|---|
| `npm install`| 155s |
| `yarn` (cold cache)  | 53s |
| `yarn` (warm cache) | 13s |

Yarn will cache dependencies so subsequent installs can be done without re-downloading.
This even works without an internet connection.

## Yarn has threads

Even without caching, Yarn is faster due to parallelization.

I'm especially excited about the impact it will have on the CI server where we start with a fresh
node_modules folder for every build.

## The API

The API is mostly the same with a few notable exceptions. With NPM the
default `npm install <some-package>` command would not add the dependency to `package.json`,
where as `yarn add <package-name>` will. I think this is preferable as the default behavior since
the alternative makes it too easy to forget to commit a dependency change.

Yarn also adds several bonus features. The `yarn why` command, which will show you which of your dependencies
is causing a package to be downloaded.

![yarn why command](/img/posts/yarn-why.png)

## Sew much more

These are only some initial impressions of yarn. There are also many features that I didn't get to cover.
Check out the [official site](https://yarnpkg.com/) to learn more, including the security enhancements, performance features,
and flat mode.
