---
layout: post
title: "Building a great API: Lessons learned from working with dozens of REST APIs"
publish_date: May 17th, 2016
author_name: Duncan Hewett
author_twitter: bugsnag
author_avatar: duncan
categories: engineering
---

One of the most popular features of Bugsnag is the integrations with the other tools and services your team uses.  The integrations with issue trackers, team notification, chat and alerting tools provide information to your team on errors as they happen so they can take the necessary action to get them fixed.

We’ve recently reimplemented all our integrations as part of a move to a new architecture.  The change has enabled us to improve consistency and reliability of our integrations and it's provided a firm foundation for us to add lots of new features in the future.  

The implementation has involved writing code to interact with over 40 different web APIs.  Along the way we’ve learnt a few things about what makes it easy to get up and running with an API so we thought we'd share them.  We intend to  apply these lessons to our own public facing APIs in the future.

## API basics

[RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) [web APIs](https://en.wikipedia.org/wiki/Web_API) have become the standard way for data to be accessed and shared between systems on the web.  Almost all organizations which store any data will provide a web API of some kind.

They provide a way to create, update and retrieve _resources_, also called _entities_.  This could be any data that an organization holds - the entities for [Bugsnag's own API](https://docs.bugsnag.com/api/data-access/) include errors and events along with organizations, projects and users.

For our integrations with issue trackers the primary entities that we deal with are the issues themselves.  Often the way issues are organized with an issue tracker means we also have to deal with entities such as projects, organizations and more.

## Getting up and running

### Clear documentation

Good API documentation is the best thing to get up and running quickly with a new API.  Initially it is useful to have a clear overview, a high-level description of entities and details of the authentication mechanism.

### Copy and pasteable examples

Examples in an API are really useful to give you a quick overview.  A request and response from a curl command is the most common form.  It is easy to copy and paste the curl command and try it out on your own data.  Copying and modifying curl commands is generally favorable to using interactive web interfaces unless there is a particularly involved authentication process.

###  Highlight the version

If an API has multiple versions it is essential that this is highlighted clearly on each page of the API documentation.  Arriving at API documentation from Google searches and reaching the documentation for an older API version can be a real cause for confusion.

###  Authentication

Many APIs have multiple ways of authenticating requests.  In some cases it is not clear which method is preferred and why different methods existed.  Good documentation in this area made this a lot easier.

## Pay attention to error cases

### Documenting error responses

Often the only way to work out how an API responded to errors is to cause one.  This is obviously not ideal as API client implementors have to try and identify each possible error that they can expect.

APIs that document the format of the response and the errors that can be expected are very useful.

### Identifying specific errors

To develop robust consumers of APIs it is essential to reliably parse error responses.

If there are specific known errors that might occur, returning a unique code along with the message is very useful.  It is often necessary to translate certain error responses into messages that make sense for Bugsnag users and in many cases the only way this could be done was to match on the error message string.

### Status Codes

A significant number of APIs return incorrect HTTP status codes for errors.  

Often these were within the correct class of status codes (4xx, 5xx) but could have been more specific, making them easier to process.

However, some APIs return a `200 success` response for what should have been 4xx client errors, such as invalid parameters being sent. The details of the error were then included the response body.  This caused us extra work, as we needed to implement our own error processing rather than assuming the action was performed, as a 200 response would indicate.

### Consistency of error responses

In some cases the structure of error responses differs from one failure to another.  Sometimes they return an array of errors and sometimes a single error string.  This causes extra work as it is not possible to rely on the structure of the error response to map the response in a common way.

Another problem is a different `Content-Type` being returned from request to request.  Sometimes, especially with authentication failures, a `text/html` response is returned containing a login page.  In our case, our HTTP library expects an `application/json` response consistently this caused us extra work to get around.

## Structuring payload content

### Reuse entity schemas

For standard create or update requests the required payload should be a subset of the full entity as returned by the same requests.  This means that clients can use the same model for both a request and response.  This can save a significant duplication of code with all the benefits that that brings.

The following example shows a request used to create an 'item' with the response including additional fields (ID and created date).  The request is just a subset of the response.

| Request       | Response     |
| ------------- | ------------ |
| `{`<br>&nbsp;&nbsp;`"name": "Item name",`<br>&nbsp;&nbsp;`"description": "Item description",`<br>`}`  |`{`<br>&nbsp;&nbsp;`"id": "12345",`<br>&nbsp;&nbsp;`"name": "Item name",`<br>&nbsp;&nbsp;`"description": "Item description",`<br>&nbsp;&nbsp;`"created_at": "2016-01-01T00:00:00Z"`<br>`}` |

Detailed documentation of every field including a description, type and whether it is required is also important.

### Entity identifiers

Some APIs return several different identifiers for entities.  These include globally unique identifiers, identifiers unique to the entity, human readable identifiers and identifiers unique within a defined scope such as a project.  This can be pretty confusing, especially if any of the identifiers returned are not useful to clients.

```javascript
{
  // An ID that is unique only within a project
  "id_1": "12345",
  // A global ID that is unique amongst all entities in a system
  "id_2": "123456789abcdef",
  // A human readable ID intended for display to users
  "id_3": "Item-12345"
}
```

When it does make sense to return multiple identifiers, documenting what each identifier means and what it is used for is essential.

### Putting it all together

Of all the APIs we used we found [Pivotal Tracker's](https://www.pivotaltracker.com/) to be the best.  See their [stories API](https://www.pivotaltracker.com/help/api/rest/v5#Stories) to see the documentation for one of the endpoints we used.  

![Pivotal Tracker API](/img/posts/pivotal-tracker-api.png)

The Pivotal Tracker documentation is easy to navigate and has plenty of examples, with all the detail available when you need it.  The API itself is consistent and logical and we were able to develop a robust integration rapidly.

---

See a full list of our [integrations](https://www.bugsnag.com/integrations/) and let us know if there are others you'd like to see.
