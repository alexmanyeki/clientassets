---
layout: post
title: "Moving Bugsnag's front-end to React: What we learned through the largest rewrite of our application"
publish_date: November 30th, 2015
author_name: Jessica Dillon
author_twitter: jessicard
author_avatar: jessica
categories: engineering
---

About a year ago, our team decided to undertake a massive rewrite of much of our application. We knew we wanted to add a ton of new features and functionality to help our users fix bugs as painlessly as possible, but part of this meant rethinking the way our Dashboard's front-end was built.

![timeline](/img/posts/data-analysis-tools.png)

Recently, we released a new Bugsnag Dashboard to the world, which has been incredibly exciting. You can read more about it [here](/all-new-bugsnag-launch) in case you didn't hear about it. Throughout the process, we learned a lot, and we thought sharing our experiences might help other product teams who are thinking of undertaking similar projects.

The new Dashboard has a completely revamped look and tons of additional features. Handling all these changes was made possible with an entire rewrite of our front-end. We ended up changing our [Ruby on Rails](http://rubyonrails.org/) front-end to [React](https://facebook.github.io/react/), a JavaScript library for creating user interfaces, and to power our new front-end, we created a robust Ruby on Rails API.


## Why does React work for Bugsnag?

### What is React?

React is a JavaScript library built by Facebook. The creators of React built the library to solve one problem: building large applications with data that changes over time. They consider it to be the View layer in the [Model–view–controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (or MVC) pattern, allowing developers to show and mutate a representation of our data. It is not considered a full MVC framework like some of the other comparable JavaScript libraries out there. React is unique in that, as the view layer, it combines the HTML markup with JavaScript code in the same file. React also works with [Flux](https://facebook.github.io/flux/), which is an architecture that defines how data, events, and actions should flow through client side code.

### Why React?

In React, you build individual components, and each component encapsulates a part of the view and its logic. This means the HTML view markup and the JavaScript for that view are in the same file, where they can all be edited together. I was initially pretty horrified to see the markup inside of our JavaScript files — what about separation of concerns? However, after using it for a little while, I realized that I actually *like* them being combined. Hear me out here: although React does remove the physical "separation" between HTML & JavaScript, that separation wasn't necessarily helpful in a rich client-side application. Over time, I realized that the separation was a separation of technologies, rather than concerns. Removing this separation led to code that was both more maintainable and easier to reuse.

![react code](/img/posts/react-code.png)

When the markup and the JavaScript that manipulates that markup are in the same file, it's much easier to understand exactly how the JavaScript affects the markup. One of the popular alternatives to this is writing `js-*` classes and `data-*` attributes into the markup, and then attaching to those in JavaScript. People working in the markup generally know not to touch those parts of the view, but they aren't necessarily sure why. The code then becomes brittle, hard to read, and hard to maintain.

One of the main reasons we wanted to use React was so we could build components that would be reusable in multiple areas of our application. As it turns out, building components is one of the main use cases for React. Since components keep their code so encapsulated, they make reusing code, testing, and separation of concerns easy.

Even though removing the physical separation between HTML markup and JavaScript code is a great idea by itself, there are more reasons why it's ideal for React to have markup living alongside JavaScript. Each React component has a `render` function, which is where you create your HTML template and return it. This function creates a virtual DOM, and the real DOM is only updated when there are data changes. Some rich client-side applications handle data changes by replacing existing content with new HTML returned by an AJAX request. In a React application, data changes cause a conceptual press of the "refresh" button, and React knows to only update the changed parts. Since DOM changes are slow, React's approach can be a really huge performance improvement for the front-end.

## The move

Converting our entire front-end to React was a big move, but well worth it. After planning out how to divide our Dashboard into easily digestible chunks to move over, we started implementing them piece by piece. We found the similarities and differences between the old Dashboard and the new Dashboard design — we looked through the sections of our Rails application to figure out which pieces of Ruby code could be "reused" and rewritten into JavaScript. From there, we were able to make reusable components to drop into our views.

React components also function as [state machines](http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#components-are-just-state-machines) which means we don't have to manually track state, and React will trigger rerenders in affected DOM areas. This helped us rip out our complicated JavaScript files and Rails decorators, encapsulating the existing logic in with the component.

We chose a few technologies that would help us integrate React:

### JSX & CJSX

You can use plain JavaScript with React, but we used [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html). JSX is a JavaScript syntax extension that looks similar to XML, and is what allows us to write the aforementioned HTML inside our JavaScript files. We use JSX because it provides a concise and familiar syntax for defining tree structures with attributes. On top of that, since we already use [CoffeeScript](http://coffeescript.org/) at Bugsnag, we used [Coffee-React](https://github.com/jsdf/coffee-react) to enable functionality with CoffeeScript and JSX.

### Reflux

We also decided to use [Reflux](https://github.com/reflux/refluxjs) instead of traditional Flux. Reflux is a [refactored](https://github.com/reflux/refluxjs#differences-with-flux) version of Flux that makes everything more dynamic and adheres more closely to the principles of [functional reactive programming](https://en.wikipedia.org/wiki/Functional_reactive_programming).

### Gulp

For numerous reasons, including the fact that the [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) does not allow us to harness [sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/), we decided to [remove the asset pipeline](/replacing-the-rails-asset-pipeline-with-gulp) and use [Gulp](http://gulpjs.com/) for our asset compilation needs. Gulp is a Node.js streaming build system, strictly providing streams and a basic task system. We use Gulp to compile all of our assets, including everything we need to run React and related technology.


## What we learned

React was a great library for us to work with, and although the rewrite was a huge project, we definitely learned a lot. The library is unique and allowed us to do a lot of really cool things, but we had to learn how to structure and use it properly over time. Along the way we made some mistakes, but ultimately learned how to use it and get us to the Dashboard we have today.


### Mixins

One of the early mistakes we made was not using [mixins](https://facebook.github.io/react/docs/reusable-components.html#mixins) correctly. At first, when we had a pretty reusable piece of code, we would decide that it would make a great mixin. After making quite a few mixins and developing on top of them, we realized they ended up being either *extremely* brittle or *extremely* generalized. This made our code harder to maintain, which defeated the whole purpose of code reuse. In the end, we pulled out these mixins into components. We learned not to use mixins for view code, but instead for small and very specific logic. For example, we have a mixin for managing our API requests, and another mixin for creating and managing application hotkeys. Every mixin we have now is very small and very specific.

### Requesting Data

A helpful thing we added to React was the ability to request data from Reflux stores while a component is on screen. It allows you to "mount" a store, which automatically `connect`s to that store, and while on screen can ask the store for certain data. When that data is fetched, it will automatically update the state. On `unmount`, it automatically removes that hook. We developed this workflow before Facebook released [Relay](https://facebook.github.io/relay/), which handles approximately the same use case. In the future, we will probably switch over to using Relay so we don't have to maintain our own system.

### PureRenderMixin

Another thing we found handy was to use the [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html) in pretty much every component. If your React component's render function is "pure" (in other words, it renders the same result given the same props and state), you can sometimes get a performance boost by using this mixin. We did run into a pitfall though: this mixin works by comparing your component's data to avoid unnecessary re-renders during changes, but it only shallowly compares the data objects. That means if a component contains complex data structures, it may produce false-negatives for deeper differences.


### Immutable-js

One future improvement we are considering is using [Immutable-js](https://github.com/facebook/immutable-js), which would allow us to use the PureRenderMixin in more components. Immutable-js makes it so that we can create immutable data, which cannot be changed once created. This means much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic. Because we wouldn't be modifying original objects, Immutable-js will allow us to use the PureRenderMixin on components with complex data structures without producing false-negatives.


## The future

![next](/img/posts/next.png)

At Bugsnag, we are really excited about the architectural changes we've made to the product for the new Dashboard. We hope these changes helped enhance your experience as they allowed us to make more meaningful representations of the data, helping you to debug easier. From an engineering perspective, these changes allow easier maintenance of the code, and the component-based system enables us to create new features faster. We're hopeful that in the future we can open source our components and contribute to the React ecosystem. We hope you love the [new dashboard](https://app.bugsnag.com/user/sign_in), and we would love your feedback! Reach us on [Twitter](https://twitter.com/bugsnag).
