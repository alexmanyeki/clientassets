---
layout: post
title: Converting a large React Codebase from Coffeescript to ES6
publish_date: February 21, 2017
author_name: Christian Schlensker
author_twitter: wordofchristian
author_avatar: christian
categories: engineering
---

One of the ongoing initiatives for the Bugsnag Frontend Team has been
a migration of our codebase away from coffeescript. It hasn’t been an easy
journey, and it isn’t yet complete, but we thought we’d share what we have
learned from this process and how we have managed to speed our conversion
without overly sacrificing productivity or stability.

## Why move away from coffeescript

### Javascript has become really good
I’m personally a long time fan of coffeescript. For years it has
offered frontend developers a clean syntax and a lot of language niceties.
One feature that I still miss in javascript is the
[Existential operator](http://coffeescript.org/#existential-operator) which
makes it easy to check for the existence of a function before calling it.
`something?.method?()`

However a lot has changed since the advent of coffeescript. The javascript
language has advanced considerably. Not only has it adopted many of the syntax
sugar features such as classes and fat arrow function, it has gone beyond
coffeescript with features such as
[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
and [object spread
properties](https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spread.md)
. Furthermore, since these features are part of the official language
specification, many of them will soon be usable ([if not already](https://www.chromestatus.com/feature/5643236399906816))
in the browser, without needing to transpile the code.

### A larger community and more support
The biggest drawback of using coffeescript is the comparative lack of  developer tooling. It seems that react development is especially underserved by the coffeescript ecosystem. Many features of react ecosystem either have small or non-existent support for coffeescript.

![](/img/posts/converting-coffeescript-to-javascript/coffee-react-deprecated.png)

Recently, there has been an explosion of excellent tools in the javascript community that make development faster, safer, and less error prone.

* _[ESLint](http://eslint.org)_ : ostensibly a tool for maintaining consistent coding style, but through the magic of static analysis it can also [catch obvious bugs](http://eslint.org/docs/rules/no-dupe-keys), and warn about [unused dependencies or dead code](http://eslint.org/docs/rules/no-unused-vars).
* _[React Codemod](https://github.com/reactjs/react-codemod)_ : Code mods are tools that use static analysis to intelligently transform code.  For example, in the react ecosystem there are a great set of code mods that make it easier to upgrade to new versions of react [that have breaking API changes](https://github.com/reactjs/react-codemod#react-to-react-dom) or to [quickly migrate to a different testing framework](https://facebook.github.io/jest/docs/migration-guide.html#jest-codemods) .
* _[Flow](https://flowtype.org)_ :  a static type checker for javascript.

I believe that this disparity will only grow larger over time. According to [The State of
Javascript](http://2016.stateofjs.com/2016/flavors/) survey, only **6%** of
responders that have used coffeescript before said that they would consider using it again.

![](/img/posts/converting-coffeescript-to-javascript/survey.png)


## A strategy for conversion
It was clear from the beginning of this process that it would not be wise to
convert the entire codebase at once. A top to bottom rewrite would take too
much time out of our roadmap and would have the potential to create too many bugs, and
too much instability. Instead we opted for a gradual conversion policy.  We require that
all new modules must be written in javascript. Any existing coffeescript files
should be converted if a developer is planning on making any significant
changes to it. Fortunately [webpack](https://webpack.github.io) makes it easy
to have a mixed language codebase [by adding loaders for each file
type](https://webpack.js.org/loaders/) .

```
// ... webpack.config.js
module: {
  loaders: [
    // coffeescript
    { test: /\.coffee$/, loader: 'coffee' },

    // coffee-react
    { test: /\.cjsx$/, loaders: ['coffee', 'cjsx'] },

	  // javascript files
    { test: /\.jsx?$/, loader: 'babel' },
  ]
}
```

This strategy is not without its drawbacks. Combining a file conversion with
logic changes can make code review much more cumbersome. The file will be so
drastically different that git's diffing algorithm almost certainly won't be able to see the
individual code changes. The diff will simply appear as though we deleted a coffeescript file and
replaced it with a javascript one. We don't currently have a good solution around this, so
sometimes it is preferable to convert the file on a different branch prior to
any logic changes in order to have the conversion code reviewed separately.

## Tracking progress and picking battles
In order to speed the conversion process we sometimes just take the time to
convert some coffeescript files. When doing this it helps to have a running hit
list of the work that still needs to be done. A simple shell command can
accomplish this:

```
› wc -l js/**/*.(coffee|cjsx) | sort
```

This command finds all the files in a directory, sorts them by line count, and
prints the line count for each file plus the total line count for all
remaining coffeescript in the codebase.

![](/img/posts/converting-coffeescript-to-javascript/list-coffeescript-files.png)

Using this as our hit list we can break off manageable chunks to convert on
a regular basis. We like to start at the top of the list with the smallest files
and work our way down. Not that we are afraid of the 600 line
`filter_bar_input.cjsx` or anything like that. It is just that it’s possible
that some of the larger files could get broken out and refactored as part of
normal feature work, and therefore become less complicated before we
ever have to worry about them.

## Tools for automating the conversion

Converting a large codebase can be slow and error prone when done manually.
Thankfully there are tools that can help. The best we have used is the amazing
and aptly named project [decaffeinate](http://decaffeinate-project.org) .

![](/img/posts/converting-coffeescript-to-javascript/decaffeinate.png)

Decaffeinate will convert coffeescript files to javascript, but unlike the
normal coffeescript compiler which is intended to generate ES5 code ready for
browser consumption, decaffeinate's purpose is to convert coffeescript source
code into idiomatic ES6 source code. The resulting code is intended to be later processed by
something like [babel](http://babeljs.io/) when shipping to production.

Unfortunately in our case decaffeinate does not support JSX.

![](/img/posts/converting-coffeescript-to-javascript/cjsx-parse-error.png)


![](/img/posts/converting-coffeescript-to-javascript/unclosed-regex.png)

In order to make this work we can use [coffee-react-transform](https://github.com/jsdf/coffee-react-transform) on the file to convert the JSX to plain coffeescript before piping it into decaffeinate:

```
> cjsx-transform js/dashboard/components/severity_indicator.cjsx | decaffeinate > js/dashboard/components/severity_indicator.jsx
```

This will produce nice, mostly idiomatic ES6 code:

```javascript
import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import classNames from "classnames";
import TooltipBasic from "components/tooltip_basic";

export default React.createClass({
  displayName: "SeverityIndicator",

  mixins: [PureRenderMixin],

  propTypes: {
    severity: React.PropTypes.string,
    className: React.PropTypes.string
  },

  severity() {
    return this.props.severity || "error";
  },

  render() {
    return React.createElement(TooltipBasic, React.__spread({"content": (this.severity().capitalize())}, this.props),
      React.createElement("div", {"className": (classNames("SeverityIndicator", `SeverityIndicator--${this.severity()}`))},
        React.createElement("svg", {"viewBox": "0 0 100 100"},
          React.createElement("circle", {"cx": "50", "cy": "50", "r": "40"})
        )
      )
    );
  }
});
```

The reason I say “mostly idiomatic” is because we would like to continue using JSX rather than all those  `React.createElement` calls. Now that the file is written in javascript though, we can take advantage of the excellent [react codemod tool](https://github.com/reactjs/react-codemod#create-element-to-jsx) mentioned earlier.

```
> jscodeshift -t react-codemod/transforms/create-element-to-jsx.js js/dashboard/components/severity_indicator.jsx
```

Now, our CJSX has been converted to JSX.

```javascript
  render() {
    return <TooltipBasic content={this.severity().capitalize()} {...this.props}>
      <div
        className={classNames("SeverityIndicator", `SeverityIndicator--${this.severity()}`)}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
    </TooltipBasic>;
  }
```

Most of the work is already done, but this process alone often has problems with properly formatting large chunks of JSX, often placing it on one long unreadable line. To improve the formatting we can use a tool called [prettier](https://github.com/jlongster/prettier) to reformat our JSX file.

```
> prettier --write js/dashboard/components/severity_indicator.jsx
```

```javascript
import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import classNames from "classnames";
import TooltipBasic from "components/tooltip_basic";

export default React.createClass({
  displayName: "SeverityIndicator",
  mixins: [PureRenderMixin],
  propTypes: {
    severity: React.PropTypes.string,
    className: React.PropTypes.string
  },
  severity() {
    return this.props.severity || "error";
  },
  render() {
    return (
      <TooltipBasic content={this.severity().capitalize()} {...this.props}>
        <div
          className={classNames(
            "SeverityIndicator",
            `SeverityIndicator--${this.severity()}`
          )}
        >
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
      </TooltipBasic>
    );
  }
});
```

After formatting, all that's left are a few warnings from eslint.

![](/img/posts/converting-coffeescript-to-javascript/lint-warnings.png)

Fortunately eslint has a nice feature where it can automatically fix a lot of these smaller nitpick issues and force the file to match our coding style.

```
› eslint --fix js/dashboard/components/severity_indicator.jsx
```

Now there’s only one problem left that is easy to fix.

![](/img/posts/converting-coffeescript-to-javascript/lint-warnings-after-fix.png)

## Even simpler with  `Depercolator`
This process has already been much faster and safer than manual conversion, but it would be nice if we didn’t have run all these commands separately. That’s why we have created a tool that combines all these steps into a single command.

```
> npm install -g depercolator
> depercolate js/dashboard/components/severity_indicator.cjsx
```

![](/img/posts/converting-coffeescript-to-javascript/depercolate-complete.png)

## Common pitfalls to watch out for when converting
This process isn’t perfect and it is essential to review and test the code after the conversion is complete. There are a few common issues that will likely come up:

### Unnecessary `return` statements
Coffeescript uses implicit return statements. This means that the last statement of any function is returned by that function.

```coffeescript
{
handleButtonPress: ->
  @setState({ enabled: true }) # this line is returned
}
```

The `decaffeinate` tool attempts to be as safe as possible and can’t make
assumptions about your intentions. In order to maintain the same function
signature, decaffeinate has to turn these implicit returns into explicit ones
that are often completely unnecessary.

```javascript
{
  handleButtonPress() {
    return this.setState({ enabled: true });
  }
}
```

It is important to take care when removing these return statements that nothing
is relying on the return value. One common source of bugs comes from converting
coffeescript code that implicitly returns a promise:

```coffeescript
loadData = ->
  Api.fetch('projects').then(displayData)
```

It might be easy to incorrectly assume that this function is a simple command and that the
return value is unimportant, but there could be some dependent code that is
using the result of that promise:

```coffeescript
loadData().catch (error) ->
  Bugsnag.notify(error)
```

### The `__guard__` function
As I said earlier javascript has no [Existential operator](http://coffeescript.org/#existential-operator). To replicate this behavior decaffeinate uses a generated helper function called `__guard__`:

```coffeescript
# coffescript
message = response?.responseJSON?.errors?.join(', ')
```

```javascript
// javascript
let message = __guard__( __guard__(__guard__(response, x3 => x3.responseJSON), x2 => x2.errors), x1 => x1.join(", "));

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined;
}
```

This works but is definitely not pretty (probably as a signal that it should be
removed and rewritten). At Bugsnag we use [lodash](https://lodash.com/) which has a function called
[`get`](https://lodash.com/docs/#get) that can accomplish something similar:

```javascript
let message = _.get(response, 'responseJSON.errors', []).join(', ')
```

## The ongoing battle
Keeping a codebase up to date is a constant struggle. Technologies change,
become deprecated, or fall out of use, often necessitating painful and time
consuming rewrites. However the process is becoming easier. By migrating to
a more popular and standardized platform we can have greater confidence that
when the next migration is required, the path will already have been well worn
by others. Furthermore, the trend toward much more explicit coding styles makes
it easier to develop advanced tooling that can automate the tasks that used to
be much more manual.

---

__Christian is a senior front-end engineer at [Bugsnag](https://www.bugsnag.com/). Bugsnag automatically
monitors your [applications](https://docs.bugsnag.com/platforms/) for harmful errors and alerts you to them, giving
you visibility into the stability of your software. Take action on application errors
so you can fix bugs impacting your users.__
