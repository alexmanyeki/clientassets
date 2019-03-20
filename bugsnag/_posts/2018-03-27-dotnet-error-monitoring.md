---
layout: post
title: A new version of Bugsnag .NET with support for .NET Core
publish_date: March 27th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: We've released an updated .NET notifier with expanded framework support, including .NET Core, and popular features like breadcrumbs and releases support.
categories: features
---

We're excited to announce our newly updated [.NET error reporting library](https://github.com/bugsnag/bugsnag-dotnet) with expanded framework support, including .NET Core. The library has been completely rewritten and includes popular features like session tracking that will allow .NET users to unlock the Releases dashboard full functionality. Let's walk through some of the new features available.

## First class support for .NET Core

Bugsnag for .NET now provides first class support for ASP.NET Core alongside ASP.NET, ASP.NET MVC, and ASP.NET WebAPI. Monitor errors in your .NET applications in the most effective way possible and extract the most diagnostic data in each error report, with extended support for these .NET frameworks.  

You can find our documentation and installation instructions for each framework, including example apps, here:

- [ASP.NET Core documentation](https://docs.bugsnag.com/platforms/dotnet/asp-net-core/) and [example app](https://github.com/bugsnag/bugsnag-dotnet/tree/master/examples/aspnetcore20-mvc)
- [ASP.NET MVC documentation](https://docs.bugsnag.com/platforms/dotnet/mvc/) and [example app](https://github.com/bugsnag/bugsnag-dotnet/tree/master/examples/aspnet45-mvc-webapi)
- [ASP.NET documentation](https://docs.bugsnag.com/platforms/dotnet/asp-net/) and [example app](https://github.com/bugsnag/bugsnag-dotnet/tree/master/examples/aspnet35)
- [ASP.NET WebAPI documentation](https://docs.bugsnag.com/platforms/dotnet/web-api/) and [example app](https://github.com/bugsnag/bugsnag-dotnet/tree/master/examples/aspnet45-mvc-webapi)

## Session support and the Releases dashboard

In addition to extended framework support, we've also updated the library to include session tracking so .NET users can take full advantage of the [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/) in Bugsnag. The new .NET library captures session data and uses it to calculate a crash rate metric for each release of your application. As you make new releases, keep track of this metric to see if you're meeting your threshold for acceptable errors or exceeding it. Using the Releases dashboard to monitor your .NET application releases can help you get a handle on application stability and improve the quality of your software over time.

## Support for breadcrumbs adds extra context to error reports

You can now add extra error information to error reports with breadcrumbs to help you easily retrace errors. Send breadcrumbs in error reports to add more diagnostic context and help you reproduce errors more efficiently. [Adding breadcrumbs](https://docs.bugsnag.com/platforms/dotnet/asp-net-core/#breadcrumbs) is simple, and can help you get an understanding of the system and user events leading up to the error.

## Getting started

We're excited to see how you and your team find the new .NET notifier. Getting started only takes a few minutes using NuGet and our simple [installation guides](https://docs.bugsnag.com/platforms/dotnet/).

If you're new to Bugsnag, you can [try it free](https://app.bugsnag.com/user/new/) for 14-days, and begin monitoring your .NET applications immediately.

---

For more information on our .NET support, please visit our [documentation](https://docs.bugsnag.com/platforms/dotnet/) and [changelog](https://github.com/bugsnag/bugsnag-dotnet/blob/master/CHANGELOG.md).
