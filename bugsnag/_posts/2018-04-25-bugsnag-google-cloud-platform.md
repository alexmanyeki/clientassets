---
layout: post
title: Our experience with Google Cloud Platform
publish_date: April 25th, 2018
author_name: Chuck Dubuque
author_twitter: chuckdubuque
author_avatar: chuck
excerpt: A look at Bugsnag's backend infrastructure with Google Cloud Platform
categories: news
---

At Bugsnag, the cloud platform on which we build our software is an important part of the user experience. Our promise is to deliver actionable results from your error reports quickly and intuitively, whether you have hundreds or millions of errors to consider.

In 2017, as we were starting the process of building our [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/), we knew we would need to handle not just a growing number of error reports, but information on successful application sessions as well, which could be hundreds of times more data to manage. In anticipation of that feature and our growing customer base, we planned and executed a move to [Google Cloud Platform](https://cloud.google.com/) and redesigned our backend infrastructure.

## Why Google Cloud Platform?

Moving to Google Cloud Platform helped us accommodate our growth as well as gave us the opportunity to better architect our backend services to handle new product capabilities. One important part of our backend services implementation was the use of gRPC and Google Kubernetes Engine. We covered our [selection of gRPC](https://blog.bugsnag.com/grpc-and-microservices-architecture), our implementation of [gRPC protocol buffers in our pipeline microservices](https://blog.bugsnag.com/libraries-for-grpc-services/), and the [results of our gRPC implementation in production](https://blog.bugsnag.com/using-grpc-in-production/) in previous blog entries. The net result to customers has been much faster performance and a reliable cloud platform. For Bugsnag, we now have the infrastructure to power the next wave of new features and functionality.

#### Read more about our move to Google Cloud Platform

We've been happy with our move to Google Cloud Platform, and we think our customers have been too. You can read more about our experience in our case study on the [Google Cloud Platform customer page](https://cloud.google.com/customers/bugsnag/).
