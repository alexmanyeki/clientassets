---
layout: post
title: MongoDB 2.6 Highlights
publish_date: 2014-02-25
author_name: Simon Maynard
author_twitter: snmaynard
author_avatar: simon
categories: engineering
---

When MongoDB 2.6-rc0 was released earlier this week I decided to take a look at the [Release Notes](http://docs.mongodb.org/master/release-notes/2.6/) to see what I have to look forward to when 2.6 is finally released and production ready.

[Bugsnag](https://www.bugsnag.com) uses MongoDB as our primary document store, storing terabytes of data in our cluster, so I read over the release notes with a keen eye.

There are a few really cool features that are well worth reading about, and also a few changes that could bite you if you don't have advanced warning about them, so here's my overview.

## Index Improvements

This release also brings numerous [index improvements](http://docs.mongodb.org/master/release-notes/2.6/#index-improvements), some of which are going to be huge for us at Bugsnag.

### [Index Intersections](http://docs.mongodb.org/master/core/index-intersection/)

I'm really looking forward to this on our production system. This allows multiple indexes to be used to satisfy a single query so will really help any system that uses a large number of fields to filter down a set of documents.

Generally you will still need a compound index when you are both filtering and sorting data, as mongo is unable to use an index intersection to resolve a sort on its own. As always, make sure you run [explain](http://docs.mongodb.org/manual/reference/method/cursor.explain/) on a query before pushing it live and keep an eye on the [profiler](http://docs.mongodb.org/manual/tutorial/manage-the-database-profiler/).

### [Background Index Build On Secondaries](http://docs.mongodb.org/master/release-notes/2.6/#background-index-builds-replicate-to-secondaries)

If you read from your secondary replicaset members this one is huge. Previously you would have to take secondaries out of your replicaset and manually build indexes in the background ahead of time to avoid downtime. Now mongo supports background index builds on secondaries as well as primaries, and this is going to be really useful for us to reduce the ops overhead of adding an index.

## Aggregation Pipeline Changes

Bugsnag has started to make much more use of the aggregation framework, and performance has already come a long way. So I was keen to take a look at the improvements in the [aggregation pipeline](http://docs.mongodb.org/master/release-notes/2.6/#aggregation-pipeline-changes).

### [$size](http://docs.mongodb.org/master/release-notes/2.6/#new-size-operator-for-the-aggregation-pipeline)

The size operator returns the size of an array. This is one thing I've found myself needing fairly regularly to sort by array lengths for example, so it's a good thing for mongo to have.

### [Aggregation now return cursors](http://docs.mongodb.org/master/release-notes/2.6/#aggregation-operations-now-return-cursors)

This means that results sets aren't limited in size, as previously all aggregations were limited to returning 16 megabytes of data.

### [Improved sort performance](http://docs.mongodb.org/master/release-notes/2.6/#improved-sorting)

Probably related to the cursor change for aggregations, MongoDB's aggregation *sort* and *group* keywords have had their performance bumped.

## $min And $max Operators

[$min](http://docs.mongodb.org/master/release-notes/2.6/#min-update-operator) and [$max](http://docs.mongodb.org/master/release-notes/2.6/#max-update-operator) operators have been added to support better atomic upserts that will only update a field if its value is less than or greater than the supplied value. This is something I've found myself wanting to do with mongo, and is always tricky without transaction support, so for me this is a welcome addition.

## Strict Index Key Length Limit

In the current production releases of Mongo, the length of indexed fields in a document [may not exceed 1024 bytes](http://docs.mongodb.org/manual/reference/limits/#Index%20Key). When you add a document that breaks this limit to an indexed collection, the document is still stored in the collection, but is not included in the index.

Unfortunately this means that when searching for that document using the index, it will not be returned as part of the results. [Mongo 2.6](http://docs.mongodb.org/master/release-notes/2.6/#stricter-enforcement-of-index-key-length-limit) makes a change to prevent a document being added to a collection if its indexed size would exceed the 1024 byte limit. This is a sensible default as it frontloads the error condition to being an obvious error, rather than just not returning a document when using the index which can be very tricky to diagnose!

## New Default Allocation Strategy

In 2.6 MongoDB has changed the [default document allocation strategy](http://docs.mongodb.org/master/release-notes/2.6/#new-default-allocation-strategy) to be [usePowerOf2Sizes](http://docs.mongodb.org/master/reference/command/collMod/#usePowerOf2Sizes). Pre-existing collections will not be affected, but all new collections will by default use this strategy.

The `usePowerOf2Sizes` strategy limits data fragmentation by making document sizes more predictable, which also means that your storage needs are more predictable. It is worth noting that the old strategy is still available for use, and just the default is changing. I think this is a positive change as it will do something sensible for most people, leaving those with unusual use cases to tweak for their storage needs.

## Mongo Shell Improvements

A great tip for improving your life when using the mongo shell is to specify js commands that you want to be run each time you open a mongo shell in ~/.mongorc.js. I use this to define common functions that I want to use in the shell to make my life easier when debugging issues. So I have defined

```javascript
// kills long running ops in MongoDB (taking seconds as an arg to define "long")
// attempts to be a bit safer than killing all by excluding replication related operations
// and only targeting queries as opposed to commands etc.
// Improved by comerford in https://gist.github.com/comerford/9248866

killLongRunningOps = function(maxSecsRunning) {
    db.currentOp().inProg.forEach( function(op) {
        if (op.secs_running > maxSecsRunning && op.op == "query" && !op.ns.startsWith("local")) {
            print("Killing opId: " + op.opid
                    + " running over for secs: "
                    + op.secs_running);
            db.killOp(op.opid);
        }
    });
};
```

which I sometimes use in an emergency situation to rectify a performance problem. You can easily script the mongo shell and it's a great timesaver when you have an issue to diagnose to have these scripts upfront.

In the 2.6 release, MongoDB now supports a [global mongorc file](http://docs.mongodb.org/master/release-notes/2.6/#tool-improvements) so I can share these shortcuts with the rest of my team, which is awesome.

## Check out the Changelog

There's lots more in this release than I haven't gone over here, so you should definitely check out the [changelog](http://docs.mongodb.org/master/release-notes/2.6/). Let us know what you are looking forward to from Mongo 2.6 [on twitter](https://twitter.com/bugsnag).
