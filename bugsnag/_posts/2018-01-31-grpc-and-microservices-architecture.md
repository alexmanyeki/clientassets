---
layout: post
title: Building scalable microservices with gRPC
publish_date: January 31st, 2018
author_name: Ben Ibinson
author_twitter: bugsnag
author_avatar: beni
excerpt: A look at why we chose to implement gRPC in our data processing pipeline to support billions of messages per day.
categories: engineering
hero_image: grpc-microservices.png
cover_image: grpc-microservices-cover.png
---

> This is the first post in a series on how we scaled Bugsnag's new [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/) backend pipeline using gRPC. [Read our second blog](https://blog.bugsnag.com/libraries-for-grpc-services/) on how we package generated code from protobufs into libraries to easily update our services.

Bugsnag processes hundreds of millions of errors each day, and to handle this data we've prioritized building a scalable, performant, and robust backend system. This comes along with many technical challenges from which we've learned a lot. Most recently, we launched the new [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/), a project that required us to scale our system to handle the significant increase in service calls required to track releases and sessions for our users.

While work on the Releases dashboard was underway, the Engineering team was also breaking down Bugsnag's backend functionality into a system of [microservices](https://martinfowler.com/articles/microservices.html) we call the Pipeline. We knew that extending the Pipeline to support [releases](https://docs.bugsnag.com/product/releases/releases-dashboard/#identifying-releases) would mean adding several new services and modifying existing ones, and we also anticipated many new server and client interactions. To handle all of these architectural changes, we needed a consistent way of designing, implementing, and integrating our services. And we wanted a platform-agnostic approach — Bugsnag is a polyglot company and our services are written in Java, Ruby, Go, and Node.js.

In this post, we'll walk you through why we opted for [gRPC](https://grpc.io/) as our default communication framework for the Pipeline.

## Reaching the limit of REST API design

