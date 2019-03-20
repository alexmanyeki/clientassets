---
layout: post
title: Packagist and the PHP ecosystem
publish_date: May 9, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: engineering
hero_image: packagist.jpg
---

*This is a guest post written by Graham Campbell, prominent PHP open source developer and [StyleCI](https://styleci.io/) founder. This is the second blog in a two part series on best practices using Composer. Read the first blog on [Building Maintainable PHP apps using Composer](https://blog.bugsnag.com/best-practices-using-composer/).*

![Graham Campbell](/img/posts/graham-campbell.jpg)

---

In our last blog post we saw the basics of Composer, but skipped over where it actually finds its packages, and how to publish packages of your own. In this blog post, we will be looking at exactly this, plus some security considerations when using composer in your application.

## What is Packagist?

Packagist is the primary package repository for composer. This is where you can publish your packages, and also where you can view other people’s packages. Composer will use Packagist to look for packages by default, however, more advanced users can customize this if they wish. One reason you might want to customize this would be to use private packages. For more details, see [the composer documentation on repositories](https://getcomposer.org/doc/05-repositories.md).

## Distributing your package via Packagist

Okay, so you’ve been working on your new package, and you want to publish it so that not only you can use it, but so everyone else can check out your handiwork too! In order to publish your package, visit https://packagist.org/packages/submit, and provide the URL to your code, whether it be on GitHub, Bitbucket, Gitlab, or otherwise.

Luckily, publishing package releases is very straightforward. All you need to do is make a tag using git, and you’re good to go. You should not set the version field in your composer.json file.

Want to search for similar packages, and check out your own listing? You can explore all the publicly available packages on [the Packagist website](https://packagist.org/explore/).

## Package Licensing

The license field is optional, but it is a good idea to set this so people know if and how they can use your package. It is a common mistake to type a human readable license name here instead of an actual “license identifier”. Here you can find [a list of possible licenses](https://spdx.org/licenses/). If your code is using a proprietary license, using “proprietary” as the license identifier is also permitted. Some common licences are Apache-2.0, BSD-2-Clause, BSD-3-Clause, GPL-2.0, GPL-3.0, and MIT.

Composer can actually tell you the licenses of all your dependencies. Simply run the `licenses` command:

	composer licenses

This will output something along the lines of:

![Package licenses](/img/posts/package-licenses.png)


## Development Versions

So, you’re working on a great new feature for you package, and you want to test it out. But there’s a problem: you want to be able to load your changes without tagging a release because, naturally, you’re not ready for a release yet. There are a few approaches you can use:

1. Add a branch alias to your package composer.json,
2. Directly reference the branch name in your application composer.json.

#### Branch Aliases

These automatically mean that you can associate a branch with a dev package version!

Imagine the case where you are working towards a 2.0.0 release on your master branch, and you want to be able to install it before you tag the release. A good way to do this is to alias the master branch to the version “2.0.x-dev”.

In your application, you can access your 2.0 development version by using the version constraint "2.0.@dev", or something to that effect.

In fact, composer is clever enough to actually look at the branch name, and determine with which version it’s associated. For example, if you name a branch “2.0”, then composer will treat it as representing the latest “2.0.x-dev” version.

Finally, I will note that you can actually avoid having to specify stability on your dependencies by setting the following in your application composer.json file:

![Version settings](/img/posts/version-settings.png)

This will tell composer that you are happy for it to resolve “^2.0” or “2.0.” to a development version if it needs to but you’d prefer it to resolve a stable release if it can.

#### Referencing Branch Names Directly

As mentioned, the other way to access your new code is to directly use the branch name as a version. This is very useful when you are working on a specific new feature, rather than wanting to test some merged changes. To install a branch called “new-feature”, you will need the version constraint “dev-new-feature”.

## Security Considerations

Recall from my last blog post on [Building Maintainable PHP apps using Composer](https://blog.bugsnag.com/best-practices-using-composer/) that Composer leaves a “composer.lock” file in your repo. For applications, it is very useful to commit this file since it locks your dependencies at a known state, giving you fine grained control over exactly what packages are deployed with your application.

In particular, it will allow you to protect against dependencies making accidental breaking changes, or introducing bugs. These could of course have consequences for the security of your application.

We can actually go one step further than this, and check if our set of resolved dependencies have known security problems. SensioLabs [provide a service](https://security.sensiolabs.org/check) for checking your composer.lock file for known security vulnerabilities:

The database used for checks is publicly available on GitHub at:

	https://github.com/FriendsOfPHP/security-advisories.

Finally, it’s also possible to register a private package repository and proxy packagist.org through it, for which there are paid services/solutions you can use.

## Keeping on top of new versions

We’ve seen the features and tooling provided for keeping on top of security. These won’t show you if your package version is no longer supported by the author though, and they also won’t show you if there’s a newer version that your version constraints restrict you from installing.

Luckily, composer provides an easy command you can run that will show you your installed package versions, and what the very latest version is. If I run `composer outdated` on an example repo I installed the dependencies for a few weeks ago, we can already see that there are updates available:

![Version updates](/img/posts/version-updates.png)

Major updates show in red, and minor updates show in yellow. It is normally safe to upgrade to minor releases straight away; however, you should always be careful you understand the versioning policy of each dependency, and you might also want to go and review the changes yourself.

You can run `composer update` to update to the newest dependencies permitted by your version constraints, and you can modify your version constraints to access newer versions.

Finally, I should note that you can update composer itself with “composer self-update”.

## Conclusion

We’ve seen more powerful features provided by composer, as well as how to publish packages on Packagist. You can now ship your application with confidence, knowing that your dependencies are up-to-date, and have no known security vulnerabilities.

---

Are you monitoring your PHP application for errors? Try Bugsnag's [PHP error reporting](https://www.bugsnag.com/platforms/php/) to gain insight on bugs and fix them for your users.
