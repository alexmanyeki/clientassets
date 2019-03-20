---
layout: post
title: New version of Bugsnag JavaScript error reporting
publish_date: December 4th, 2017
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
categories: features
hero_image: javascript-v4.png
cover_image: javascript-v4-cover.png
---

We're excited to announce a new version of the Bugsnag JavaScript error reporting library (v4) with official support for [React](https://www.bugsnag.com/platforms/react-error-reporting/), [Vue](https://www.bugsnag.com/platforms/vue-js/), and [Angular](https://www.bugsnag.com/platforms/angular/). You can now use our framework specific libraries, which hook into your framework's error handler, to detect errors in your application.

Bugsnag for JavaScript can help you debug client-side errors more effectively to provide your users a reliable experience with your product. Over time, you can pinpoint and fix errors with the greatest impact and improve the quality of your software.

## React error monitoring

We've released [bugsnag-react](https://github.com/bugsnag/bugsnag-react) for better error monitoring for React applications. The new library includes a preconfigured error boundary component which will capture errors within component trees and automatically report them to Bugsnag. Errors will include the React component stack which will be displayed in the 'React' tab in the dashboard.

![React error report](/img/posts/react-error-report.png)

[Learn more in our documentation](https://docs.bugsnag.com/platforms/browsers/react/).

## Vue error monitoring

You can now use [bugsnag-vue](https://github.com/bugsnag/bugsnag-vue) to detect errors in Vue.js applications. The library will detect and report Vue component data like Component name, lifecycle phase, and props in your error report. It will also tell you when in Vue's async update queue an error occurs like component render, watcher, and more.

![Vue error report](/img/posts/vue-error-report.png)

[Get started using our documentation](https://docs.bugsnag.com/platforms/browsers/vue/).

## Angular error monitoring

And finally, we now have first class support for Angular 2+ with [bugsnag-angular](https://github.com/bugsnag/bugsnag-angular). When using this plugin, your error reports will include an Angular tab with Angular specific diagnostic data like component and context details.

![Angular error report](/img/posts/angular-error-report.png)

[Learn more in our documentation.](https://docs.bugsnag.com/platforms/browsers/angular/)

## Other JS error reporting library improvements  

Users who are not using React, Vue, or Angular can also take advantage of the v4 update. The newly rewritten Bugsnag error reporting library has been completely modernized, including the use of modern tooling, so it is easier for us to test, support, and extend, overall improving its quality. It was rewritten in a modular way to ensure we are able to release more features faster in the future, like plugins for other JavaScript frameworks.

We've also made improvements that existing users will notice. You might have previously noticed a cap on payload size for events detected and sent to Bugsnag. This was related to our support of the oldest versions of IE - 6 & 7. We've dropped support for these ancient versions of IE which allows us to remove that cap. We've also standardized `bugsnag-js` with other Bugsnag libraries, so users developing on multiple platforms will notice a better UX with more consistency.

---

You can learn more about Bugsnag's JavaScript error monitoring from some of [our customers](https://www.bugsnag.com/customers/), like [Eventbrite](https://www.bugsnag.com/customers/eventbrite/), who trusts Bugsnag for monitoring errors in frontend releases, or [Stubhub](https://www.bugsnag.com/customers/stubhub/), who has seen a 40% decrease in support tickets related to product complaints since implementing Bugsnag in their JavaScript application.

Learn more about our [JavaScript error reporting](https://www.bugsnag.com/platforms/javascript/) library in our [documentation](https://docs.bugsnag.com/platforms/browsers/).

If you're new to Bugsnag, [try us free for 14 days](https://app.bugsnag.com/user/new).