Our existing systems have traditionally used [REST](https://blog.bugsnag.com/building-great-apis/) APIs with JSON payloads for communicating synchronously. This choice was made based on the overwhelming maturity, familiarity, and tooling available, but as our cross-continent engineering teams grew, we needed to design a consistent, agreed upon RESTful API. Unfortunately, it felt like we were trying to shoehorn simple methods calls into a data-driven RESTful interface. The magical combination of verbs, headers, URL identifiers, resource URLs, and payloads that satisfied a RESTful interface *and* made a clean, simple, functional interface seemed an impossible dream. RESTful has lots of rules and interpretations, which in most cases result in a REST*ish* interface, which takes extra time and effort to maintain its purity.

Eventually, the complications with our REST API led us to search out alternatives. We wanted our microservices to be as isolated from one another as much as possible in order to reduce interactions and decouple services. Simplicity would be key as it would allow us to create a workable service in as little time as possible, and keep us from jumping through hoops.

## Evaluating alternatives to REST

Choosing a communication framework should not be undertaken lightly. Large size organizations (like [Netflix](https://blog.smartbear.com/apis/why-you-cant-talk-about-microservices-without-mentioning-netflix/)) can have backend systems powered by over +500 microservices. Migrating these services to replace inadequate inter-service comms can cost a large number of engineering cycles, making it logistically and financially impractical. Investing time into considering the right framework from the start can save a lot of wasted effort in the future.

We spent a significant amount of time drawing up evaluation criteria and researching our options. Here I'll walk you through what that looked like for Bugsnag.

### Technical criteria

When researching the options available, there were specific criteria we used to assess our options. Our list of things to consider was based on what would work best for a microservice architecture. Our main goals would be to use communication liberally, remove complexity from communication so we could communicate freely and understand where responsibility lies for each service. Some of these technical concerns were:

- **Speed** - For large numbers of request/response API calls, we need the latency of the call itself to be a minimal factor regarding performance and user responsiveness. The main components of latency are connection cost, transport cost, and message encoding/decoding time.

- **Infrastructure compatibility** - How well does the framework play with our infrastructure, mainly regarding load balancing and auto-scaling? We use [Kubernetes](https://kubernetes.io/) services hosted on [Google Cloud Platform](https://cloud.google.com/), so we need the framework to compliment this environment.

- **Development tooling** - Providing as little friction as possible when implementing a framework will lead to happier developers and quicker results. What tools are available to help with things like coding, locally testing endpoints, and stubbing/mocking for unit and integration testing? When things go wrong, we need to be able to see what requests were made including their contents. Factors like the message format can also make debugging easier dependent on tooling, e.g. JSON messages are human-readable, but binary messages will need extra effort to decode.

- **Maturity and adoption** - For startup companies, resources are limited and need to be spent on the company's core business rather than fixing, testing, and augmenting third-party frameworks. Factors like the popularity of the framework, examples of large-scale usage, how active the community is, and the age of the framework itself are good indicators of stability. But a word of warning; it is much more important to choose a framework that solves your specific problem than to choose the new shiny.

- **Multi-platform support** - In true microservice mentality, we write our services in the language best fit for its purpose, which currently includes Java, Ruby, Go, and Node. Does the framework provide first-class support for our existing language choices while providing options for writing new services in other languages?

- **Amount of code** - The framework should help reduce engineering cost. How much code do I need to write and maintain to get this working? How much of this is boilerplate code compared to business logic?

- **Security** - All internal communications should be authenticated and encrypted. We need the ability to use SSL/TLS for all communications (or a suitable equivalent).

### Design considerations, it's not all about the tech

Service APIs are one of the most important interfaces to get right as they are crucial in setting service expectations during development. Settling on the design for a service API can be an arduous task, which is amplified when different teams are responsible for the different services involved. Minimizing wasted time and effort due to mismatched expectations is as valuable as reducing coding time. Since Bugsnag has a cross-continent engineering team, there are few cycles of communication for us. We have to maximize that by streamlining our communication and making sure things are less open to interpretation, otherwise mistakes are easy and things can easily be delayed.

Here are some of the design considerations we had when choosing the framework:

- **Strongly typed** - Are messages sent down the wire strongly typed? If the messages sent across the service boundary are clear, then we eliminate design and runtime errors due to types.  

- **Open to interpretation** - Being able to generate client libraries directly from service API specifications reduces problems with misinterpretations.  

- **Error conditions** - Having a well-defined set of error codes makes it easier to communicate issues consistently.  

- **Documentation** - The service API should be human-readable and easy to understand. The format in which the service API is defined should lend itself to describing its endpoints as clearly and precisely as possible.  

- **Versioning** - Change is inevitable and it's a good bet that at some point a service API will need to be modified. The messaging format and service definition used can influence how easy it is to modify an API and deploy to production. Is there a clear path to increase the version and its corresponding libraries, and roll out the changes?


# Microservice best practices, why extensibility is important

In addition to the criteria listed above, we needed to choose a framework that is easily extensible. As microservices gain traction, we demand more and more "out of the box" features synonymous with this architecture, especially as we move forward and try to add more complexity to our system. The features we wish for include:

- **Exception handling** - Providing a mechanism for dealing with unhandled exceptions at a request level. This allows important contextual metadata to be captured about the request e.g. the user making the request, which can be reported with the exception. We use [Bugsnag](https://www.bugsnag.com/) to monitor these exceptions with ease.  

- **Intelligent retries** - Retrying requests under specific conditions e.g. only on 5xx status codes. This includes supporting various backing off strategies like [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff).  

- **Service discovery configuration** - Options for hooking communication frameworks into popular service discovery applications like [Zookeeper](https://zookeeper.apache.org/), [Eureka](https://github.com/Netflix/eureka) or [Consul](https://www.consul.io/) can provide a quick and easy solution to routing requests around your architecture.  

- **Metrics, tracing and logging** - [Observability](https://medium.com/@rakyll/microservices-observability-26a8b7056bb4) is essential for complex distributed systems, but we should be [careful of what we monitor](https://martinfowler.com/articles/useOfMetrics.html). However, automatically collecting metrics and tracing information at service boundaries can quickly answer common questions like, "Is my service responding slowly to requests?" and "How often are requests failing?".  

- **Circuit breaking** - This [pattern](https://www.ibm.com/cloud/garage/content/manage/practice_circuit_breaker_pattern/) can protect against cascading service failures by automatically detecting problems and failing fast. This can also be triggered by prolonged slow requests to provide a responsive degraded service rather than constantly timing out.  

- **Caching and batching** - Speed up requests by using a cache or batching requests.

Most frameworks will not provide all these features, but at the very least, they should be extensible enough to add in when needed.

## What are gRPC and Protocol Buffers

There was no single framework that ticked all the boxes. Some options we explored were Facebook's [Thrift](https://thrift.apache.org/), Apache Hadoop's [Avro](https://avro.apache.org/docs/current/), Twitter's [Finagle](https://twitter.github.io/finagle/), and even using a [JSON schema](http://json-schema.org/).

Our needs seemed more aligned with remote procedural calls, or [RPCs](https://en.wikipedia.org/wiki/Remote_procedure_call), giving us the fine grain control we needed. Another attraction with using RPCs is the use of interface description languages or [IDLs](https://en.wikipedia.org/wiki/Interface_description_language). An IDL allows us to describe a service API in a language-independent format, decoupling the interface from any specific programming language. They can provide a host of benefits including a single source of truth for the service API, and potentially can be used to generate client and server code to interact with these services. Examples of IDLs include [Thrift](https://thrift.apache.org/docs/idl), [Avro](https://avro.apache.org/docs/1.8.2/idl.html), [CORBA](http://www.corba.org/omg_idl.htm), and, of course, [Protocol Buffers](https://developers.google.com/protocol-buffers/).

In the end, the clear winner was gRPC with Protocol Buffers.

### What is gRPC?

We chose to go with [gRPC](https://grpc.io/) as it met our feature needs (including extensibility going forward), the active community behind it, and its use of the HTTP/2 framework.

gRPC is a high-performance, lightweight communication framework designed for making traditional RPC calls, and developed by Google (but no, the [g](https://github.com/grpc/grpc/blob/master/doc/g_stands_for.md) doesn't stand for Google). The framework uses [HTTP/2](https://developers.google.com/web/fundamentals/performance/http2/), the latest network transport protocol, primarily designed for low latency and multiplexing requests over a single TCP connection using [streams](https://hpbn.co/http2/#request-and-response-multiplexing). This makes gRPC amazingly fast and flexible compared to REST over HTTP/1.1.

The performance of gRPC was critical for setting up our Pipeline to handle the massive increase in calls we were expecting for the Releases dashboard. Also, HTTP/2 is the next standardized network protocol so we can leverage tools and techniques that have been developed for HTTP/2 (like [Envoy](https://blog.bugsnag.com/envoy/) proxies) with first class support for gRPC. Due to multiplexing stream support, we are not limited to simple request/response calls as gRPC supports bi-directional communications.

![](/img/posts/grpc/grpc-arch.svg)

### What are Protobufs?

[Protocol Buffers](https://developers.google.com/protocol-buffers/), or protobufs, are a way of defining and serializing structured data into an efficient binary format, also developed by Google. They were one of the main reasons we chose gRPC as the two work very well together. We previously had many issues related to versioning that we wanted to fix. Microservices mean we have to roll changes and updates constantly and so we need interfaces that can adapt and stay forward and backwards compatible, and protobufs are very good for this. Since they are in a binary format, they are also small payloads that are quick to send over the wire.  

Protobuf messages are described using their associated IDL which gives a compact, strongly typed, backwards compatible format for defining messages and RPC services. We use the latest [proto3](https://developers.google.com/protocol-buffers/docs/proto3) specification, with a real-life example of a protobuf message shown here.

```protobuf
// Defines a request to update the status of one or more errors.
message ErrorStatusUpdateRequest {
    // The list of error IDs that specify which errors should be updated.
    // The error IDs need to belong to the same project of the call will fail.
    // Example:
    // "587826d70000000000000001"
    // "587826d70000000000000002"
    // "587826d70000000000000003"
    repeated string error_ids = 1;

    // The ID of the user that has triggered the update if known.
    // This is for auditing purposes only.
    // Example: "587826d70000000000000004"
    string user_id = 2;

    // The ID of the project that the errors belong to if known.
    // If the project ID is not provided, it will be queried in mongo.
    // The call will fail if all of the error IDs do not belong to
    // the same project.
    // Example: "587826d70000000000000005"
    string project_id = 3;
}
```

All fields according to `proto3` are optional. Default values will always be used if a field is not set. This combined with field numbering provide an API that can be very resistant to breaking changes. By following some [simple rules](https://developers.google.com/protocol-buffers/docs/proto3#updating), forward and backwards compatibility can be the default for most API changes.

The protobuf format also allows an RPC service itself to be defined. The service endpoints live alongside the message structures providing a self-contained definition of the RPC service in a single protobuf file. This has been very useful for our cross-continent engineering team who can understand how the service works, generate a client, and start using it, all from just one file. Here is an example of one of our services:

```protobuf
syntax = "proto3";

package bugsnag.error_service;

service Errors {
    // Attempt to get one or more errors.
    // Returns information for each error requested.
    // Possible exception response statuses:
    //   * NOT_FOUND        - The error with the requested ID could not be found
    //   * INVALID_ARGUMENT - The error ID was not a valid 12-byte ObjectID string
    rpc GetErrors (GetErrorsRequest) returns (GetErrorsResponse) {}

    // Attempt to open the errors specified in the request.
    // Returns whether or not the overall operation succeeded.
    // Possible exception response statuses:
    //   * NOT_FOUND        - One or more errors could not be found
    //   * INVALID_ARGUMENT - One of the request fields was missing or invalid,
    //                        see status description for details
    rpc OpenErrors (ErrorStatusUpdateRequest) returns (ErrorStatusUpdateResponse) {}

    // Attempt to fix the errors specified in the request.
    // Returns whether or not the overall operation succeeded.
    // Possible exception response statuses:
    //   * NOT_FOUND        - One or more errors could not be found
    //   * INVALID_ARGUMENT - One of the request fields was missing or invalid,
    //                        see status description for details
    rpc FixErrors (ErrorStatusUpdateRequest) returns (ErrorStatusUpdateResponse) {}
}

// Defines a request to update the status of one or more errors.
message ErrorStatusUpdateRequest {
...
```

The framework is capable of generating code to interact with these services using just the protobuf files, which has been another advantage for us since it can automatically generate all the classes we need. This generated code takes care of the message modeling and provides a stub class with overridable method calls relating to the endpoints of your service. A wide range of languages are supported including C++, Java, Python, Go, Ruby, C#, Node, Android, Objective-C, and PHP. However, maintaining and synchronizing generated code with its protobuf file is a problem. We've been able to solve this by auto-generating client libraries using Protobuf files, and we'll be sharing more about this in our next blog post, coming soon.

One of the best features of gRPC is the middleware pattern they support called [interceptors](https://github.com/grpc-ecosystem/go-grpc-middleware#interceptors). It allows all gRPC implementations to be extended (which you'll remember was important for us), giving us easy access to the start and end of all requests, allowing us to implement our own microservice best practices. gRPC also has built-in [support for a range of authentication mechanisms](https://grpc.io/docs/guides/auth.html), including SSL/TLS.  

## The gRPC community

We're at the beginning of our gRPC adoption, and we're looking to the community to provide more tools and techniques. We're excited to join this vibrant community and have some ideas on future projects we'd like to see open sourced or possibly write ourselves.

### Current state of gRPC tooling

gRPC is still relatively new, and the development tools available are lacking, especially compared to the veteran REST over HTTP/1.1 protocol. This is especially apparent when searching for tutorials and examples as only a handful exist. The binary format also makes messages opaque, requiring effort to decode. Although there are some options e.g. [JSON transcoders](https://github.com/grpc-ecosystem/grpc-httpjson-transcoding) to help (we'll write more about this in a coming blog post), we anticipated needing to do some groundwork to provide a smooth developing experience with gRPC.

 - We love [Apiary](https://apiary.io/) for documenting our external APIs. An equivalent for automatically generating interactive documentation using a services protobuf file would be ideal to communicate internal gRPC APIs effectively.    

 - Static analysis of protobuf files would allow us to catch more bugs at runtime. We use [Checkstyle](https://github.com/checkstyle/checkstyle) for our Java code and it would be great to apply something similar to our protobuf files.  

 - Custom interceptors to provide tracing, logging, and error monitoring out of the box. We hope to open source our Bugsnag gRPC interceptor to automatically capture and report errors to Bugsnag.

### Growth and Adoption of gRPC

The popularity of gRPC has grown dramatically over the past few years with large-scale adoption from major companies such as Square, Lyft, Netflix, Docker, Cisco, and CoreOS. Netflix [Ribbon](https://github.com/Netflix/ribbon) is the defacto standard for microservice communication frameworks based around RPC calls using REST. This year, they announced they are [transitioning to gRPC](https://github.com/Netflix/ribbon/blob/master/README.md#project-status-on-maintenance) due to its multi-language support and better extensibility/composability. The framework has also recently [joined the Cloud Native Computing Foundation](https://www.cncf.io/blog/2017/03/01/cloud-native-computing-foundation-host-grpc-google/) in March 2017, joining heavyweights [Kubernetes](https://kubernetes.io/) and [Prometheus](https://prometheus.io/). The [gRPC community](https://grpc.io/community/) is very active, with the open sourced [gRPC ecosystem](https://github.com/grpc-ecosystem) listing exciting projects for gRPC on the horizon.

In addition, gRPC has [principles](https://grpc.io/blog/principles) with which we agree with.

[Lyft](https://www.lyft.com/) gave a great talk on moving to gRPC which is similar to our own experiences: [Generating Unified APIs with Protocol Buffers and gRPC](https://www.infoq.com/presentations/api-pb-grpc). Well worth checking out.

This is still early days for gRPC and there are some definite teething troubles, but the future looks bright. Overall, we're happy with how gRPC has integrated into our backend systems and excited to see how this framework develops.
