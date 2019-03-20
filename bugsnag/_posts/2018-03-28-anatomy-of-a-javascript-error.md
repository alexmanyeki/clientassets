---
layout: post
title: Anatomy of a JavaScript Error
publish_date: March 28th, 2018
author_name: Christian Schlensker
author_twitter: wordofchristian
author_avatar: christian
excerpt: Learn about the different types of JavaScript errors, why they happen, and how to handle them in your JavaScript application.
categories: engineering
hero_image: anatomy-of-js-error.png
cover_image: anatomy-of-js-error-cover.png
---

> This blog is the second part in a two-part series on JavaScript debugging. Read part one to learn about the inner workings of [JavaScript source maps](https://blog.bugsnag.com/source-maps/) with code examples.

It’s not a pretty sight when an application dies. Error messages can be difficult to understand, and we sometimes have to put our investigator hats on to solve the mystery and find the culprit.

Most software developers spend all their time avoiding errors, but here at Bugsnag, our entire product is built around capturing and managing errors. As such, we deal a lot with the ins and outs of JavaScript errors and their related APIs. In this blog, we’ll take a look at the different types of JavaScript errors, why they happen, and how to handle them in your application.

## Automatically generated errors and why they happen

The first step to understanding JavaScript errors is to understand where they come from.
Most JavaScript errors that occur in the wild are automatically generated from the JavaScript engine.
There are many types of errors but they typically fall into one of 3 classes.

### `TypeError`

One of the most common classes of error, this occurs when some value is not the type it's expected to be. Frequently this happens when calling something like a function that actually isn't a function because it is "undefined" or some other value.

```javascript
window.foo()
  // => TypeError: window.foo is not a function
[].length
  // => 0
[].length()
  // => TypeError: array.length is not a function
```

Another common occurrence of TypeError is when trying to access a property on an undefined value.

```javascript
window.foo.bar
  // => TypeError: Cannot read property 'bar' of undefined
```

### `SyntaxError`

These errors occur when the JavaScript engine is parsing a script and encounters syntactically invalid code. If a JavaScript file contains a syntax error, none of the code in the file will execute.

```
    console.log('hello')
    notValid(
```

Not only will this code produce an error, but the `console.log` before the invalid syntax won't even run.

### `ReferenceError`

These occur when code refers to a value that does not exist in the current scope.
For example:

```javascript
console.log(somethingMadeUp)
  // => ReferenceError: somethingMadeUp is not defined
```

## Manually throwing errors

Not all errors are accidental. They can also be triggered intentionally.
When an application isn't functioning correctly, it is preferable to fail loudly, explicitly, and clearly.
Otherwise the cause of the problem could be unclear or, worse yet, not noticed by the developer at all.

The simplest way to manually trigger an error is by using a throw statement:

```javascript
throw 'Invalid input';
```

This will automatically create an instance of an `Error` object with the message "Invalid input", but the error instance can also be created manually and passed around.

```javascript
let error = new Error('Invalid input')
// later
throw error;
```

Manually throwing errors is especially helpful for library authors as they can inform a developer using their library how they made a mistake. For example, when a function is called with an invalid argument.

```javascript
function sayName(name) {
  if(typeof name !== 'string') {
    throw new Error('name must be a string, received:' + typeof name);
  }
}
```

## Intercepting errors using try/catch

If you know that a particular bit of code is risky and might throw an error it can be wrapped in a `try/catch` statement.

```javascript
try {
  someCrashyFunction()
} catch(error) {
  // display it to the user maybe
  // and report it to Bugsnag
  Bugsnag.notify(error);
}
```

Try catch blocks can also be nested inside each other. Once the error is handled, if it is desirable to pass the error higher up the call stack, it can be re-thrown.

```javascript
try {
  someCrashyFunction()
} catch(error) {
  // Handle the error here:
  // ...
  // then pass it up the chain
  throw error;
}
```

## Gotta catch 'em all with global error handling

Even with the most diligently written code, errors can sometimes still slip through. It's okay. Mistakes
happen. When they do, it's important to know about it quickly. That's where error reporting
tools like Bugsnag fit in.

### How global error handling works

To catch and handle all errors that might happen in a browser session, we can hook into the `window.onerror` event handler. This allows setting up a global handler for any unhandled errors that might pop up. This is what the [Bugsnag error reporting library](https://github.com/bugsnag/bugsnag-js) hooks into for reporting uncaught errors from browser based JavaScript applications.

In a Node environment, there is no `window` object so the equivalent approach is to use `process.on('unhandledException, callback)`.

Global error handling is not a replacement for the fine grained control that can be achieved from `try/catch` statements. Instead, it serves as a safety net for exceptions that make it through the earlier lines of defense. By placing the error handling closer to the source of the potential problem, we will likely have a better idea of how best to deal with it and possibly recover before the user even notices a problem. And for everything that does slip through the cracks, we have peace of mind knowing our global error handler will surface the issues to us.

## Broken promises

With the advent of [ES2015](https://babeljs.io/learn-es2015/), we were given first class support for [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) in JavaScript which greatly improves the clarity of asynchronous code. One drawback of Promises is they have the tendency to swallow errors that occur in their `.then()` method. If there is an error generated in this method it will never bubble up to the global error handler and thus will not be reported to Bugsnag.

```javascript
fetch('https://my-api.endpoint')
.then((response) => {
  response.thisMethodDoesNotExist() // this error will be swallowed

  doSomethingElse() // this code will never run
})
```

This is why it's always best practice to add a catch statement for all promise chains so any errors can be handled.

```javascript
fetch('https://my-api.endpoint')
  .then((response) => {
      response.thisMethodDoesNotExist()
    doSomethingElse() // this code will never run
  })
  .catch((error) => {
    console.error(error)
    // # => response.thisMethodDoesNotExist is not a function
    Bugsnag.notify(error)
    // show the error to the user
  });
```

This solves the problem of invisible errors, but it has a couple of drawbacks. First of all, it is cumbersome to write this error handling code for every promise we use. Secondly, if an error occurs in the catch statement, it will be swallowed as well and we are right back where we started.
In order to get around this, we can hook into a global unhandled promise rejection handler.

```javascript
window.addEventListener("unhandledrejection", (event) => {
  console.error(event.reason);
  // report the error here
});
```

Now any promise that fails and does not have an explicit `catch` handler will trigger the `unhandledrejection` event.

If you are using the [bugsnag-js notifier](https://github.com/bugsnag/bugsnag-js), then unhandled
promise rejections will automatically be caught and logged to Bugsnag so you don't have to worry
about missing them.

## Properties of an error

Once an error has been captured, it can be inspected in order to pull useful information out of it. Most important are the **name**, **message**, and **stack** properties.

The first bits of useful information are the error's **name** and **message**.
These fields are what get displayed for error listings in the Bugsnag inbox as well as what gets printed to the browser console.

The message of an error is set when it is initialized.

```javascript
    let error = new Error('This is my message')
    console.log(error.message)
    // => This is my message
```    

By default the error's name is the same as its constructor function so when an error is created using `new Error('oh no!')` or `throw('oh no!'` its name will be "Error". If you create an error using `new TypeError('oh no!')` its name would be "TypeError". The name of an error can be overridden simply by setting it.

```javascript
    let myError = new Error('some message');
    myError.name = 'ValidationError';
    throw myError;
```    

Here we've changed the error name to `ValidationError`, and this will be reflected in the Bugsnag dashboard; however, in some browsers (e.g. Chrome), it will still be printed to the console as "Error". To get around this, custom error classes can be used which we'll talk about a little later in this article.

### Stacktraces

The `Error.prototype.stack` property contains the stacktrace for the error.
The stacktrace is stored on the error as a simple string where each function in the stack is separated by newline characters. In the bugsnag-js library, we use a utility called [error-stack-parser](https://github.com/stacktracejs/error-stack-parser) to parse the stacktrace into a useful data structure.

It is important to note that the stacktrace is determined by where the error was initialized, not where it was thrown. This means that if an error is created and returned from `functionA` and then thrown in `functionB`, the top of the stacktrace will be `functionA`.

It's likely that you'll minify your JavaScript code, and when you do, the lines in the stacktrace will not match up with the original source files. In order to find the original source, we use source maps to look up and translate the stacktrace. Learn more about how source maps work in our other blog in this series [the Anatomy of source maps](https://blog.bugsnag.com/source-maps/).

## Creating custom error types

Sometimes it is useful to create custom error types in addition to the ones that are already built into the JavaScript language. One possible use case for this is an application could be set up to handle different types of errors in different ways.

For example, in a Node application, perhaps we would have a special error class for validation errors in API requests. If a validation error is caught, the application would know to respond with an [HTTP 400 status](https://httpstatuses.com/400).

Custom errors also allow capturing additional custom data with an error that is specific to that error class.

ES6 classes make the task of defining custom error types extremely trivial. For example, if we wanted to throw a specific type of error for invalid fields, we could define it like this.

```javascript
class ValidationError extends Error {
  constructor(field, reason) {
    super(reason);
    this.field = field;
    this.reason = reason;
    // the next line is important so that the ValidationError constructor is not part
    // of the resulting stacktrace
    Error.captureStackTrace(this, ValidationError);
  }

  // we can also define custom methods on this class
  prettyMessage() {
     return `ValidationError: [${this.fields}] reason: ${this.reason}`;
     // ex: "ValidationError: [age] reason: Must be a number"
  }
}
```

Then the error handling code can make use of `instanceof` to determine what type of error was thrown and respond appropriately. In an [Express.js](https://expressjs.com/en/guide/error-handling.html) application for example, custom middleware can be set up to accomplish this.

```javascript
app.use(function errorHandler (error, req, res, next) {
 if (error instanceof ValidationError) {
   // respond with 400 status and include relevant error details
   return res.status(400).json({
      type: error.name,
      message: error.prettyMessage(),
      field: error.field,
    });
  } else {
    // This is some other kind of error, let the default error handler deal with it
    next(error)
  }
})
```

Although this example is using Express.js middleware, a similar approach can be taken in other types of JavaScript applications using a simple `try/catch`.

```javascript
try {
  submitForm();
} catch (error) {
  if (error instanceof ValidationError) {
    // show the error to the user
    displayErrorMessage(error.prettyMessage());
  } else {
    // pass it to the default error handler
    throw error;
  }
}
```

Without custom error classes, this kind of specialized error handling would be much more difficult.
It would require doing something hacky, like comparing the error message or some custom property. Luckily, using
the error class for comparison is much more explicit.

## Wrapping up

When applications fail, ideally they provide a smooth experience for the user, but for the developer,
they should fail loudly and clearly so the problem can be quickly analyzed. Properly utilizing the tools the JavaScript language provides for error handling can help to clarify the opaque anomalies in an application so they can be understood quickly and addressed.

---

Try Bugsnag's [JavaScript error reporting](https://www.bugsnag.com/platforms/javascript/), free for 14-days.
