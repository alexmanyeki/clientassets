---
layout: post
title: How to choose a shard key for MongoDB
publish_date: March 18th, 2014
author_name: Conrad Irwin
author_twitter: conradirwin
author_avatar: conrad
categories: features
---

<b>TL/DR</b>. Shard using an index on `{_id: 'hashed'}` or <code
style="white-space:  nowrap">{projectId: 1, _id: 1}</code>.

A few months ago, we sharded our MongoDB cluster to give us two replica sets.
Last week we just added another new shard. Adding the first shard took a little
work, but we did it without downtime. Adding a new shard is now trivial.

## How does sharding work?

Sharding lets you split your MongoDB database accross multiple servers or, in
production, multiple replica sets. It's important to do this early because
MongoDB is harder to shard once you [have >512Gb of
data](http://docs.mongodb.org/manual/reference/limits/#Sharding-Existing-Collection-Data-Size). Vertical scaling can only get you so far.

To do this you tell MongoDB to use one of your indexes as a shard key. It then
divides your documents into chunks with similar shard keys. These chunks are
then spread out to your replica sets, in approximate shard key order.

<div class="medium">
  <img src="/img/posts/sharding.png" alt="hand drawn diagram of how mongo shards relate to file systems"/>
</div>

As you can see, everything depends on choosing the right shard key.

## What makes a good shard key?

MongoDB automatically ensures that each replica set contains the same number of
chunks, 2 in the image above, 6300 or so in the Bugsnag cluster. But that is
pretty much the only guarantee.

The choice of shard key determines three important things:

### 1. The distribution of reads and writes

The most important of these is distribution of reads and writes. If you're
always writing to one machine, then that machine will have a high write-lock-%,
and so writes to your cluster will be slow. It doesn't matter how many machines
you have in total, as all the writes will go to the same place. This is why you
should never use the monotonically increasing `_id` or a timestamp as the shard
key, you'll always be adding things to the last replica set.

Similarly, if all of your reads are going to the same replica set, then you'd
better hope that your working set fits into RAM on one machine. By splitting
reads evenly across all replica sets, you can scale your working set size
linearly with number of shards. You will be utilising RAM and disks equally
across all machines.

### 2. The size of your chunks

Secondarily important is the chunk size. MongoDB will split large chunks into
smaller ones if, and only if, the shard keys are different. If you have too
many documents with the same shard key you end up with [jumbo chunks](http://books.google.com/books?id=pAbSHFi4WSAC&pg=PT142&lpg=PT142&dq=jumbo+chunks&source=bl&ots=Dt8gNyn5w5&sig=Tg9Ak5puKDIZyBVPoIzvJwWRFy4&hl=en&sa=X&ei=elUjU-6bJo_0oATFvYK4CQ&ved=0CHMQ6AEwBQ#v=onepage&q&f=false). Jumbo
chunks are bad not only because they cause the data to be unevenly distributed
but also because once they grow too large you cannot move them between shards
at all.

### 3. The number of shards each query hits

Finally it's nice to ensure that most queries hit as few shards as possible.
The latency of a query is directly dependant on the latency of the slowest
server it hits; so the fewer you hit, the faster queries are likely to run.
This isn't a hard requirement, but it's nice to strive for. Because the
distribution of chunks onto shards is only approximately in order it can never
be enforced strictly.

## Good shard key schemes

With all of that knowledge, what makes a good shard key?

### Hashed id

As a first approximation you can use a hash of the `_id` of your documents.

```
db.events.createIndex({_id: 'hashed'})
```

This will distribute reads and writes evenly, and it will ensure that each
document has a different shard key so chunks can be fine-grained and small.

It's not perfect, because queries for multiple documents will have to hit all
shards, but it might be good enough.

### Multi-tenant compound index

If you want to beat the hashed `_id` scheme, you need to come up with way of
grouping related documents close together in the index. At Bugsnag we group the
documents by project, because of the way our app works most queries are run in
the scope of a project. You will have to figure out a grouping that works for
your app.

We can't just use `projectId` as a shard key because that leads to jumbo
chunks, so we also include the `_id` to break large projects into multiple
chunks. These chunks are still adjacent in the index, and so still most likely
to end up on the same shard.

```
db.events.createIndex({projectId: 1, _id: 1})
```

This works particularly well for us because the number of reads and writes for
a project is mostly independent of the age of that project, and old projects
usually get deleted. If that wasn't the case we might see a slight imbalance
towards higher load on more modern projects.

To avoid this problem in the future, we will likely migrate to an index on
`{projectId: 'hashed', _id: 1}` as soon as MongoDB supports compound indexes
with hashed values.
([SERVER-10220](https://jira.mongodb.org/browse/SERVER-10220)).

### In summary

Choosing a shard key is hard, but there are really only two options. If you
can't find a good grouping key for your application, hash the `_id`. If you
can, then go with that grouping key and add the `_id` to avoid jumbo chunks.
Remeber that whichever grouping key you use, it needs to also distribute reads
and writes evenly to get the most out of each node in your cluster.
