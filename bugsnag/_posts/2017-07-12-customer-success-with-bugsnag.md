---
layout: post
title: "Customer Success Strategy: Using Bugsnag for proactive customer support"
publish_date: July 12th, 2017
author_name: Kelly Mason
author_twitter: kellymase
author_avatar: kellymase
categories: guides
hero_image: customer-success.jpg
---

An essential tool we use for customer support at Bugsnag is Bugsnag. It may be surprising that an [error monitoring](https://www.bugsnag.com/) tool is so central to supporting our customers, but we rely heavily on the error information in Bugsnag to help us provide great customer experiences.

Most helpful is having all the data about bugs or usability issues easily accessible. We've eliminated the burden of asking our customers for information about a bug because we already have all the details our engineers need. And on top of that, we save time relaying these bits of information because everyone has access to the data. This leaves me free to work on proactive customer success projects to help delight our customers.

## The burden of support

It's common for support teams to face too much uncertainty when trying to handle technical customer support requests. All too often someone reports a bug which then turns out to be an error on the user’s side. Even worse, is when the error is unreproducible, meaning you have to tell the user you won’t be fixing the issue.

If you’ve done support before, you can likely relate to that dejecting feeling of spending hours trying to narrow down an issue to no avail. On the other hand, we’ve all been the customer wondering and waiting what in the world could be taking so long?

Before being on a team that uses Bugsnag, this exact scenario was a common way I’d spend much of my time. I would raise a JIRA issue for the appropriate engineer or team to look over, and give my gut reaction on how I felt it should be prioritized.

Then, there would inevitably be extra information needed which I’d ask for from the customer and relay back to the engineer. On the customer’s side, it’s especially annoying to have to answer a whole series of questions after already having experienced a problem.

At this point, it has taken far too long (sometimes days, depending on the customer’s and the engineer’s response times!), the customer is unhappy, and there is still a lot of guesswork involved in deciding whether action needs to be taken, and how urgently. Ouch!

## Using error monitoring for faster resolutions and happier customers

Having Bugsnag around for support speeds up our interactions with customers a great deal, and we usually know what's going on easily. Here are a two typical examples of support conversations with our users.

### Example: A user reports an issue and Bugsnag tells us what happened

If a user writes in about a technical issue, it’s likely Bugsnag already has all the information surrounding that error.

#### Step one: A user writes in

> Hey Bugsnag,
>
I can’t get my JIRA integration to work. Is there a bug?
>
Sincerely,
Johnny McCustomer

This could be the result of any number of things. You could try to track down the issue by asking the customer exactly what steps they took, what values they entered for each field, and then what error message (if any) they received. Or...

#### Step two: Search Bugsnag for the error

I'll look in our *Integrations project* for any events associated with the user, JIRA, and/or the time frame leading up to the submission of the support request. Ah, found something!

![Stack trace of integration error in support](/img/posts/integration-error-support.png)

#### Step three: A quick response to the customer

The report has all the information I need to understand what the problem is and I can then explain to the customer what went wrong and what they need to do.

> Hey Johnny,
>
I was able to locate the source of the issue - when you attempted to link a Bugsnag error to a JIRA issue, JIRA returned the following error message:
>
“Project key is incorrect”
>
In this case, you’ll need to insert the correct project key on the JIRA configuration menu.

And that's it! These kinds of issues are resolved quickly, and the customer knows how to move forward.

### Example: A user writes in about a bug that's already being fixed

In the case where the problem is a bug on our end, things may go slightly differently, but a lot of times an engineer has seen the error report come in and is already working on fixing it.

#### Step one: A user writes in

> Hi Bugsnag,
>
Help! I want to change my plan, but I can’t.
>
From,
>Kallie Bugsnaggerson

#### Step two: Search Bugsnag for the error

I'll [filter errors](https://docs.bugsnag.com/product/filtering-dashboard/) for the user’s email address.

![Filter for user email when responding to support requests](/img/posts/user-filter-support-error.png)

Then, I find this error:

![Stack trace for payment failure error](/img/posts/support-payment-error.png)

 Oh no! It looks like this user’s payment failed. Looking at the report, I can see it’s already been assigned to someone on my team, and that it's being tracked in JIRA. This makes it easy for me — instead of having to jump through the hoops I described above, my work here is nearly done. I just need to quickly write back to the customer.

#### Step three: A quick response to the customer

> Hi Kallie,
>
 Thanks for raising this issue to our attention. My engineers are in the process of fixing it, and we’ll make sure to update you as soon as there is a change.

From there all I have to do is wait for a notification that tells me the issue status has moved to *Done* and then relay that information to the customer. Easy!

## Empowering your support team to deliver value to your customers

A few customer reactions once using this approach can make it clear why error monitoring is so powerful for technical customer support. Not only does it improve your user’s experience, but it also empowers your support team. Instead of spending their time apologizing for bad experiences and ineffectively troubleshooting bugs, they can use their expertise to form relationships with customers and help them get additional value from your product.

Our support team at Bugsnag has been able to work on projects that take us beyond standard reactive support. We’ve expanded our [documentation](https://docs.bugsnag.com/product/) to include a help center where users can quickly get answers to common questions about Bugsnag. We’ve also been able to do more work related to our core mission by teaching our users best practices related to error monitoring. Some great examples include how to implement or [improve debugging processes](https://blog.bugsnag.com/debugging-workflow/), [how to prioritize errors effectively](https://blog.bugsnag.com/bug-prioritization/) so you feel confident splitting your time between debugging and feature building, or even language specific suggestions like [best practices for JavaScript error monitoring](https://blog.bugsnag.com/javascript-error-monitoring-best-practices/). Our support team has also been able to help our enterprise customers get more from Bugsnag by giving them full walkthroughs of our product as ongoing training.

All of these efforts go a long way in helping our users and are a better use of time (and morale) than traditional support.

## Conclusion

You can even go further than what I've described above and really build out a process with the ultimate goal of reaching out to any user you notice encounters a problem, even before they contact you. This is possible with Bugsnag because all your error data is stored by default, so you can find all users who have seen any given error. Utilizing Bugsnag in the technical support process is a win-win-win: the process is smoother for all involved, customers are happier, and your support team's time is freed up for bigger, better things. 

---

Bugsnag automatically monitors your applications for harmful errors and alerts you to them, giving you visibility into the stability of your software. Bugsnag can help your engineering *and* support teams take a proactive approach to errors and give your users a great experience with your product and company.

[Try Bugsnag for free](https://app.bugsnag.com/user/new).
