---
layout: post
title: Cross-domain Script Errors
publish_date: August 11th, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: engineering
---

If you've ever come across a "Script Error" on line 0, you've run afoul of the [Same Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy). This happens when there's an error during the first pass of a cross-domain script.

The browser obscures the real error message to close a [security vulnerability](https://bugzilla.mozilla.org/show_bug.cgi?id=363897) that can be used to read information from other sites the user may be logged into. Debugging script errors can be tricky because although the developer console contains the correct error message and line number, both `window.onerror` and Bugsnag can only show you "Script Error."

I've detailed [the fix](#the-fix) below, which is to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) on your web-server. But first here's a summary of when errors are visible.

### Summary of when error messages are visible

Browsers disagree on which errors should be obscured, and which should be visible. Firefox takes the view that only [SyntaxErrors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) are a problem, whereas Chrome and Safari take a more conservative view. In those browsers any [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) that happens when running the script is also obscured.

<table>
  <tr>
    <th></th>
    <th>Syntax Errors<br/> (no CORS)</th>
    <th>Runtime Errors<br/> (no CORS)</th>
    <th>Syntax Errors<br/> (CORS)</th>
    <th>Runtime Errors<br/> (CORS)</th>
  </tr><tr>
    <th>Firefox</th><td>✘</td><td>✔</td><td>✔</td><td>✔</td>
  </tr><tr>
    <th>Chrome</th><td>✘</td><td>✘</td><td>✔</td><td>✔</td>
  </tr><tr>
    <th>Safari</th><td>✘</td><td>✘</td><td>✔</td><td>✔</td>
  </tr><tr>
    <th><nobr>IE <=10</nobr></th><td>✔*</td><td>✔</td><td>✔</td><td>✔</td>
  </tr><tr>
    <th><nobr>IE >=11</nobr></th><td>✘</td><td>✘</td><td>✘</td><td>✘</td>
  </tr>
</table>
<small>\* This is a security vulnerability.</small>

## The Fix

Enabling <abbr title="Cross-Origin Resource Sharing">CORS</abbr> for script tags requires two steps.

1. [Configure your web-server](https://docs.bugsnag.com/platforms/browsers/cors/#webserver-instructions) to send the CORS header.

    ```
    Access-Control-Allow-Origin: *
    ```

2. Add the "crossorigin" attribute to your script tag.

    ```
    <script type="text/javascript" src="//cdn.example.com/site.js" crossorigin>
    ```

With these changes, Bugsnag will report errors that happen in your script at load time even if you host your Javascript on a CDN. And it will also continue to report all other errors, including stacktraces in every browser, completely automatically.

Bugsnag has world-leading support for automatically [monitoring Javascript errors](https://www.bugsnag.com/platforms/javascript/). This lets you find out as soon as something goes wrong, so you can fix problems before too many people are affected. Sign up for a [free trial](https://app.bugsnag.com/user/new) now.
