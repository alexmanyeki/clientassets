---
layout: post
title: "The Backbone of SaaS companies: Support Engineering"
publish_date: February 12th, 2018
author_name: Karissa Peth
author_twitter: karissapeth
author_avatar: karissa
excerpt: Learn about support engineering teams and their responsibilities supporting SaaS users.
categories: guides
hero_image: support-engineering.png
cover_image: support-engineering-cover.png
---

As the software industry has shifted from purchased licensure to software as a service (SaaS), the importance of customer engagement and retention are now paramount to success. No longer can you sell a product, book the revenue, and then mostly consider the 'job finished.' The importance of subscription revenue for SaaS companies is intrinsically tied to customer product usage and engagement.

Sure, companies have had customer support channels for a long time, but the department has shifted from reactionary help geared at preventing negative reviews, to proactively engaging and building relationships with customers. Retention, expansion, and reduction of churn are the new metrics of success, and support engineers are leading the way.

A recent event at email API provider [Nylas](http://nylas.com/?utm_campaign=DSE%20Success%20Day&utm_source=Bugsnag&utm_medium=blogpost) discussed the ways in which support engineering teams are defining their own roles, best practices, and approaches to the ever present responsibility of supporting users. The panel of experts included:

- [David McCreath](https://www.linkedin.com/in/dmccreath/), Head of Developer Support at [Slack](https://www.slack.com)

- [Kelly Mason](https://www.linkedin.com/in/kellymariemason/), Customer Engineering Team Lead here at [Bugsnag](https://www.bugsnag.com)

- [Maggie Chu](https://www.linkedin.com/in/mychu92/), Success Engineer at [Segment](https://www.segment.com)

- [Mike Pfister](https://www.linkedin.com/in/mikepfister/), Head of Solutions Engineering from [Nylas](https://www.nylas.com/)

We’ll discuss some of the key takeaways from the panelists' insights on the main areas of support engineering.

![Photo of panelists (left to right): Mary Grace Thengvall, David McCreath, Kelly Mason, Maggie Chu, Mike Pfister](/img/posts/success-panel.png)


## The intersection of support, engineering, and education

One of the interesting bits of information from the panelists was that they _all_ made up their titles. Each described their work as part support, part engineering, and part education, but the ratios of each seemed to differ from company to company.

The similarities in their backgrounds and traits also aligned across companies and titles. Each panelist described how communication is a key trait, critical to theirs and their team's success. Specifically, a clear and empathetic written style that would be perceived correctly by the customer is an essential part of their skillset. Everyone also mentioned a technical background as a key skill to the support engineer's role, which sets the support engineer apart in some ways from a B2C customer support function. The expectation is they will be comfortable troubleshooting problems based in code. David from Slack specifically mentioned the need to hire people with stamina who can switch from their own problems and code as an engineer, to working on "other peoples' problems and code" as this can be exhausting and some engineers aren't prepared for it.

## Prioritization and acceptance

Each company had a different way to prioritize support tickets. The options ranged from inclusive support with any purchase of the product (Slack), to very specific tiering with a dedicated support person (Segment). All of the companies had established a top tiering of support for enterprise level accounts, but the differences in approach were more visible at the lower end of the spectrum.

Nylas has a basic support SLA for all their customers. Interestingly, Mike specified that he tends to prioritize requests coming from newer users, as he has found that helping them through onboarding is paramount to adoption. Slack also has support included in the benefits of any paid Slack account (this is not available for their free product). The top tier of support they offer came from top-level management initiation. Bugsnag has email support included for free and paid accounts. Kelly uses a Salesforce integration with Zendesk to prioritize top tier customers.

Prioritizing support inquiries requires accepting that the queue of tickets is always changing. Because it’s often impossible to get to support inbox zero by the end of a workday, the support engineers have their own methods of deciding when it’s okay to step away from the support queue. Maggie from Segment said it really depends on the number of voices and the volume of those voices regarding a given issue. Things that get a lot of attention from customers and internal teams always move to the top of the queue. David uses an empathy-based tactic, saying that “letting people know you have not forgotten about them goes a long way.” No matter the tactic, it was obvious from the head nods that accepting that tickets will still be there tomorrow is a reality of support engineering.

## Rabbit hole prevention

Curiosity was definitely a personality trait of the support engineers on the panel, but it can also lead to spending more time investigating an issue than they should. This is the proverbial “going down the rabbit hole” issue when you are so engrossed in figuring out a problem that you lose all sense of your surroundings.

David relayed that if he is aware he might be down a rabbit hole, he just stops and pulls someone else into the problem. "If I'm aware that I'm potentially down a rabbit hole, I know I've already gone too far."

Kelly explained that there’s no real limit to how involved a support ticket may be when the topic involves problems cropping up in a user’s core error handling in their software. To mitigate this, her team timeboxes tickets to prevent lost hours tracking down an issue. After the allotted time is up, they hope to at least have a list of next questions to ask the user (e.g. more information about the error) or more details to escalate to the engineering team. Her time investigating means less time an engineering teammate would spend looking into the top level possible causes. This teamwork and handoff serves both to provide learning opportunities for the support engineers and to mitigate engineering time on issues.

## Protect the engineers!

An interesting point that came up frequently was the methods used to protect engineering from the support queue.

The main concern here is that if the support team simply pings the engineers every time a question they need insight on comes in, the engineers end up being taken out of their workflow too much to get any of their planned work done.

The name of the game is efficiently getting the most insight from the given subject matter experts while using the least amount of their time.

One method brought up by David was using chat to triage support requests with help from an on-call engineer for support. A similar support engineering rotation is used by New Relic, but the idea is the same, where a single person is designated to handle support inquiries, saving everyone time and reducing context switching.

## Internal docs

In addition to external documentation, Maggie from Segment explained their company’s use of internal documentation to scale their support team. They write up internal-only documentation on all the various tickets and questions they answer so the team has a written record of their tribal knowledge. These can be referred to by other teammates and other departments so the engineering teams aren’t tasked with answering similar technical questions time and again. She also mentioned an additional benefit: their documentation is now also used by their Sales, Customer Success, and Marketing teams for reference.

## Support stand-ups

One of the upsides (and downsides) to startups and smaller organizations is access to members of other teams. This can lead to virtual or IRL shoulder tapping a colleague with questions. In order to minimize the distractions of support questions on engineers, Kelly detailed how Bugsnag uses an afternoon support standup to ask all questions at one designated time. She tags any ticket that needs engineering input and then goes over the list of tickets in the afternoon at 2pm with one of the engineering team leads. This gives customer engineering time to both attempt the question in the morning and still have time in the afternoon to reply with an answer after the support standup.

## Scaling support engineering through content creation

One of the ways in which support engineering differs from traditional customer service roles is in the amount of content generation they do. This was universal across the panel of experts. They were creating, revising, and designing the technical content for their customers, which serves to help customers help themselves.

All the panelists mentioned the use of external documentation to educate users on how to use their technical products, but surprisingly, they were also all contributing to the documentation. The move to agile has meant docs are updated at the same time as product changes are released, which can sometimes mean multiple times a day. Segment has support engineers who are more focused on documentation than answering support tickets, and spend about 30% of their time writing and updating documentation.

Mike from Nylas elaborated on his creation of educational content with the use of the tool [Loom](https://www.useloom.com/) to make knowledge base content, including videos and screen casts. He tries to do this anytime he has a recurring product question.

## Tooling

Here's a quick overview of the tools each panelist mentioned using for support engineering.

- [Zendesk](https://www.zendesk.com) - This support ticketing product was the only tool mentioned by all the panelists
- [Loom](https://www.useloom.com) - Video and screencast capture tool (used by: Nylas)
- [Paper](https://www.dropbox.com/paper) - Document tool for internal documentation (used by: Segment and Nylas)
- [Kibana](https://www.elastic.co/products/kibana) - Data and log visualization tool (used by: Slack)
- [Bugsnag](https://www.bugsnag.com) - Error reporting tool to determine errors user ran into (used by: Bugsnag)
- [Honeycomb](https://honeycomb.io/) - Data aggregation for log searching (used by: Nylas)

In addition to the commercially available tools listed above, 3 of the 4 panelists specifically mentioned contributing to their own internal tools or admin dashboards as part of their role.

## Developing a support engineering team

The definition of support engineering is still being refined, but the commonalities seen in the panelists’ roles, no matter their job title, means this function is critical at every size company. They are likely the first human interaction that most of your customers have with your business. It’s critical to develop a strategy to define the responsibilities of the team, and to set them up for success with the right tools.

---

Bugsnag’s support engineering team uses our own product to help facilitate support tickets by enabling a quick view into what error a customer encountered. You can learn how Kelly, one of the panelists, uses Bugsnag to proactively approach support engineering in a [blog](https://blog.bugsnag.com/customer-success-with-bugsnag/) she wrote.

A recording of the panel is available from Nylas [here](https://www.youtube.com/watch?v=QGoDuHJHuLY&feature=youtu.be).
