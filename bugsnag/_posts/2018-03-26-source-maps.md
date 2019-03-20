---
layout: post
title: Anatomy of source maps
publish_date: March 26th, 2018
author_name: Ben Gourley
author_twitter: bengourley
author_avatar: beng
excerpt: Source maps help you debug errors in your JavaScript code by mapping minified code to your original source. Learn how source maps work by examining their inner workings through examples.
categories: engineering
hero_image: anatomy-of-sourcemaps.png
cover_image: anatomy-of-sourcemaps-cover.png
---

> This blog is first in a two-part series on JavaScript debugging. Learn about the inner workings of JavaScript source maps with code examples. Or, check out part two and read about the [Anatomy of a JavaScript error](https://blog.bugsnag.com/anatomy-of-a-javascript-error/). 

Source maps are a cornerstone of modern JS and CSS development. When things are ticking along smoothly, it's easy to overlook how crucial a role they play. If you've ever had a source map go wrong on you, it quickly exposes the complexity that, most of a time, they keep a lid on.

Have you ever wondered what they are for or how they work? What the content of a source map looks like? And – if you've opened one up – what on Earth the `"…GACxB,IAAMC,GAAUD,EAAGE,SAInB…"` mappings mean? If so, hold on to your hats!

## The many transformations of JavaScript

These days, it's rare that the code you read and write in your editor is what makes it into a browser. Transformations can include:

#### Concatenation and minification

Concatenating assets – joining the contents of multiple files into one – reduces the number of network requests required to serve the content.

The process of minifying, also known as "uglification", reduces the number of bytes required to transfer the content over the network. This process can involve renaming local variables to shorter identifiers, replacing constant expressions with their calculated result, stripping all whitespace, and other complex optimizations.

People typically use [Uglify](https://github.com/mishoo/UglifyJS2) for minification.

#### Module resolution

Separating code into manageable chunks is a technique that has been available to most respectable languages since their inception. JS, however, doesn't provide a way (yet) to import code from other places, so this problem is solved by tooling.

[Browserify](http://browserify.org/) led the way on this front, mimicking Node.js's [commonjs](http://wiki.commonjs.org/wiki/Modules/1.1.1)-ish `require()` functionality, and more recently [Webpack](https://webpack.js.org/) arrived, which supports node-style `require()` along with the new ES module `import` spec.

#### Using new (or extended) JS features

As the JS spec has evolved, using a more modern version of JS than is supported by your audience's browsers has become commonplace. Newer features of the language allow more robust, terse, and reasonable solutions so engineers are understandably keen to use them, but this requires a transformation.

Likewise, Facebook's [JSX extension](https://reactjs.org/docs/introducing-jsx.html) – adding syntax for constructing DOM-like structures in React applications – is a widely used feature that **no** browser supports.

[Babel](https://babeljs.io/) is the most commonly used tool for transforming different "flavours" of JS into a more compatible form.

#### Writing in a totally different language

Finally, there's a whole genre of program languages whose raison d'être is to compile to JS – [Elm](http://elm-lang.org/), [CoffeeScript](http://coffeescript.org/), [TypeScript](https://www.typescriptlang.org/), [PureScript](http://www.purescript.org/), to name a few.

## Debugging JavaScript errors using source maps

All of these transformations facilitate better ways of __writing__ code. But what happens when you run it, and something doesn't go as expected? What happens when you're tasked with investigating some erroneous condition, or worse, in code you're not 100% familiar with?

__An example error:__

![A stacktrace originating from a minified file](/img/posts/source-map-error-min-location.png)

__The location points somewhere inside this file:__

![A minified file](/img/posts/source-map-minified-file.png)

😩

When faced with a wall of minified code that bears little resemblance to anything in your editor, the task of stepping through or finding the cause of anything can be overwhelmingly tricky…

__Here's where source maps come in__. Essentially a source map allows you to answer the question:

> Given the `line/col` location in this generated code, in which `file` and at what `line/col` did it originate?

## What’s in a source map?

The first iteration of the source map format was created for use in [Closure Inspector](https://code.google.com/archive/p/closure-inspector/), to aid with the debugging of obfuscated JS output from [Closure Compiler](https://developers.google.com/closure/compiler/). Now, the format is on its [third major revision](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?usp=sharing), jointly authored by representatives from Google and Mozilla.

The file's format is JSON. Here's a trimmed, annotated, real example from the [`bugsnag-js`](https://github.com/bugsnag/bugsnag-js) package:


```yaml
# This is an example source map. Note that source maps are JSON, so comments *aren't* usually allowed!
{
   # "version"
   # Declares which version of the source map spec is being used, like a <!DOCTYPE> in html.
  "version": 3,

  # "sources"
  # A list of input source files that were used to generate the output.
  "sources": [
    "base/lib/es-utils.js",
    "node_modules/stackframe/stackframe.js",
    "base/client.js",
    "base/plugins/throttle.js",
    "browser/plugins/device.js",
    "browser/plugins/inline-script-content.js",
    # … the actual list is a lot longer than this, but the rest is omitted for brevity…
  ],

  # "names"
  # A list of identifiers used in the source code which were changed in or removed from the output.
  "names": [
    "schema", "apiKey", "defaultValue", "message", "validate" #…
  ],

  # "mappings"
  # This is the clever bit! These comma and semi-colon separated values are base64-encoded VLQ
  # values that point from every position in the output back to positions in the input sources.
  "mappings": "CAAA,SAAAA,GAAA,GAAA,iBAAAC,SAAA,…",

  # "sourcesContent"
  # This optional field can include the original source content for each file in
  # the "sources" property. This option should only be omitted if the tool using
  # the source map can retrieve the sources via url or from the filesystem.
  "sourcesContent": [
    "(function(f){if(typeof exports===\"object\"&&typeof…",
    "/*\n * Leaves breadcrumbs when the user interacts…",
    "module.exports = stringify\nstringify.default…",
    "// minimal implementations of useful ES functionality…",
    "const { isoDate } = require('./lib/es-utils')…",
    "const { filter, reduce, keys, isArray } =…",
    "module.exports = client =>\n  client.app &&…",
    "(function(root, factory) {\n    'use strict';…",
    "const ErrorStackParser = require('error-stack-parser')…",
    "/**\n * cuid.js\n * Collision-resistant UID generator…",
    "const config = require('./config')\nconst BugsnagReport…",
    "const positiveIntIfDefined = require('../lib/positive-int-check')…",
    "module.exports = {\n  releaseStage: {\n…",
    # ……
  ],

  # Some optional fields that are not used in this example…

  # "sourceRoot"
  # A prefix to add to each entry in the "sources" property when looking them up
  # on the network/disk.
  "sourceRoot": "/path/to/static/assets",

  # "file"
  # The name of the file this source map is for.
  "file": "bugsnag.min.js"
}
```

Hopefully, most aspects of the file make a lot of sense. Obviously, if it's being sent over the network, there'll be no pretty whitespace and there definitely wouldn't be any comments, but the JSON has some sensibly named properties that don't require a ton of head-scratching – except, that is, for the `"mappings"` key.

In short, `"mappings"` is a list of pointers to entries in the `"sources"` and `"names"` arrays for every "segment" in every line of the generated file. Each segment is separated by a comma `,` and each line is separated by a semi-colon `;`. "Segment" – a rather vague term – refers to any parts of the line that can be mapped back to some original source: identifiers, operators, function calls, etc.

As you might imagine, this information can take up a lot of space; in previous versions of source maps, the map file could end up being around 10x the size of the mapped file! So in version 3, a format was introduced – Base64 VLQs – which is heavily optimized for space-saving.

There is an excellent explanation of the Base64 VLQ format on [HTML5 Rocks](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-base64vlq) if you want to understand the full strategy behind this encoding, but here we're going to concentrate on a few examples where the mappings have been decoded and vaguely make sense to humans.

I've replaced the `"mappings"` property with content in the format below:

```
"mappings": {
  "0": [
   ^
   └── the line number of the output file

    "231 => source.js 5:64 foo"
      ^        ^       ^    ^
      │        │       │    └── the symbol name from the source file
      │        │       │
      │        │       └── the line:column position in the source file
      │        │
      │        └── the name of the source file
      │
      └── the column number of the output file

  ]
}
```

<small>[Here's the code I used to do this](https://gist.github.com/bengourley/c3c62e41c9b579ecc1d51e9d9eb8b9d2).</small>

### Examining a source map from minification (UglifyJS)

First up we need some code. Here's a function I wrote as part of a library that maintains the score during a tennis match:

```js
function incrementSet (state, scorer, nonScorer) {
  scorer.games++
  var currentSet = state.players[PLAYER].sets + state.players[OPPONENT].sets
  if (!state.completedSets[currentSet]) state.completedSets[currentSet] = []
  state.completedSets[currentSet][PLAYER] = scorer.isPlayer ? scorer.games : nonScorer.games
  state.completedSets[currentSet][OPPONENT] = scorer.isPlayer ? nonScorer.games : scorer.games
  scorer.games = 0
  nonScorer.games = 0
  scorer.sets = scorer.sets + 1
  state.isFinalSet = scorer.sets + nonScorer.sets === state.config.numSets - 1
  if (scorer.sets > state.config.numSets - scorer.sets) state.isComplete = true
}
```

When you compress this function using Uglify, you get the following minified code and the accompanying source map:

```js
function incrementSet(e,s,t){s.games++;var m=e.players[PLAYER].sets+e.players[OPPONENT].sets;e.completedSets[m]||(e.completedSets[m]=[]),e.completedSets[m][PLAYER]=s.isPlayer?s.games:t.games,e.completedSets[m][OPPONENT]=s.isPlayer?t.games:s.games,s.games=0,t.games=0,s.sets=s.sets+1,e.isFinalSet=s.sets+t.sets===e.config.numSets-1,s.sets>e.config.numSets-s.sets&&(e.isComplete=!0)}
```

```yaml
{
  "version": 3,
  "sources": [ "score.js" ],
  "names": [
    "incrementSet", "state", "scorer", "nonScorer", "games", "currentSet",
    "players", "PLAYER", "sets", "OPPONENT", "completedSets", "isPlayer",
    "isFinalSet", "config", "numSets", "isComplete"
  ],
  "mappings": {
    "1": [
      "1 => score.js 1:1 incrementSet",
      "10 => score.js 1:10 incrementSet",
      "23 => score.js 1:24 state",
      "25 => score.js 1:31 scorer",
      "27 => score.js 1:39 nonScorer",
      "30 => score.js 2:3 scorer",
      "32 => score.js 2:10 games",
      "40 => score.js 3:3 games",
      "44 => score.js 3:7 currentSet",
      "46 => score.js 3:20 state",
      "48 => score.js 3:26 players",
      "56 => score.js 3:34 PLAYER",
      "64 => score.js 3:42 sets",
      "69 => score.js 3:49 state",
      # SNIP! Truncated for brevity.
    ]
  }
}
```

Say we load the minified file and call `incrementSet()` with no arguments, we get an error message like `TypeError: Cannot read property 'games' of undefined` and the position would be reported as line 1, column 30.

Referencing the decoded mappings, we can see what line 1, column 30 maps to:

```
"30 => score.js 2:3 scorer"
```

Comparing the output file versus the original:

```
# Output file                                 # Original file

function incrementSet(e,s,t){s.games++;var    scorer.games++
                             ^                ^
 This is line 1, column 30  ─┘                └─ This is line 2, column 3
```

This makes total sense – we're trying to increment `scorer.games` but because we didn't pass in any arguments, `scorer` is `undefined`.

As you can see, the positional information from the mappings also includes the original name of the object it was trying to modify – `scorer` – which we can see was transformed to `s`.

### Examining a source map from compiling TypeScript

Sticking with the tennis-themed examples, (guess what this author's favourite sport is?), here's a fledgling TypeScript program:

```typescript
import { Score, Player, nextState } from './utils';

export class Match {
  public score: Score;

  constructor() {
    this.score = new Score();
  }

  public addPoint(p: Player): Score {
    this.score = nextState(this.score, p);
    return this.score;
  }
}
```

After the TypeScript is compiled, you get the following JS and its accompanying source map:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Match = (function () {
    function Match() {
        this.score = new utils_1.Score();
    }
    Match.prototype.addPoint = function (p) {
        this.score = utils_1.nextState(this.score, p);
        return this.score;
    };
    return Match;
}());
exports.Match = Match;
```

```yaml
{
  "version": 3,
  "file": "index.js",
  "sources": [ "index.ts" ],
  "names": [],
  "mappings": {
    "1": [ "" ],
    "2": [ "" ],
    "3": [
      "1 => index.ts 1:1", "34 => index.ts 1:52"
    ],
    "4": [
      "1 => index.ts 3:1"
    ],
    "5": [
      "5 => index.ts 6:3"
    ],
    "6": [
      "9 => index.ts 7:5", "13 => index.ts 7:9", "14 => index.ts 7:10",
      "19 => index.ts 7:15", "22 => index.ts 7:18", "26 => index.ts 7:22",
      "39 => index.ts 7:27", "41 => index.ts 7:29", "42 => index.ts 7:30"
    ],
    "7": [
      "5 => index.ts 8:3", "6 => index.ts 8:4"
    ],
    "8": [
      "5 => index.ts 10:10", "29 => index.ts 10:18", "32 => index.ts 10:3",
      "42 => index.ts 10:19", "43 => index.ts 10:28"
    ],
    "9": [
      "9 => index.ts 11:5", "13 => index.ts 11:9", "14 => index.ts 11:10",
      "19 => index.ts 11:15", "22 => index.ts 11:18", "39 => index.ts 11:27",
      "40 => index.ts 11:28", "44 => index.ts 11:32", "45 => index.ts 11:33",
      "50 => index.ts 11:38", "52 => index.ts 11:40", "53 => index.ts 11:41",
      "54 => index.ts 11:42", "55 => index.ts 11:43"
    ],
    "10": [
      "9 => index.ts 12:5", "15 => index.ts 12:11", "16 => index.ts 12:12",
      "20 => index.ts 12:16", "21 => index.ts 12:17", "26 => index.ts 12:22",
      "27 => index.ts 12:23"
    ],
    "11": [
      "5 => index.ts 13:3", "6 => index.ts 13:4"
    ],
    "12": [
      "5 => index.ts 14:1", "17 => index.ts 14:2"
    ],
    "13": [
      "1 => index.ts 14:1", "2 => index.ts 14:2", "2 => index.ts 3:1",
      "6 => index.ts 14:2"
    ],
    "14": [
      "1 => index.ts 3:14", "23 => index.ts 3:19"
    ]
  }
}
```

One thing of note here is that the first two lines in the mappings have no location in the original source:


```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
```

The TypeScript compiler adds these lines of preamble to any module and they bear no relation to anything we wrote, so there's nothing to map.

Looking at the JS output, where did the last line `exports.Match = Match;` come from? That doesn't look like anything we wrote at the end of our `.ts` file…

```
"14": [
  "1 => index.ts 3:14", "23 => index.ts 3:19"
]
```

So it came from near the start of our source file…

```
export class Match {
             ^
             └── This is line 3, column 14
```

There we are! TypeScript translates the static `import/export` statements into imperative node-style `require()` calls and `exports` assignments – two entirely different ways of managing modules with different constraints on order, meaning that the `exports` assignment happens at the end.

This example hints at how powerful source maps can be. In the minification example, the transformed output still roughly resembled the input source, especially in terms of order. In a small example like that, debugging without source maps seems remotely doable.

In this TypeScript example, however, the source map tracked something we wrote near the start of the input which appeared near the end of the output. With lots of source code, transformations like this would quickly get out of hand, and having a tool at our disposal to track it for us is crucial.

### Examining a future JS source map

Finally, here's an example of a JS program written using features from ES6/7 and beyond:

- default function parameters
- classes
- array destructuring
- arrow functions
- object rest/spread
- `const`/`let` declarations

In order to make this program run in most browsers, we compile it to ES5 using [Babel](https://babeljs.io/).

```javascript
const createScoreboard = (playerA = 'Player A', playerB = 'Player B') => ({
  names: [ playerA, playerB ],
  games: [ 0, 0 ],
  sets: [ 0, 0 ],
  points: [ 0, 0 ]
})

const nextScoreboard = (score, scoreboard = createScoreboard()) => {
  // all the tricky logic goes here
}

document.querySelector('button#start', () => {
  const renderer = new MatchRenderer()
  let score = [ 0, 0 ]
  let scoreboard = nextScoreboard(score)
  renderer.update(scoreboard)

  // When the button to increment player A's point gets pressed,
  // increment their score and then update the scoreboard
  document.querySelector('button#player-a-point', () => {
    const [ a, b ] = score
    score = [ a + 1, b ]
    scoreboard = nextScoreboard(score, scoreboard)
    renderer.render()
  })

  // Do the same for player B
  document.querySelector('button#player-b-point', () => {
    const [ a, b ] = score
    score = [ a, b + 1 ]
    scoreboard = nextScoreboard(score, scoreboard)
    renderer.render(scoreboard)
  })
})

class MatchRenderer {
  constructor () {
    this.viewData = {
      date: new Date(),
      matchId: Math.random(),
      tournament: 'Bugsnag Masters'
    }
  }
  update (state) {
    updateDOM({ ...this.viewData, ...state })
  }
}
```

Here's the compiled version:

```javascript
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createScoreboard = function createScoreboard() {
  var playerA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Player A';
  var playerB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Player B';
  return {
    names: [playerA, playerB],
    games: [0, 0],
    sets: [0, 0],
    points: [0, 0]
  };
};

var nextScoreboard = function nextScoreboard(score) {
  // all the tricky logic goes here

  var scoreboard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createScoreboard();
};

document.querySelector('button#start', function () {
  var renderer = new MatchRenderer();
  var score = [0, 0];
  var scoreboard = nextScoreboard(score);
  renderer.update(scoreboard);

  // When the button to increment player A's point gets pressed,
  // increment their score and then update the scoreboard
  document.querySelector('button#player-a-point', function () {
    var _score = score,
        _score2 = _slicedToArray(_score, 2),
        a = _score2[0],
        b = _score2[1];

    score = [a + 1, b];
    scoreboard = nextScoreboard(score, scoreboard);
    renderer.render();
  });

  // Do the same for player B
  document.querySelector('button#player-b-point', function () {
    var _score3 = score,
        _score4 = _slicedToArray(_score3, 2),
        a = _score4[0],
        b = _score4[1];

    score = [a, b + 1];
    scoreboard = nextScoreboard(score, scoreboard);
    renderer.render(scoreboard);
  });
});

var MatchRenderer = function () {
  function MatchRenderer() {
    _classCallCheck(this, MatchRenderer);

    this.viewData = {
      date: new Date(),
      matchId: Math.random(),
      tournament: 'Bugsnag Masters'
    };
  }

  _createClass(MatchRenderer, [{
    key: 'update',
    value: function update(state) {
      updateDOM(_extends({}, this.viewData, state));
    }
  }]);

  return MatchRenderer;
}();
```

And its accompanying source map:

```yaml
{
  "version": 3,
  "sources": [ "tennis.js" ],
  "names": [
    "createScoreboard", "playerA", "playerB", "names", "games", "sets", "points",
    "nextScoreboard", "score", "scoreboard", "document", "querySelector", "renderer",
    "MatchRenderer", "update", "a", "b", "render", "viewData", "date", "Date", "matchId",
    "Math", "random", "tournament", "state", "updateDOM"
  ],
  "mappings": {
    "1": [ "" ],
    "2": [ "" ],
    "3": [ "" ],
    "4": [ "" ],
    "5": [ "" ],
    "6": [ "" ],
    "7": [ "" ],
    "8": [ "" ],
    "9": [ "" ],
    "10": [ "" ],
    "11": [
      "1 => tennis.js 1:1 createScoreboard", "5 => tennis.js 1:7 createScoreboard",
      "24 => tennis.js 1:26 createScoreboard", "33 => tennis.js 1:7 createScoreboard",
      "49 => tennis.js 1:26 createScoreboard"
    ],
    "12": [
      "1 => tennis.js 1:26 createScoreboard", "7 => tennis.js 1:27 playerA",
      "14 => tennis.js 1:26 playerA", "85 => tennis.js 1:37 playerA",
      "95 => tennis.js 1:26 playerA"
    ],
    "13": [
      "1 => tennis.js 1:26 playerA", "7 => tennis.js 1:49 playerB",
      "14 => tennis.js 1:26 playerB", "85 => tennis.js 1:59 playerB",
      "95 => tennis.js 1:26 playerB"
    ],
    "14": [
      "1 => tennis.js 1:26 playerB", "10 => tennis.js 1:75 playerB"
    ],
    "15": [
      "1 => tennis.js 2:3 names", "12 => tennis.js 2:10 names",
      "13 => tennis.js 2:12 playerA", "20 => tennis.js 2:10 playerA",
      "22 => tennis.js 2:21 playerB", "29 => tennis.js 2:10 playerB",
      "30 => tennis.js 1:75 playerB"
    ],
    "16": [
      "1 => tennis.js 3:3 games", "12 => tennis.js 3:10 games",
      "13 => tennis.js 3:12 games", "14 => tennis.js 3:10 games",
      "16 => tennis.js 3:15 games", "17 => tennis.js 3:10 games",
      "18 => tennis.js 1:75 games"
    ],
    "17": [
      "1 => tennis.js 4:3 sets", "11 => tennis.js 4:9 sets",
      "12 => tennis.js 4:11 sets", "13 => tennis.js 4:9 sets",
      "15 => tennis.js 4:14 sets", "16 => tennis.js 4:9 sets",
      "17 => tennis.js 1:75 sets"
    ],
    "18": [
      "1 => tennis.js 5:3 points", "13 => tennis.js 5:11 points",
      "14 => tennis.js 5:13 points", "15 => tennis.js 5:11 points",
      "17 => tennis.js 5:16 points", "18 => tennis.js 5:11 points"
    ],
    "19": [
      "1 => tennis.js 1:75 points", "4 => tennis.js 1:26 points"
    ],
    "20": [
      "1 => tennis.js 1:26 points", "2 => tennis.js 1:1 points"
    ],
    "21": [ "" ],
    "22": [
      "1 => tennis.js 8:1 points", "5 => tennis.js 8:7 nextScoreboard",
      "22 => tennis.js 8:24 nextScoreboard", "31 => tennis.js 8:7 nextScoreboard",
      "45 => tennis.js 8:24 nextScoreboard", "46 => tennis.js 8:25 score",
      "51 => tennis.js 8:24 score", "53 => tennis.js 8:68 score"
    ],
    "23": [
      "1 => tennis.js 9:3 score"
    ],
    "24": [ "" ],
    "25": [
      "1 => tennis.js 8:68 score", "7 => tennis.js 8:32 scoreboard",
      "17 => tennis.js 8:68 scoreboard", "88 => tennis.js 8:45 createScoreboard",
      "106 => tennis.js 8:68 createScoreboard"
    ],
    "26": [
      "1 => tennis.js 10:2 createScoreboard", "2 => tennis.js 8:1 createScoreboard"
    ],
    "27": [ "" ],
    "28": [
      "1 => tennis.js 12:1 document", "10 => tennis.js 12:10 querySelector",
      "23 => tennis.js 12:1 querySelector", "24 => tennis.js 12:24 querySelector",
      "38 => tennis.js 12:1 querySelector", "40 => tennis.js 12:40 querySelector",
      "52 => tennis.js 12:46 querySelector"
    ],
    "29": [
      "1 => tennis.js 13:3 querySelector", "7 => tennis.js 13:9 renderer",
      "18 => tennis.js 13:20 renderer", "22 => tennis.js 13:24 MatchRenderer",
      "35 => tennis.js 13:20 MatchRenderer", "37 => tennis.js 13:3 MatchRenderer"
    ],
    "30": [
      "1 => tennis.js 14:3 MatchRenderer", "7 => tennis.js 14:7 score",
      "15 => tennis.js 14:15 score", "16 => tennis.js 14:17 score",
      "17 => tennis.js 14:15 score", "19 => tennis.js 14:20 score",
      "20 => tennis.js 14:15 score", "21 => tennis.js 14:3 score"
    ],
    "31": [
      "1 => tennis.js 15:3 score", "7 => tennis.js 15:7 scoreboard",
      "20 => tennis.js 15:20 nextScoreboard", "35 => tennis.js 15:35 score",
      "40 => tennis.js 15:20 score", "41 => tennis.js 15:3 score"
    ],
    "32": [
      "1 => tennis.js 16:3 renderer", "12 => tennis.js 16:12 update",
      "18 => tennis.js 16:3 update", "19 => tennis.js 16:19 scoreboard",
      "29 => tennis.js 16:3 scoreboard"
    ],
    "33": [ "" ],
    "34": [
      "1 => tennis.js 18:3 scoreboard"
    ],
    "35": [
      "1 => tennis.js 19:3 scoreboard"
    ],
    "36": [
      "1 => tennis.js 20:3 document", "12 => tennis.js 20:12 querySelector",
      "25 => tennis.js 20:3 querySelector", "26 => tennis.js 20:26 querySelector",
      "49 => tennis.js 20:3 querySelector", "51 => tennis.js 20:51 querySelector",
      "63 => tennis.js 20:57 querySelector"
    ],
    "37": [
      "1 => tennis.js 20:57 querySelector", "18 => tennis.js 21:22 score",
      "23 => tennis.js 20:57 score"
    ],
    "38": [
      "1 => tennis.js 20:57 score"
    ],
    "39": [
      "1 => tennis.js 20:57 score", "9 => tennis.js 21:13 a",
      "10 => tennis.js 20:57 a"
    ],
    "40": [
      "1 => tennis.js 20:57 a", "9 => tennis.js 21:16 b",
      "10 => tennis.js 20:57 b"
    ],
    "41": [ "" ],
    "42": [
      "1 => tennis.js 22:5 score", "13 => tennis.js 22:13 score",
      "14 => tennis.js 22:15 a", "18 => tennis.js 22:19 a",
      "19 => tennis.js 22:13 a", "21 => tennis.js 22:22 b",
      "22 => tennis.js 22:13 b", "23 => tennis.js 22:5 b"
    ],
    "43": [
      "1 => tennis.js 23:5 scoreboard", "18 => tennis.js 23:18 nextScoreboard",
      "33 => tennis.js 23:33 score", "38 => tennis.js 23:18 score",
      "40 => tennis.js 23:40 scoreboard", "50 => tennis.js 23:18 scoreboard",
      "51 => tennis.js 23:5 scoreboard"
    ],
    "44": [
      "1 => tennis.js 24:5 renderer", "14 => tennis.js 24:14 render",
      "20 => tennis.js 24:5 render"
    ],
    "45": [
      "1 => tennis.js 25:4 render", "4 => tennis.js 20:3 render"
    ],
    "46": [ "" ],
    "47": [
      "1 => tennis.js 27:3 render"
    ],
    "48": [
      "1 => tennis.js 28:3 document", "12 => tennis.js 28:12 querySelector",
      "25 => tennis.js 28:3 querySelector", "26 => tennis.js 28:26 querySelector",
      "49 => tennis.js 28:3 querySelector", "51 => tennis.js 28:51 querySelector",
      "63 => tennis.js 28:57 querySelector"
    ],
    "49": [
      "1 => tennis.js 28:57 querySelector", "19 => tennis.js 29:22 score",
      "24 => tennis.js 28:57 score"
    ],
    "50": [
      "1 => tennis.js 28:57 score"
    ],
    "51": [
      "1 => tennis.js 28:57 score", "9 => tennis.js 29:13 a",
      "10 => tennis.js 28:57 a"
    ],
    "52": [
      "1 => tennis.js 28:57 a", "9 => tennis.js 29:16 b",
      "10 => tennis.js 28:57 b"
    ],
    "53": [ "" ],
    "54": [
      "1 => tennis.js 30:5 score", "13 => tennis.js 30:13 score",
      "14 => tennis.js 30:15 a", "15 => tennis.js 30:13 a",
      "17 => tennis.js 30:18 b", "21 => tennis.js 30:22 b",
      "22 => tennis.js 30:13 b", "23 => tennis.js 30:5 b"
    ],
    "55": [
      "1 => tennis.js 31:5 scoreboard", "18 => tennis.js 31:18 nextScoreboard",
      "33 => tennis.js 31:33 score", "38 => tennis.js 31:18 score",
      "40 => tennis.js 31:40 scoreboard", "50 => tennis.js 31:18 scoreboard",
      "51 => tennis.js 31:5 scoreboard"
    ],
    "56": [
      "1 => tennis.js 32:5 renderer", "14 => tennis.js 32:14 render",
      "20 => tennis.js 32:5 render", "21 => tennis.js 32:21 scoreboard",
      "31 => tennis.js 32:5 scoreboard"
    ],
    "57": [
      "1 => tennis.js 33:4 scoreboard", "4 => tennis.js 28:3 scoreboard"
    ],
    "58": [
      "1 => tennis.js 34:2 scoreboard", "2 => tennis.js 12:1 scoreboard"
    ],
    "59": [ "" ],
    "60": [
      "5 => tennis.js 36:7 MatchRenderer", "18 => tennis.js 36:7 MatchRenderer"
    ],
    "61": [
      "1 => tennis.js 37:3 MatchRenderer", "28 => tennis.js 37:18 MatchRenderer"
    ],
    "62": [
      "1 => tennis.js 37:18 MatchRenderer"
    ],
    "63": [
      ""
    ],
    "64": [
      "1 => tennis.js 38:5 MatchRenderer", "10 => tennis.js 38:10 viewData",
      "18 => tennis.js 38:5 viewData", "21 => tennis.js 38:21 viewData"
    ],
    "65": [
      "1 => tennis.js 39:7 date", "13 => tennis.js 39:13 date",
      "17 => tennis.js 39:17 Date", "21 => tennis.js 39:13 Date",
      "23 => tennis.js 38:21 Date"
    ],
    "66": [
      "1 => tennis.js 40:7 matchId", "16 => tennis.js 40:16 Math",
      "21 => tennis.js 40:21 random", "27 => tennis.js 40:16 random",
      "29 => tennis.js 38:21 random"
    ],
    "67": [
      "1 => tennis.js 41:7 tournament", "19 => tennis.js 41:19 tournament"
    ],
    "68": [
      "1 => tennis.js 38:21 tournament", "6 => tennis.js 38:5 tournament"
    ],
    "69": [
      "1 => tennis.js 43:4 tournament"
    ],
    "70": [ "" ],
    "71": [ "" ],
    "72": [ "" ],
    "73": [
      "28 => tennis.js 44:11 state", "33 => tennis.js 44:11 state",
      "35 => tennis.js 44:18 state"
    ],
    "74": [
      "1 => tennis.js 45:5 updateDOM", "30 => tennis.js 45:20 updateDOM",
      "35 => tennis.js 45:25 viewData", "43 => tennis.js 45:5 viewData",
      "45 => tennis.js 45:38 state", "50 => tennis.js 45:5 state"
    ],
    "75": [
      "1 => tennis.js 46:4 state"
    ]
  }
}
```

Let's drill down into the interesting bits.

#### Default parameters

We can see some code on lines 12 and 13 that doesn't look like anything in the source:

```javascript
var playerA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Player A';
var playerB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Player B';
```

By looking this up in the mappings we can see where it originated:

```
"12": [
  "1 => tennis.js 1:26 createScoreboard", "7 => tennis.js 1:27 playerA",
  "14 => tennis.js 1:26 playerA", "85 => tennis.js 1:37 playerA",
  "95 => tennis.js 1:26 playerA"
],
"13": [
  "1 => tennis.js 1:26 playerA", "7 => tennis.js 1:49 playerB",
  "14 => tennis.js 1:26 playerB", "85 => tennis.js 1:59 playerB",
  "95 => tennis.js 1:26 playerB"
],
```

Both of these lines in the output stem from line 1 of our original source:

```
const createScoreboard = (playerA = 'Player A', playerB = 'Player B') => ({
                         ^^         ^           ^         ^
      columns:        26 ┘└ 27  37 ─┘       49 ─┘     59 ─┘
```

It's quite clear from these mappings how the default function parameters have been converted into something that works in environments that don't support this feature.

#### Array destructuring, rest/spread, classes

Like the TypeScript example, lines 1-10 are inserted by Babel. Again, these are created during the transformation, but are not directly related to parts of the input source so they do not map anywhere. When we look at what happened when we used array destructuring, the object spread operator and class syntax, we soon see why:

```
const [ a, b ] = score           =>   var _score = score,
                                          _score2 = _slicedToArray(_score, 2),
                                          a = _score2[0],
                                          b = _score2[1];
```

```
{ ...this.viewData, ...state }   =>   _extends({}, this.viewData, state);
```

```
class MatchRenderer {            =>   _createClass(MatchRenderer, [{
```

What Babel does here is a trade-off. It _would_ be possible to map the direct result of each transformation every time it swaps out a feature, as per the default parameters example. However, since that would output a larger file, it creates the helper functions you see in line 1-10 of the output. The usage of these functions can be mapped; for example, here's the mapping for the `_extends(…)` call:

```
"74": [
  "1 => tennis.js 45:5 updateDOM", "30 => tennis.js 45:20 updateDOM",
  "35 => tennis.js 45:25 viewData", "43 => tennis.js 45:5 viewData",
  "45 => tennis.js 45:38 state", "50 => tennis.js 45:5 state"
]
```

```
    updateDOM({ ...this.viewData, ...state })
    ^              ^    ^            ^
  5 ┘          20 ─┘    └─ 25        └─ 38
```

Since many places in the source can end up calling code inside the `_extends()`, `_slicedToArray()` or `_createClass()` helpers, there can be no definitive mapping. This is a limitation of the process.

## Source maps + Bugsnag

At Bugsnag, we care deeply about surfacing error reports in the most useful and actionable way. If you're shipping transformed JS, what use is it to see your stacktraces against that generated code? That's why we use source maps – to show stacktraces against the code you see in your editor.

The great news about the source map format, is that for the most part it's language agnostic. We've mostly covered JS being the target language here, but it is also commonly used for generated CSS. What this means is if you pick some new esoteric flavour of JS, or even some compile-to-JS language that we've never heard of, we've already got you*! Using the source map we can show you the original source for an error that happened in your generated JS.

<small>* Okay, you may not see perfect syntax highlighting!</small>

### How to tell Bugsnag about your source maps

There are two main routes you can take when you want to get source maps working with Bugsnag:

#### Self-hosting

The simplest way is to host your source maps alongside your bundled JS, then either:

- Include the `//# sourceMappingURL=` comment in your bundled JS. This is inserted automatically by most tools that generate source maps. We'll detect this once we've loaded the JS and go fetch the map if it exists.
- Set the `X-SourceMap` header when the bundled JS is served. When we receive an error that originates in your JS, we'll make a request to load it. We'll detect the `X-SourceMap` header and go fetch the map if it exists.

We'll always request the sources and maps from the same IPs, so with either of these options, if making your source maps public is not an option you can [whitelist our IPs](https://docs.bugsnag.com/platforms/browsers/source-maps/#access-through-firewall).

#### Uploading

You also have the option to upload your source maps directly to us. Depending on the tools you use you can do this at varying levels:

- [webpack-bugsnag-plugins](https://docs.bugsnag.com/build-integrations/webpack/#uploading-source-maps) allows you to upload your source maps directly from Webpack via our `BugsnagSourceMapUploaderPlugin` plugin.
- [bugsnag-sourcemaps](https://docs.bugsnag.com/build-integrations/js/#uploading-source-maps) allows you to upload your source maps from within a node process or via the command line.
- Alternatively you can hit our [source map API](https://docs.bugsnag.com/api/js-source-map-upload/#curl-example) directly.

## Fin.

If you made it this far, you're a veritable source map trooper. Hopefully you've a new found appreciation for the humble source map, and at the very least, you'll be able to impress your friends with your knowledge about `"mappings"`. Happy code transforming!

---

Try Bugsnag's [JavaScript error reporting](https://www.bugsnag.com/platforms/javascript/) or learn more in our [documentation](https://docs.bugsnag.com/platforms/browsers/).  


<script>
  [].forEach.call(document.querySelectorAll('.highlighter-rouge pre.highlight'), function (el) {
    el.style['overflow'] = 'auto' // code blocks should scroll when they get too big
    el.style['max-height'] = '600px' // in old browsers allow set fixed max height
    el.style['max-height'] = '50vh' // in modern browsers allow 50% of the viewport
  })
</script>
