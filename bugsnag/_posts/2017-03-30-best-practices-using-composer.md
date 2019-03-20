---
layout: post
title: Building maintainable PHP apps using Composer
publish_date: March 30, 2017
author_name: Kristine Pinedo
author_twitter: bugsnag
author_avatar: kristine
categories: engineering
hero_image: getting-started-composer.jpg
---

*This is a guest post written by Graham Campbell, prominent PHP open source developer and [StyleCI](https://styleci.io/) founder. This is the first blog in a two part series on best practices using Composer.*

![Graham Campbell](/img/posts/graham-campbell.jpg)

---

Recognise the problem of trying to use somebody’s library and having to copy it into your codebase, use submodules, or even PEAR, which causes headaches for many PHP developers. Composer is here to solve these problems, similar to NPM for JavaScript devs, and Bundler for Ruby devs, by defining a unified way to specify dependencies and install them for you.

Composer has made big waves in the PHP community in recent years. Thanks to Composer’s creators, Jordi Boggiano and Nils Adermann, Composer has become the absolute backbone of PHP’s package infrastructure today.

In this blog post, we shall be introducing Composer, from the ground up. We will see what packages are, how they should be versioned, and how to install them into your application. Learn about Composer and never look back!

## What is a package?

Before we dig in, it will be useful to define some terminology. In composer the word *package* describes both libraries and projects, however this term is often abused to only refer to libraries. Be careful when reading other resources that may misuse this term.

A *library* refers to a package that you can install into your application, such as the Laravel Framework, or the Bugsnag PHP Notifier, and a *project* refers to an actual application. Libraries can be dependencies of other libraries or projects, but a project should never be a dependency of anything.

## The Early Days

Composer started out life back in April 2011 as a PHP port of [openSUSE's Libzypp satsolver](https://en.opensuse.org/openSUSE:Libzypp_satsolver). Composer was first adopted by the Symfony Framework 2, which shipped in July 2011, and celebrated its first stable release in April 2016, essentially replacing PEAR.

## Installing Composer

First things first! You’ll want to install Composer — here's the [documentation](https://getcomposer.org/doc/00-intro.md#system-requirements) on how to do that.

If you’re developing on a Mac, you can simply install Composer with brew:

	brew install composer

If you’re on a Linux machine, you can usually do something along the lines of:

```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```


## Using Composer Packages

Now that you’ve installed Composer, you’ll want to pull in a package for your application, or start building your app. To initialize a new Composer *package*, you need to add a composer.json file to the root directory of your project:

```
{
    "name": "foo/bar",
    "license": "MIT",
    "require": {
        "php": "^7.0"
    },
    "require-dev": {
        "phpunit/phpunit": "^5.7"
    },
    "autoload": {
        "psr-4": {
            "Foo\\": "src/"
        }
    }
}
```

You can also run the `composer init` command as a quick start to creating a composer.json file to avoid writing this manually. [Here's how](https://getcomposer.org/doc/03-cli.md#init).

By default, projects are libraries; however, if you are looking to build an application, you should set the project *type* field to project.

In the [*require* field](https://getcomposer.org/doc/03-cli.md#require), you can put the libraries and platform dependencies your package needs. For example, if you are using monolog, you could have:

```
"php": "^7.0",
“monolog/monolog”: “^1.22”
```

Other valid fields are *description*, that expects a short textual description of the package, and *authors*. You can read the [full details of all valid fields here](https://getcomposer.org/doc/04-schema.md).


## Understanding package versioning with Composer

It is common for packages to follow semantic versioning; however, this is not a requirement, and one should be careful to check the exact versioning policy packages use. For example, the Laravel Framework does not follow SemVer, rather, it follows an offset variant, whereby minor releases are breaking, and patch releases are used to introduce new features as well as bug fixes, leaving major releases for major architectural changes, and the like. By comparison, the Symfony framework follows SemVer, with some minor caveats.

Semantic Versioning is a modern versioning specification that defines that package versions should be of the form “x.y.z”, with optional stability suffixes. We say that “x” is the major version, “y” is the minor version, and “z” is the patch version. This is useful because it defines a unified versioning system that everybody understands. No working out what *2016.05.5a-tuesday* means anymore!

In Semantic Versioning, we require that the major version is incremented whenever there is a breaking change to the code, the minor version is incremented whenever there is a new feature, and patch version whenever there are only bug fixes. It is important to note that during 0.x releases, it is permitted for minor releases to contain breaking changes.

[Here you can read the whole spec](http://semver.org/).

If you are interested in the fine details of all the supported version formats in composer, I’d recommend having a read of [Semver](https://github.com/composer/semver), which offers utilities, version constraint parsing, and validation. In particular, reading the test suite would give clarity.


## Best practices for installing packages

Now that you have your composer.json file, and have seen how package versioning, you are ready to start installing packages! Composer provides a way to require packages from the command line:

	composer require monolog/monolog

Be careful when using this feature, however, since Composer will assume the target package uses semantic versioning, when it chooses a version constraint for you. If you’d like to choose your own version constraint, you can:

	composer require illuminate/support:5.4.*

If you’d like to add things to the dev requirements, you can add the --dev flag:

`composer require phpunit/phpunit --dev`

You will see that Composer creates a `composer.lock` file when you install dependencies. This file locks your dependencies at a *known state*, allowing you to use version constraints in your `composer.json` file. You should not modify this lock file yourself, however, if you’d like to update your dependencies, you can run the `composer update` command. The `composer install` command will install dependencies from the lock file if present, and if not, it will be the equivalent of running `composer update`.

You can pass the `--no-dev` flag to the install/update commands to tell Composer that you do not want to install the development dependencies (this will also not do dev-autoload autoloading, as we will see). When deploying in production, the command to use is `composer install --no-dev`. By default, composer will install dev dependencies.

It is conventional to commit your composer.lock file with your application, but never the `vendor` folder Composer generates. This is very large, and Composer is here to solve the very problem of having to commit your dependencies to your codebase.

#### Release Operators
It is important to note that the **^** operator exactly follows Semantic Versioning. It says *get the highest version I can, without any breaking changes*. This means **^1.0** resolves to the largest **1.x** release, with version at least **1.0.0**, and **^1.4.6** means get the largest **1.x** release with version at least **1.4.6**. Note that **^0.5.6** would mean get the largest **0.5.x** release with version at least **0.5.6**.

We also have the **~** operator which is similar, but not the same. It’s easiest to see this with some examples. **~1.1.2** means get the largest **1.1.x** with version at least **1.0.2**. **~1.3** means get the largest **1.x** with version at least **1.3.0**. This operator does distinguish between 0.x versions like **^** does.

## Autoloading: Automagic Class Loading

As seen in the earlier example, there is an *autoload* field. This allows Composer to manage the autoloading of your code. As soon as you try to use a class that’s not loaded, PHP will go ahead and automatically load it for you. It is common to use PSR-4 autoloading these days. The low down is the directory structure approximately matches your namespacing structure (up to a prefix), and the class/interface/trait name should match the filename. You can read the [full specification here](http://www.php-fig.org/psr/psr-4/).

Under the hood, Composer will register an autoloader with PHP’s `spl_autoload_register` function, which will cause the callback registered to be called whenever your code tries to reference a class/interface/trait not already in memory. No need to require each file as you need it yourself now. All you need to do is to require one file in your application — the Composer autoloader:

	vendor/autoload.php

As well as using the PSR-4 autoloading standard, Composer also supports *class map* autoloading. This is where Composer will scan your files and take note of which classes are in what files, and then, whenever you want to load a class, it will go and require the needed file for you. This could be useful for defining test stubs for example. Another real world example is Laravel’s migration system.

It is also possible to only autoload things when in development. You can use the *dev-autoload* field to only autoload things such as your tests. For a concrete example of autoloading, dev-autoloading, and class maps in action, take a look at the [boiler-plate Laravel application](https://github.com/laravel/laravel/tree/v5.4.9).

## Conclusion

We have seen the basics of Composer, what packages are, and how to version them. Now, go and build something great! In our next blog post we will look at Packagist, and the wider PHP ecosystem.

---

Are you monitoring your PHP application for errors? Try Bugsnag's [PHP error reporting](https://www.bugsnag.com/platforms/php/) to gain insight on bugs and fix them for your users.
