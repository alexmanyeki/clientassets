---
layout: post
title: Watch out for new possible sources of errors in Django 2.0
publish_date: December 20th, 2017
author_name: Karissa Peth
author_twitter: karissapeth
author_avatar: karissa
categories: engineering
excerpt: A major release of Django 2 is now available. Learn about some potential error sources to look out for and be aware of in this rundown of the changes.
---

## New Django Version

Oooooooh, New Shiny! A major new version of Django was released on December 2nd 2017, and you can check out the full release documentation for Django 2.0 [here](https://docs.djangoproject.com/en/2.0/releases/2.0/). Just in time to start playing with over the holidays. As with any new release, it’s about new features and modernization; however, when upgrading to any new version there can be changes or [deprecations](https://docs.djangoproject.com/en/2.0/releases/2.0/#features-removed-in-2-0) that might introduce new errors into your codebase. This version is the first that will use a new [versioning cadence](https://docs.djangoproject.com/en/dev/internals/release-process/#release-cadence) and isn't [backward compatible](https://docs.djangoproject.com/en/2.0/releases/2.0/#backwards-incompatible-changes-in-2-0). With that in mind, we’re going to highlight a few key changes to hopefully avoid error creep.

## Wait, no support for Python 2.7?

One of the most notable changes in the new version of Django is the lack of support for Python 2.7, as it exclusively supports Python 3.4, 3.5, 3.6. This relegates support of Python 2.7 to the older Django 1.11 version. Although Python 3 was released over seven years ago, 2.7 still [remains heavily used](https://www.jetbrains.com/research/devecosystem-2017/python/). Keep this compatibility in mind when you are looking at Django 2.0.

## Blocking Unexpected Results of Reversed Slices

When querying a slice of data, you may have gotten unexpected results if you also applied `.reverse()` or `.last()` to the query. This is due to the ordering operation occurring before the slice is taken, which is not obvious from the readability of the code. In [Django 2.0 this operation will be blocked](https://docs.djangoproject.com/en/2.0/releases/2.0/#queryset-reverse-and-last-are-prohibited-after-slicing) and produce the following error:

`TypeError: Cannot reverse a query once a slice has been taken.`

Previously in Django 1.11 you may have experienced this confusing behavior:

```python
people = Person.objects.order_by('name')
# people = (Person<'Alex'>, Person<'Bob'>, Person<'Clint'>, Person<'Dave'>)
people_slice = people[:2]
# people_slice = (Person<'Alex'>, Person<'Bob'>)
reversed_slice = people_slice.reverse() #Expecting (Person<'Bob'>, Person<'Alex'>)?
# reversed_slice = (Person<'Dave'>, Person<'Clint'>)
```

Now, in Django 2.0:

```python
reversed_slice = Person.objects.order_by('name')[:2].reverse()
TypeError: Cannot reverse a query once a slice has been taken.
```

## Explicit Definition of Optional Form Fields

Django has many built in form fields, each with a various number of optional parameters. Previous versions of Django allowed for positional value entry for the optional parameters. This has [changed](https://docs.djangoproject.com/en/2.0/releases/2.0/#form-fields-no-longer-accept-optional-arguments-as-positional-arguments) to explicit value declaration in the 2.0 version, which will help to reduce run time errors from positional parameters in an incorrect order. It also makes the declaration of the optional parameters more readable. Your future self will thank you.

Previous optional parameters implied that maximum length of form entry for email is 30 and minimum length is 1:

```python
forms.EmailField(30, 1) #Valid optional fields
```
It makes it more difficult to create a field with impossible validation requirements:

```python
forms.EmailField(1, 30) # !Impossible to have a valid input
```
Django 2.0 makes the declaration of the optional parameters explicit thus preventing a run time error:

```python
forms.EmailField(max_length=30, min_length=1)
```

## Explicit Indices

In the same vein as the change to optional form fields mentioned above, Django 2.0 also has now prohibited positional parameters for indices. You will need to explicitly define the fields and [index names](https://docs.djangoproject.com/en/2.0/releases/2.0/#indexes-no-longer-accept-positional-arguments) going forward.

Previously it was easy to mix up parameters when creating an Index:

```python
Index('name_index', ['first_name', 'last_name'])
ValueError: Index.fields must be a list.
```
Correct positional index in Django 1.11 and earlier:

```python
Index(['first_name', 'last_name'], 'name_index') # Valid index
```

Django 2.0 makes this construction more explicit:

```python
Index(fields=['first_name', 'last_name'], name='name_index')
```

## Catch these errors with Bugsnag!

Updating your codebase to use Django 2.0 will hopefully be smoother now that you are aware of some changes to slice ordering and explicit declarations required in forms and indices.

As you upgrade to this version, we are there to help you catch and prioritize any errors. Our Django library is fully compatible with this latest version.

---

Get started by [learning more about Bugsnag for Django](https://www.bugsnag.com/platforms/python/django/), or jump to our docs on updating your [Bugsnag Django package](https://github.com/bugsnag/bugsnag-python/blob/master/UPGRADING.md).
