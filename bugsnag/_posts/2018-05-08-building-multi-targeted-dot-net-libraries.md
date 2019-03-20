---
layout: post
title: Building multi-targeted .NET libraries
publish_date: May 8th, 2018
author_name: Martin Holman
author_twitter: martin308
author_avatar: martin
excerpt: Learn how we were able to support a wide variety of framework versions in our new .NET notifier.
categories: engineering
hero_image: dotnet.png
cover_image: dotnet-cover.png
---

We recently shipped a new version of our [.NET notifier](https://github.com/bugsnag/bugsnag-dotnet). This is a major upgrade over our previous version and includes new features like [breadcrumbs](https://www.bugsnag.com/product/#breadcrumbs) and [session tracking](https://www.bugsnag.com/product/#releases-dashboard). We've also expanded our .NET support to include support for ASP.NET Core.

While we gave our notifier a much needed upgrade, we wanted existing users to experience our new features too. This meant we had to target the library to a wide variety of framework versions. Here we're sharing a little about how we achieved this.

## How to support multiple .NET frameworks in the past

Until recently, there have been two ways to achieve this. You could create a project file for each framework that you wanted to support, but this is prone to issues when it comes to keeping the files in sync. Adding files and ensuring that everything builds becomes a fragile process. The other option is to add more build configurations to your project file. Each build configuration would target a different framework version. This makes the project files very complex and error prone.

## Our approach to supporting multiple frameworks

Instead of these approaches, we achieved multi-framework support by using the new features in Visual Studio 2017 and MSBuild.

If you want to target more than one framework you can now use the `TargetFrameworks` element. The default for a new project file is `TargetFramework` which defines the compilation target for the library. By changing this to `TargetFrameworks` you can list many compilation targets. MSBuild will then compile your library for each framework you have provided. You can see an example of this in our [new notifier](https://github.com/bugsnag/bugsnag-dotnet/blob/master/src/Bugsnag/Bugsnag.csproj#L6).

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <PackageId>Bugsnag</PackageId>
    <Title>Bugsnag .NET Notifier</Title>
    <TargetFrameworks>net35;net40;net45;netstandard1.3;netstandard2.0</TargetFrameworks>
  </PropertyGroup>
</Project>
```

Now you have a project that produces many `.dll`s, one for each target framework.

## Other features we've leveraged in MSBuild

Now we have addressed supporting multiple .NET frameworks, but let's suppose you need to reference some Nuget packages. Things could get complicated due to all these target frameworks. Some packages have different framework requirements between versions. To solve this we can use MSBuild condition attributes. This is not a new feature of MSBuild, but one that is useful in this situation.

Your code also needs to be able to compile across all the frameworks you are targeting. This can be a little tricky as sometimes the code needs to differ between versions. Luckily, you can use compiler directives to help you write code that applies to one or more versions. MSBuild will set appropriate compiler flags when you are using the `TargetFrameworks` element. You can use the compiler flags to specify certain branches of code to run in specific versions. We used this in our notifier to cope with the reflection changes in .NET Core [here](https://github.com/bugsnag/bugsnag-dotnet/blob/master/src/Bugsnag/Reflection.cs#L14).

```csharp
using System;
using System.Reflection;

namespace Bugsnag
{
  /// <summary>
  /// Handle the reflection differences between the full .net framework and
  /// what is provided by netstandard
  /// </summary>
  public static class Reflection
  {
    public static Assembly GetAssembly(this Type type)
    {
#if (NET35 || NET40 || NET45)
      return type.Assembly;
#else
      return type.GetTypeInfo().Assembly;
#endif
    }
  }
}
```

## Distributing a multi-targeted library

Once you've finished building your library, you'll need to distribute it. This used to mean writing a separate `nuspec` file and using this to build a package. No more! Now you can include the relevant information right inside your project file.

If you have more than one project that needs to share Nuget properties, there is another feature you can put to use. Put common properties in a `Directory.build.props` file. MSBuild will include this file by merging its properties with your project files. We used this in our [notifier here](https://github.com/bugsnag/bugsnag-dotnet/blob/master/src/Directory.build.props).

---

When we decided we had to target our new notifier library to a wide variety of framework versions. We could have taken a path that lead us to a less maintainable solution. Instead we were able to keep it simple by using the new features in Visual Studio 2017 and MSBuild.

Learn more about Bugsnag's [.NET error monitoring](https://www.bugsnag.com/platforms/dotnet/) or [try it free](https://app.bugsnag.com/user/new/) for 14-days.
