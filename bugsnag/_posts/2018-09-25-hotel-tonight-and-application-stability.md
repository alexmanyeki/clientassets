---
layout: post
title: The importance of application stability at HotelTonight
publish_date: September 25th, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Learn how the engineering teams at HotelTonight use application stability as a KPI to ensure the quality of their popular mobile applications.   
categories: engineering
hero_image: hotel-tonight.png
cover_image: hotel-tonight-cover.png
---

Application errors and the bugs your users experience can directly impact the success of your product and company. That’s why many leading companies and their engineering teams use [application stability](https://blog.bugsnag.com/stability-score/) as a KPI to help them stay on track and continually improve the stability of their application.

One such company is [HotelTonight](https://www.hoteltonight.com/) who use Bugsnag to ensure their application meets and exceeds their stability targets. We’ve recently shared [why application stability is such an important metric](https://blog.bugsnag.com/how-application-stability-impacts-business-growth/), and how it can [help your team effectively deal with software bugs](https://blog.bugsnag.com/application-stability-monitoring/), but to illustrate those points a little bit more, we’ll share some behind the scenes from HotelTonight and how they’re able to consistently deliver one of the highest rated and most popular travel apps.

## HotelTonight’s highly rated travel apps

HotelTonight is a popular mobile app that lets travelers find hotel accommodation at discounted rates. They help millions of travelers find great hotel deals, so any issues in the booking portion of their application could be problematic if left unattended.

Because they generate revenue primarily through their iOS and Android applications, the error budget naturally came into being as app crashes are directly tied to their success as a company. [Error budgets](https://landing.google.com/sre/book/chapters/embracing-risk.html) were first discussed by Site Reliability Engineers as a way to benchmark reliability in order to “balance the risk of unavailability with the goals of rapid innovation and efficient service operations.” The same concept can be used by product teams looking to balance building new features and fixing software bugs.

It became clear to the HotelTonight engineering team that they needed an easy way to get quick visibility into their application, and also a way to easily communicate that information to their executive team. And thus, the error budget at HotelTonight came to be.

## Application stability at HotelTonight

HotelTonight’s iOS and Android applications, as well as their backend services, are all monitored by Bugsnag, but the most valuable metric is the stability score for their projects.

To learn more about how HotelTonight are managing application stability, we chatted with Doug Suriano, iOS Manager. Doug explained that the stability score is extremely important at HotelTonight because it is a reliable, at a glance metric that immediately tells them the health of their application.

When the engineering team leads or the executive team need quick information, the stability score is invaluable because it offers them the high level of visibility they need. They are continually monitoring it, but don’t always need to dive too deeply into it or sit down and investigate. Instead, they have this one data point they can turn to and understand immediately the status of application stability.

## HotelTonight’s approach to application stability

### Setting the error budget

Their worst case scenario error budget is set to 1%, but for the most part, they prioritize keeping it well below that as they have a KPI to keep it as low as possible. In fact, Doug explains that, “over time having this KPI has really motivated and incentivized our team to take a second look when coding new features, to think through potential bugs, and code defensively against them.” In addition to monitoring this number and promptly fixing bugs, this added layer of keeping bugs top of mind has helped them improve their stability even further over time.

### Prioritizing crashes in business critical code

Because their application helps customers find the best hotel deals, they consider the booking portion of their application high-priority. Any bugs that appear in that section of their code are investigated and prioritized swiftly to ensure their users are able to easily book accommodation.

### Keeping crashes top of mind

The mobile team leads and the QA team are predominantly responsible for checking the stability score and incoming crashes everyday, but especially after a new release. Apart from the stability score, they will check to see what types of crashes are happening and where they are happening in the application. If a bug is deemed critical enough, they will push a hotfix as soon as possible; otherwise the fix will be prioritized to go out in the next release. Their goal is to handle bugs swiftly and not let them sit for too long.

### We’re in this together when bugs happen

Stability is everyone’s responsibility and when things go wrong, it’s important not to play the blame game. Doug explains that having a clear metric that everyone is working towards really helps with that, and so when bugs do happen (which Doug reminds us is inevitable), the person most likely to be able to fix it is the last person who touched the code. “It’s not about blame, it’s just about taking accountability and working hard to fix it. We have a team effort mentality and culture.”

## Application stability advice from HotelTonight

HotelTonight’s error budget has been extremely successful for their team. Not only is it an easily understood metric by their executives, it has even incentivized their engineering team to produce better code, since they know any bugs that come up will be their responsibility to fix.

Doug shares some of his best tips for other teams looking to begin monitoring their stability score and setting a target.

* “**Set a reasonable, well-thought out target for your team.**”
“The number you pick should not be arbitrary or random in any way. This requires having a solid understanding of your product and audience, and the ways that number can be impacted.” If setting a target that’s too low, you may have bugs impacting your user experience. If setting an overly ambitious target, it will lose meaning as your team will have difficulty maintaining it.

* “**Remember it’s a process.**”
“You can’t expect results overnight, and you can’t set the target and forget it. Your stability target requires continuous monitoring and improvement. You need to keep errors top of mind constantly when prioritizing user experience.”

* “**Try to anticipate bugs.**”
Help yourself reach your targets by trying to anticipate bugs, whether that be when coding new features or making a new release. “Bugs rarely happen for no apparent reason. They’re connected to the changes you make or your releases. Keep bugs top of mind and monitor stability at these critical moments.”

* “**Know what to prioritize within your application.**”
“Know your product and prioritize the most important bugs first. For us it’s the booking section of our application, and for you it might be different, but make sure you know where to look first. Because it’s not just about fixing crashes; it’s about fixing crashes that have the biggest impact on your customers.”

* “**Focus on building your product.**”
At HotelTonight, they rely on Bugsnag for stability monitoring and use the API to display their stability score on a monitor for their team to easily see. That way they can focus on their core business application while still having the stability score and information they need.

---

Application stability is a key metric for product and engineering teams and the Bugsnag stability score is a fantastic way to track it easily. [Visit our blog post](https://blog.bugsnag.com/stability-score/) to learn more about the Bugsnag stability score.
