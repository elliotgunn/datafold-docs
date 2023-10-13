---
id: cross-database_diffing
title: Cross-database diffing
---

Data diff can compare data across databases (e.g., PostgreSQL \<\> Snowflake or between two MySQL instances), fast and without transfering the actual data over the network while providing full row/column/value-level detail into the discrepancies.

## How it works

When comparing data across databases, data diff leverages checksumming and interval search to diff the data fast and at minimal cost. Data diff can quickly assess both the magnitude of differences and identify specific rows, columns, and values with differences **without having to copy entire dataset over the network**which makes it efficient and scalable to trillion-row/terabyte-size datasets.


### High-level algorithm


data diff splits the table into smaller segments, then checksums each segment in both databases. When the checksums for a segment aren't equal, it will further divide that segment into yet smaller segments, checksumming those until it gets to the differing row(s).

This approach has performance within an order of magnitude of count(\*) when there are few/no changes, but is able to output each differing row! By pushing the compute into the databases, it's much faster than querying for and comparing every row.


Consider a scenario with an orders table with 1M rows. Data is replicated contionously from DB-1 to DB-2:



```
┌─────────────┐                        ┌─────────────┐
│     DB1     │                        │     DB2     │
├─────────────┤                        ├─────────────┤
│             │                        │             │
│             │                        │             │
│             │  ┌─────────────┐       │ table with  │
│ table with  ├──┤ replication ├──────▶│ ?maybe? all │
│lots of rows!│  └─────────────┘       │  the same   │
│             │                        │    rows.    │
│             │                        │             │
│             │                        │             │
│             │                        │             │
└─────────────┘                        └─────────────┘
```

In order to check whether the two tables are the same, data diff splits the table into 10 segments. This parameter is called `Bisection Factor` and can be configured.

We also have to choose which columns we want to checksum. In our case, we care about the primary key, `id` and the timestamp column `updated_at` which is updated every time the row is, and we the DB1 has index on it.

Data diff starts by querying both databases for the `MIN(id)` and `MAX(id)` of the table. Then it splits the table into 10 segments of 1M/10 = 100K keys each:

```
┌──────────────────────┐              ┌──────────────────────┐
│         DB1		   │              │         DB2          │
├──────────────────────┤              ├──────────────────────┤
│      id=1..100k      │              │      id=1..100k      │
├──────────────────────┤              ├──────────────────────┤
│    id=100k..200k     │              │    id=100k..200k     │
├──────────────────────┤              ├──────────────────────┤
│    id=200k..300k     ├─────────────▶│    id=200k..300k     │
├──────────────────────┤              ├──────────────────────┤
│    id=300k..400k     │              │    id=300k..400k     │
├──────────────────────┤              ├──────────────────────┤
│         ...          │              │         ...          │
├──────────────────────┤              ├──────────────────────┤
│      900k..100k      │              │      900k..100k      │
└───────────────────▲──┘              └▲─────────────────────┘
                    ┃                  ┃
                    ┃                  ┃
                    ┃ checksum queries ┃
                    ┃                  ┃
                  ┌─┻──────────────────┻────┐
                  │        Data diff        │
                  └─────────────────────────┘


```

After running the checksum queries on both sides, we see that all segments are the same except id=100k..200k:


```
┌──────────────────────┐              ┌──────────────────────┐
│         DB1          │              │         DB2          │
├──────────────────────┤              ├──────────────────────┤
│    checksum=0102     │              │    checksum=0102     │
├──────────────────────┤   mismatch!  ├──────────────────────┤
│    checksum=ffff     ◀──────────────▶    checksum=aaab     │
├──────────────────────┤              ├──────────────────────┤
│    checksum=abab     │              │    checksum=abab     │
├──────────────────────┤              ├──────────────────────┤
│    checksum=f0f0     │              │    checksum=f0f0     │
├──────────────────────┤              ├──────────────────────┤
│         ...          │              │         ...          │
├──────────────────────┤              ├──────────────────────┤
│    checksum=9494     │              │    checksum=9494     │
└──────────────────────┘              └──────────────────────┘
```

Now data diff will do exactly as it just did for the whole table for only this segment: split it into 10 segments!
However, this time, because each segment has 100k/10=10k entries, which is less than the `Bisection Threshold`, it will pull down every row in the segment and compare them in memory in Datafold Cloud:
```
┌──────────────────────┐              ┌──────────────────────┐
│         DB1          │              │         DB2          │
├──────────────────────┤              ├──────────────────────┤
│    id=100k..110k     │              │    id=100k..110k     │
├──────────────────────┤              ├──────────────────────┤
│    id=110k..120k     │              │    id=110k..120k     │
├──────────────────────┤              ├──────────────────────┤
│    id=120k..130k     │              │    id=120k..130k     │
├──────────────────────┤              ├──────────────────────┤
│    id=130k..140k     │              │    id=130k..140k     │
├──────────────────────┤              ├──────────────────────┤
│         ...          │              │         ...          │
├──────────────────────┤              ├──────────────────────┤
│      190k..200k      │              │      190k..200k      │
└──────────────────────┘              └──────────────────────┘
```

Finally data diff will output the `(id, updated_at)` tuple for each row that was different:


```
(122001, 1653672821)
```


<!-- TODO: ## Interpreting data diffs -->

## Performance considerations

While data diff functions very efficiently and, in most scenarios, is comparable to `COUNT(*)` operation in terms of performance, care should be applied when diffing large datasets.

### General


#### High percentage of differences


To best support common data validation scenarios for data replication and migration, data diff is optimized to perform best when the % of different rows/values is relatively low.

While data diff does best effort to leverage the database own compute and to minimize the amount of data sent over the network, in the worst case scenario (100% of rows and values are different), data diff will eventually transfer every row of the dataset over the network (which is very slow).

In order to avoid long-running diffs, we recommend following:

1. Start with diffing primary keys to identify the completeness in terms of rows instead of diffing all columns
2. Set a `diff limit` parameter that automatically terminates the diffing process after X% of rows were identified as different. This is a very useful parameter, as in most testing scenarios, after identifying that the table has a large percentage of missing/different rows, obtaining the full detail on the differences is impractical.



#### Parallelism

Consider increasing the number of concurrent connections to the database in Datafold Cloud that allow executing queries in parallel.

#### Column Details

The fewer columns are selected for diffing, the faster data diff will execute. On one extreme, you can verify every column; on the other, you can verify only primary key and `updated_at`, if you trust it enough. You can also only verify id if you're interested in only presence, such as to detect missing hard deletes. You can do also do a hybrid where you verify `updated_at` and the most critical value, such as a money value in amount, but not verify a large serialized column like json_settings.

#### Primary Key Distribution

If there are very large gaps in the primary key column (e.g., 10s of millions of continuous rows missing), then data diff may perform less efficiently, doing lots of queries for ranges of rows that do not exist.


#### Very large tables
If the table is very large, consider a larger --bisection-factor. Otherwise, you may run into timeouts.

If there are a lot of changes, consider a larger --bisection-threshold.


### OLTP databases

#### Indexes

For row-oriented transactional databases such as PostgreSQL or MySQL, it is highly recommended to create indexes on the columns to be compared. Preferably a compound index. 
