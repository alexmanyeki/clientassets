---
layout: post
title: "Introducing a completely new Bugsnag API"
publish_date: July 11th, 2017
author_name: Katie Lane
author_twitter: bugsnag
author_avatar: katie
categories: features
hero_image: api_header.jpg
---

Today we are excited to launch a new data access API, making it possible to programmatically pull data or take actions in the dashboard for virtually anything that is possible within Bugsnag.

In 2015, we reengineered the way we store and [present data](https://blog.bugsnag.com/all-new-bugsnag-launch/) in order to save each and every event. This is crucial to provide users the ability to drill into data with pinpoint accuracy, and identify which customers experienced an event and why. We also introduced our [filter bar](https://docs.bugsnag.com/product/filtering-dashboard/) so that users can easily sort, group, and prioritize application errors.

We have completely rethought and reworked the data access API to build on this. Our API now enables users to take data available in Bugsnag to measure the success of projects, teams, and overall product health.

## What can you do with the API?

Here are a few specific things you can do right now via the API to start visualizing these metrics with your teams.

- Get information about trends in the volume of errors in your app to use in your team's dashboards or for reporting.
- Retrieve details about errors that have been assigned to your team but are not yet fixed.
- Assign errors to your team as they occur based on your own criteria.
- Enrich A/B testing tools with data about the volume of errors from each variant (requires [custom filters](https://docs.bugsnag.com/product/custom-filters/)).
- Find your customers who have experienced an error most frequently in the last week.

To demonstrate the last example, here's a `curl` command using the [Pivot Values](http://docs.bugsnagapiv2.apiary.io/#reference/errors/pivots/list-values-of-a-pivot-on-an-error) endpoint:

```bash
$ curl --get 'https://api.bugsnag.com/projects/{project_id}/errors/{error_id}/pivots/user.id/values' \
       --data-urlencode 'filters\[event.since\]\[\]\[value\]=7d' \
       --data-urlencode 'filters\[event.since\]\[\]\[type\]=eq' \
       --header 'Authorization: token {your_user_auth_token}' \
       --header 'X-Version: 2'
```
```json
[
    {
        "event_field_value": "10000005",
        "events": 14,
        "fields": {
            "user.email": "user1@example.com",
            "user.name": "User One"
        },
        "first_seen": "2017-06-28T20:27:45+00:00",
        "last_seen": "2017-06-28T20:34:44+00:00",
        "proportion": 0.43324
    },
    {
        "event_field_value": "10000025",
        "events": 5,
        "fields": {
            "user.email": "user2@example.com",
            "user.name": "User Two"
        },
        "first_seen": "2017-06-27T20:16:43+00:00",
        "last_seen": "2017-07-03T15:40:18+00:00",
        "proportion": 0.15007
    },
    ...
]
```

You can see more fully [detailed examples](https://docs.bugsnag.com/api/data-access/examples/) to give you an idea of what's possible, and get you up and running.

## Powering product development

Our vision has always been to provide actionable insights to inform and power product development. Bugsnag has some exciting things coming down the pipe that build upon this vision so stay tuned for updates later this year.

In the meantime, [get started with the API](https://docs.bugsnag.com/api/data-access/) and don’t hesitate to [get in touch](mailto:support@bugsnag.com) if you have feedback or questions. We’re excited to see what you build using Bugsnag.
