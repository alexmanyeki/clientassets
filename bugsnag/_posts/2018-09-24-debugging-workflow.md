---
layout: post
title: Strategies for improving your debugging workflow   
publish_date: September 24, 2018
author_name: Kristine Pinedo
author_twitter: kristine_pinedo
author_avatar: kristine
excerpt: Learn debugging workflow best practices in order to make debugging a swift and straightforward task.   
categories: guides
hero_image: debugging-workflow.png
cover_image: debugging-workflow-cover.png
---

It’s essential to have [application stability monitoring](https://www.bugsnag.com/) in place to know when you need to spend time debugging errors that could affect your users. But once you begin investigating bugs, having a solid workflow in place for debugging can make the process much more swift, simple, and straightforward. That way, you can quickly improve your app's stability, and hopefully relieve some of the burden associated with finding and fixing bugs.     

Here are some best practices to implement into your debugging workflow.

# Organize your setup  

### Decide how to triage and move bugs into your workflow

Will you have a weekly bug rotation? Or maybe you'll assign someone to be the Bug Warrior 💪 for an entire sprint? However you choose to define responsibilities, it's important to have a process in place that your entire team is aware of and agrees to.

Making one person responsible for triaging and moving bugs into your workflow for a set period of time makes it less likely that harmful bugs will go unnoticed. It's also smart to have as many of your teammates on the rotation as possible so that every can see the impact of bugs and feel the pain that users feel when they encounter errors.

Tip — The engineer on bug duty doesn't necessarily need to be the person fixing the bug. Many times they won't actually be the best person to do it if they weren't the last one to change the code. However, having a set of eyes on those incoming bugs will make sure nothing is slipping through the cracks.

### Bookmark error segments for debugging

When it's your turn on the bug rotation, where will you start? Having a segmented view of the errors you care about most will save you time in your debugging workflow. In Bugsnag, you can create a [bookmarked search](https://blog.bugsnag.com/shared-bookmarks/) and share it across your team so that anyone on bug duty can go straight to the most relevant errors with a single-click.

Using [search in Bugsnag](https://blog.bugsnag.com/error-search-in-bugsnag/), which includes quick filters, custom filters, simple search, and the search builder, you can easily surface error segments that need continual monitoring. For example, you can search for:

- production errors seen in, or introduced in, your latest release
- unhandled errors only from the last day
- errors from the portion of code in your app for which you’re responsible

![Release quick filter](/img/posts/release-quick-filter.png)

### Integrate with Jira to automate the process

As you're triaging errors and assessing their impact, you will need to move the bugs that need fixing into your issue tracker. You can integrate Bugsnag with Jira and [other issues trackers](https://www.bugsnag.com/integrations/#issue) to automate this process and save yourself some time and hassle.

From your Bugsnag dashboard, you can click to create a ticket in your issue tracker. It will also automatically sync error statuses between platforms, so when you mark an error fixed, its corresponding ticket will also be marked complete.

![issue tracker sync](/img/posts/issue-tracker-automation.png)

Tip — Also integrate with Slack so you can receive new error alerts in your engineering channel.

![Slack notifications](/img/posts/slack-workflow-buttons.gif)

# Workflow

### Start your day at the Releases dashboard

Begin your debugging workflow by checking the Releases dashboard first. The stability score for each release will give you a high-level indicator of how your app's stability is looking. If your release stability is average or above, it will appear green. If the release stability is below average, it will appear red so you'll know to immediately begin investigating. The releases dashboard will even show you a list of the top 5 errors occurring in the release as a place to start.    

![Release dashboard with stability score](/img/posts/stability-score-releases-dashboard.png)

### Investigate errors from bookmarked searches

Since you spent the time setting up shared bookmarks, you can continue your debugging workflow by going to your saved searches to triage errors.

![Shared bookmarks](/img/posts/shared-bookmarks.png)

### Take action on the error

From your inbox, you can use Bugsnag's workflow states to move errors through your debugging process. You can mark errors as Fixed, Ignored, or Snoozed to clear them away and keep a focused view of errors. You can also create an issue for the bug as we mentioned before, or even assign the bug to a teammate.

By using the workflow states, you can maintain a concise list of errors, and avoid noise that makes debugging more difficult.  

Tip — Errors you mark as Fixed are also monitored in Bugsnag. If they come back in a new version of your application, they are detected as regressions. You’ll receive immediate alerts when this happens, and Bugsnag reopens the error and its issue in your issue tracker. This way, you’ll have the full history available to help you investigate the bug.

### Collaborate on bug fixes and keep your team updated

When you pinpoint an error that needs a fix, you can assign it to the appropriate team member who will be the best placed to fix it. You can also collaborate in comments to get more context on the error and get to a fix faster. Making sure someone is accountable for reproducing and pushing a fix will ensure the bug doesn't get lost.

If you need to update your team about the status of the bug, or if there are questions about the fix, having a conversation around the error can also be useful so there’s an easily accessible record of what was done. That way, if the error ever returns, you’ll be able to see a history of what happened.

![Activity feed](/img/posts/built-in-workflow.png)

---

These simple tips can help you and your team make your debugging workflow smoother and hopefully a more straightforward process. And the more efficient you become at debugging, the more time you’ll have to build better features for your users.
