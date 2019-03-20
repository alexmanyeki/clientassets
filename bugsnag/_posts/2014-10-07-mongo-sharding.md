---
layout: post
title: "A Year Running a Sharded MongoDB Cluster: Tools & tips from the frontline"
publish_date: October 7th, 2014
author_name: Simon Maynard
author_twitter: snmaynard
author_avatar: simon
categories: engineering
---

We've used MongoDB since the very first version of Bugsnag, and we've been very happy with the database in general. Over the last year or so, we've moved to a sharded cluster, and I've discovered some techniques for managing it along the way. Here is a collection of the things I wish I'd known about sharding before we started.

## Tag Aware Sharding

[Tag aware sharding](http://docs.mongodb.org/manual/core/tag-aware-sharding/) is an awesome feature, but suffers from being under appreciated. [Here](http://askasya.com/post/taggedcollectionbalancing) is a great blog post by [Asya](http://askasya.com/) on tag aware sharding that was actually the inspiration behind our particular use case.

When we first sharded, we found that our unsharded collections could be slow to respond when the primary shard was hit hard. On every page load in Bugsnag, we'll hit the users collection, for example, to check if someone is logged in. When an app sending lots of data to Bugsnag was on the primary shard, it would cause everyone's requests to be slow. To fix this we added a tag for every sharded collection, only applying it to our large shards that are designed to cope with the load needed to store crashes. This means that our users collection is stored on a smaller machine where the whole dataset can fit in memory.

## Empty chunks

We had an issue when deleting old data would leave empty chunks lying around in our shards. This sounds innocuous enough, but it actually leads to shards being unbalanced. The way that the balancing algorithm works is to adjust the number of chunks across all your shards, but it ignores the size of each chunk. If some of those chunks are empty and others are the full 64MB, then you can quickly get one full shard with the other half empty. In MongoDB 2.6, a new command was added to merge an empty chunk into its neighbor if it's on the same shard. Unfortunately this is a manual process, so I've written a script to loop through the chunks, merging any that are empty. You can take a look [here](https://github.com/snmaynard/mongo-scripts/blob/master/merge-chunks.js). This will presumably be automated in future versions, but for now I'm happy to run this script.

## Large chunks

Large chunks are when a chunk is larger than the configured chunk size on a shard. We've seen one shard that had nearly double the configured chunk size across its dataset. I wrote a script to go through and resize chunks that were too large, and that is available [here](https://github.com/snmaynard/mongo-scripts/blob/master/split-chunks.rb). The script has to connect to both a mongod and mongos instance, so it's written using Mongoid in Ruby. Running this in our cluster split some of the chunks thousands of times, and meant the dataset could spread much more evenly.

## Orphaned documents

Some machines started using more space than the rest the longer they were live, and we concluded this was because of [orphaned documents](http://docs.mongodb.org/manual/reference/glossary/#term-orphaned-document). These are documents that are on a shard, but don't belong to a range associated with it, and therefore aren't accessible from a mongos instance. These can safely be removed, and in our case, ended up freeing up a  significant portion of disk space on one shard. MongoDB has an awesome  [command](http://docs.mongodb.org/manual/reference/command/cleanupOrphaned/) that you can run to remove orphaned documents, and is well worth running if you suspect this.

## MoveChunk directory

The [moveChunk directory](http://docs.mongodb.org/manual/faq/sharding/#is-it-safe-to-remove-old-files-in-the-movechunk-directory) saves the chunks that are moved from a shard for just in case situations. Unfortunately I have seen this directory use over 100GB which is pretty excessive! These files are safe to remove once the move is completed, so I've set up a cron job to regularly remove the directory. MongoDB does support an [option](https://github.com/mongodb/mongo/blob/c9ae1354004e5767c45160b4efa7ad77d0185c0d/src/mongo/db/mongod_options.cpp#L372) to disable this functionality that I plan to play around with.

## Monitoring a sharded environment

Monitoring a sharded environment presents additional challenges over that of a single replicaset. I've discovered a few tricks for seeing what's going on in the cluster.

### Shell commands

[db.collection.getShardDistribution()](http://docs.mongodb.org/manual/reference/method/db.collection.getShardDistribution/)—This allows you to see how a collection is distributed across your shards. It's really useful because you can see when a collection is significantly larger on one shard than on any of the others.

[db.stats()](http://docs.mongodb.org/manual/reference/method/db.stats/)—This works very similarly to the way it does in a standard replicaset, except it breaks down the output for each shard which is helpful for tracking data sizes. You can also pass in `1024*1024*1024` to get the data sizes in GB!

[sh.status()](http://docs.mongodb.org/manual/reference/method/sh.status/)—This command shows you the distributions of chunks across your entire cluster. It's useful for checking the status of the balancer.

### Mongostat

[Mongostat](http://docs.mongodb.org/manual/reference/program/mongostat/) is a really useful tool when you're trying to diagnose an issue in real time across a cluster. You can run `mongostat --discover` on a mongos machine to see the top level metrics for every machine in your entire cluster. This helps to quickly spot issues with load in real time, and can point you in the direction of a machine that needs closer attention.

Running an efficient MongoDB sharded cluster isn't particularly difficult, but from time to time there are some mild annoyances you need to take care of. I have open sourced my scripts on [GitHub](https://github.com/snmaynard/mongo-scripts) so you can use them as inspiration for your own. Feel free to send me a pull request to add new scripts!
