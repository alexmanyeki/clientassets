---
layout: post
title: "Server-side rendering: how to serve authenticated content"
publish_date: Jan 31st, 2019
author_name: Ben Gourley
author_twitter: bengourley
author_avatar: beng
excerpt: Learn how server-side rendering works when dealing with authenticated users to render the correct content.   
categories: engineering
hero_image: server-side-rendering.png
cover_image: server-side-rendering-cover.png
---

Server-side rendering is a term banded around as a foolproof remedy to "thick" client-side applications. But in most examples you'll see, there's an elephant in the room.

Aside from the simplest of content websites, most applications require a user to be authenticated in order to see content tailored to them. Many server-side rendering tutorials tell you how to render on the server, but how do we render the *correct* content for each user?

For the purpose of this blog post, I'm going to use an imaginary meal delivery app called `feeed.mee`.

## What is server-side rendering?

As browser applications become more interactive and complex, view logic piles up on the front-end. Libraries such as [React](https://reactjs.org/), [Vue](https://vuejs.org/), and [Angular](https://angular.io/) were created because developers saw a need to create toolkits for dynamic user interfaces on the web, abstracting away solutions to common problems and making front-end codebases more manageable.

In a traditional web application, the server would render a complete-looking page. Most of the links and calls to action would result in another full page request to the server in order to render the new state. While there would usually be some JS on the page for interactive UI elements (such as a date picker), the majority of the UI rendering logic would exist on the server.

Contrast that with an application written using one of the frameworks I just mentioned: typically the server renders an empty page which includes a JS bundle, and that bundle contains all the rendering logic. __The user has to wait for that bundle to be delivered, parsed, and executed before they see any UI__.

For any reasonably complex application, this delay is noticeable. And when mobile devices – with their slow CPUs and unreliable networks – enter the fray, this inefficiency is exacerbated. Since using one of these frameworks is considered a *better way* of developing front-end applications, what can be done to mitigate this glaring problem?

The answer is __server-side rendering__. This is the practice of running the **front-end** view logic on the server so that it can render the initial state of the page and send that, rather than a page with no content.

This means the user sees actual content sooner, and the order of network requests happen in a more efficient way. A win for both **actual** and **perceived** performance.

## So the problem with authentication is what, exactly?

In a typical "single-page" client application, imagine the following scenario…

A logged in user returns to `app.feeed.mee/orders` to check the status of their current order. The server responds with something like:

```
<!DOCTYPE html>
<html>
  <head>
    <title>Feed.me</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="root"><!-- app goes here --></div>
    <script src="app.js"></script>
  </body>
</html>
```

The user then stares at an empty page while the megabytes of JS in `app.js` loads, parses, and executes, finally rendering something into `<div id="root"/>`. But all it renders is some UI chrome and a new loading screen where the content should be.

Now that it's up and running, the app checks `window.localStorage`, finds an authentication token, and makes some requests to the api server `api.feeed.mee` to load all the data it needs to render the page:

- __User details__

  "Welcome back, Ben", profile image, etc.

  `GET https://api.feeed.mee/users/${user.id}`

- __Order details__

  "Order #123 is being prepared by the restaurant"

  "1 x mezze platter, 2 x falafel wrap, 1 x baklava"

  `GET https://api.feeed.mee/orders/open?user=${user.id}`

Finally, the user sees their page, only to learn their food isn't on its way yet. This damn restaurant is even slower than the website! Perceived performance in this industry is important – hungry people have very little patience.

Once that initial page has loaded, the rest of the website will seem very performant. Ironically, the user navigating to `app.feeed.mee/support` to complain about the tardiness of their order is the quickest thing that happened so far.

So what can we do about that initial delay? Of course, the answer is to render it on the server. But how do we render the content __for that user__ on the server?

Let's look at the flow of this single-page app in its current state, and see how it interacts with the web and api servers:

```
            +---------------+
            +---------------+
            |               |
            |          https://app.feeed.mee/    +---------+
            |        +------+------------------> |   Web   |
            |               |                    +----+----+
            |               |                         |
            +---------------+                         |
                                                      |
            +---------------+                         |
            +---------------+                         |
            |               | <-----------------------+
            |   [===---]    |
            |               |     <!DOCTYPE html>
            |   Loading……   |      <script src="app.js">
            |               |
            +---------------+

            App detects user is not logged-in
            App renders login page

            +---------------+
            +---------------+
            | Login         |
            |               |
            | +---------+   |
            | +---------+   |  POST https://api.feeed.mee/auth
            |              +-----------------------------------> +---------+
            | +---------+   |                                    |   API   |
            | +---------+  <-----------------------------------+ +---------+
            |               |         auth token
            |      +----+   |
            |               |
            +---------------+

            App saves auth token in window.localStorage
            App renders orders page

            App uses saved token to load authenticated content from API

            +---------------+
            +---------------| GET https://api.feeed.mee/users/me +---------+
            | Hi Ben       +-----------------------------------> |   API   |
            |               |                                    +----+----+
            | +-----------+ |                                         ^
            | |Order #123 +-------------------------------------------+
            | +-----------+ |  GET https://api.feeed.mee/orders?status=open
            | |           | |
            | | +-------+ | |
            | | |-------| | |
            | | |-------| | |
            | | |-------| | |
            | | |-------| | |
            +-+-----------+-+
```

And then let's see what happens when the user closes the tab and returns five minutes later…

```
            +---------------+
            +---------------+
            |               |
            |          https://app.feeed.mee/  +---------+
            |        +------+----------------> |   Web   |
            |               |                  +----+----+
            |               |                       |
            +---------------+                       |
                                                    |
            +---------------+                       |
            +---------------+                       |
            |               | <---------------------+
            |   [===---]    |
            |               |     <!DOCTYPE html>
            |   Loading……   |      <script src="app.js">  <--------------------------+
            |               |                                                        |
            +---------------+                                                        |
                                                                                     |
            App detects user is logged-in                                            |
            App renders orders page                                                  |
                                                                                     |
            +---------------+                                                        |
            +---------------| GET https://api.feeed.mee/users/me +---------+         |
            | Hi Ben       +-----------------------------------> |   API   |         |
            |               |                                    +----+----+         |
            | +-----------+ |                                         ^              |
            | |Order #123 +-------------------------------------------+              |
            | +-----------+ |  GET https://api.feeed.mee/orders?status=open          |
            | |           | |                                                        |
            | | +-------+ | |                                                        |
            | | |-------| | |                                                        |
            | | |-------| | |                                                        |
            | | |-------| | |                                                        |
            | | |-------| | |                                                        |
            +-+-----------+-+                                                        |
                                                                                     |
                                                                                     +
            BUT! What if we could have rendered the logged-in state of the page at this point?
```

The browser has the authentication token for the user when it makes the first request, so why does it have to…

- load an empty page
- load, parse, and execute a JS bundle
- discover that it is logged-in
- load data from two API endpoints

…before it finally renders the UI?

## An old solution to a new problem

Storing authentication tokens in `window.localStorage` is a common practice with client-side applications. But that means _only_ once a page has loaded and we have an interactive JS session, can we make authenticated requests.

__What if we could forward on the authentication token to the server with any request so that it could make authenticated requests on our users' behalf?__

Sounds crazy, but let me introduce you to a feature that has been around almost as long as the web itself: __cookies__!

> When receiving an HTTP request, a server can send a `Set-Cookie` header with the response.
>
> With every new request to the server, the browser will send back all previously stored cookies to the server using the `Cookie` header.

– [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

So if we store our authentication token in a cookie, the server will preemptively send this along with every request, which is exactly what we need.

Let's reimagine the login flow of `feeed.mee` using cookies to store the authentication:

```
    +---------------+
    +---------------+
    |               |
    |          https://app.feeed.mee/    +---------+
    |        +------+------------------> |   Web   |
    |               |                    +----+----+
    |               |                         |
    +---------------+                         |  No authentication detected in cookie
                         <!DOCTYPE html>      |  Redirect to /login
    +---------------+      <form> … </form>   |  Login page is server-rendered
    +---------------+                         |
    | Login         | <-----------------------+
    |               |
    | +---------+   |  POST https://app.feeed.mee/auth
    | +---------+   +----------------------------------> +---------+
    |               |                                    |   Web   |
    | +---------+   <----------------------------------+ +---- ^-+-+
    | +---------+   |   App sets "auth_token"                  | |
    |               |    cookie on response         auth token | |  App forwards /auth
    |      +----+   |                                          | |     request to API
    |               |                                    +-----+-v-+
    +---------------+                                    |   API   |
                                                         +---------+

    Login page detects app is now logged-in
    Navigates to orders page


    +---------------+
    +---------------+
    |               |
    |          https://app.feeed.mee/    +---------+
    |        +------+------------------> |   Web   |
    |               |                    +--+-+--+-+
    |               |                       | |  |   "auth_token" cookie detected
    +---------------+   +-------------------+ |  |   Use auth to load data from API
                        |                     |  |
                        |  Once server has    |  +---------------------------------> +---------+
                        |  all data, render   | GET https://api.feeed.mee/users/me   |   API   |
                        |  orders page.       |                                      +---------+
    +---------------+   |                     +------------------------------------------^
    +---------------+   |                     GET https://api.feeed.mee/orders?status=open
    | Hi Ben        |   |  <!DOCTYPE html>
    |               <---+   <h1>Order #123</h1>
    | +-----------+ |
    | |Order #123 | |
    | +-----------+ |
    | |           | |
    | | +-------+ | |
    | | |-------| | |
    | | |-------| | |
    | | |-------| | |
    | | |-------| | |
    +-+-----------+-+
```

And the flow of a logged-in user returning…

```
    +---------------+
    +---------------+
    |               |
    |          https://app.feeed.mee/    +---------+
    |        +-------------------------> |   Web   |
    |               |                    +---------+
    |               |                       | |  |   "auth_token" cookie detected
    +---------------+   +-------------------+ |  |   Use auth to load data from API
                        |                     |  |
                        |  Once server has    |  +---------------------------------> +---------+
                        |  all data, render   | GET https://api.feeed.mee/users/me   |   API   |
                        |  orders page.       |                                      +---------+
    +---------------+   |                     +------------------------------------------^
    +---------------+   |                     GET https://api.feeed.mee/orders?status=open
    | Hi Ben        |   |  <!DOCTYPE html>
    |               <---+   <h1>Order #123</h1>
    | +-----------+ |
    | |Order #123 | |
    | +-----------+ |
    | |           | |
    | | +-------+ | |
    | | |-------| | |
    | | |-------| | |
    | | |-------| | |
    | | |-------| | |
    +---------------+
```

Notice this is exactly the same flow as the one where the user is logged in, and it results in __a single request__ to get content.

Let's look at this from another angle, laying out the critical path to a __rendered UI__ and an __interactive UI__. Rendered means the user's browser tab is populated with all the content they'd expect – for example, seeing the list items on their order. Interactive means providing user input to the page will result in the expected behaviour – for example, clicking a `╳` button or pressing the `ESC` key to close a modal.

### Rendering the login screen

The first row in this diagram represents the "before" case in our login flow, without rendering on the server. The second represents the "after" case where the content _is_ rendered on the server:

<!-- HACK I need these images to be wider than normal -->
<div>
  <a href="/img/posts/ssr-login-flow.png" style="width:auto;display:block;max-width:80rem">
    <img src="/img/posts/ssr-login-flow.png" />
  </a>
</div>

As you can see, the "before" UI becomes rendered _and_ interactive at the same time. The "after" example becomes rendered, and then interactive at a later point.

In spite of the overhead of a redirect on the initial HTTP request¹, the server-rendered example is rendered sooner. It actually takes longer to become interactive, but because the UI was shown to the user earlier, the __perceived performance__ of the server-rendered example is better.

It sounds like we're just tricking the user, but as well as _kind of_ doing that, it's also a more efficient use of time. A user doesn't immediately interact with an interface – it takes them time to comprehend what they see, then make a decision about what to do, and then perform a motor action (e.g. move a finger). So we can show them the interface, and as long as it becomes interactive before they can physically poke something on screen, we're all good!

<small>¹ Browsers make use of the same connection when making requests to the same server, so the overhead of this redirect does not make it 2 ⨉ individual HTTP requests. In this diagram I estimated the overhead to be 1.2⨉.</small>

### Rendering the list of orders for a returning user

In this next example, the user returns to check the status of their order, like in the flow diagram from earlier. Again, the top row shows what happens when the UI is rendered on the client, and the bottom row is server-rendered.

<!-- HACK I need these images to be wider than normal -->
<div>
  <a href="/img/posts/ssr-returning-user-flow.png" style="width:auto;display:block;max-width:80rem">
    <img src="/img/posts/ssr-returning-user-flow.png" />
  </a>
</div>

The server-rendered case really shines here. Not only does the client have to make fewer requests, but the application is also able to make decisions on what content to fetch much sooner. Again there _is_ an overhead on the initial request to the server, this time not due to a redirect, but because it loads content from the API to populate the page². After that, all it needs is for the CSS to be loaded and applied, and it has a rendered page.

Compare this with the client-rendered example where it needs to wait for the JS to load and execute before it knows what content it needs to fetch. Only after waiting for that content can it then render the page.

What this boils down to is __getting slow or blocking operations started as soon as possible__. By preemptively sending the auth token to the web server, the server-rendered example is able to start loading the necessary content way before the client-rendered case.

<small>² This is modeled as a 1.2x overhead since the web server is likely to be co-located with the API server and doesn't have to go over the public internet to reach it. Requests will be much faster than from a remote client.</small>

## What's the catch?

### You have to run Node.js on the server

In order to execute your JS rendering logic, your server needs to know JS. This means running a Node.js server which – while it is mine – may not be your server-side environment of choice.

### Your web server needs to be "smart"

For a client-rendered application, you can simply use a static web server that has no logic at all. Once you want to render server-side, your server needs to know about:

- routing – which view to render for each route
- content – which routes need to load what data
- authentication – how to write/read cookies and how to parse/validate an auth token

### Paying for computation

When your application is solely rendered on the client, your users are providing CPU cycles for free. When you render it on your hardware, this results in more load and you are responsible for paying the bills.

Additionally, an entirely static web server is easy to apply caching to – cache everything until it changes. But when a cookie is included in requests, caches will be bypassed. You'll need to do things like ensuring your public, static resources are served from a different domain so they can be cached.

## Final thoughts

As with most solutions, there are tradeoffs to moving all user interface logic client-side. Think about whether your application even needs this at all. Consider that you can build a blazingly fast interactive web application with [Ruby on Rails](https://rubyonrails.org/) using [turbolinks](https://github.com/turbolinks/turbolinks) and a scattering of JS ([Basecamp](https://basecamp.com/) being the prime example).

Once you have decided it's necessary to render on the client, know that building a complex client-side application is hard, and is still a relatively new way of doing things – you'll meet new and only partially solved problems. Rendering on the server is a solution to one such problem, and adds __even more__ complexity to your application!

But if you _are_ going to do that, I hope this blog post helps you understand it and get it right.
