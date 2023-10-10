---
id: in-database_diffing
title: In-database diffing
---

## How it works

When diffing data within the same physical database or data lake namespace, data diff compares data by executing various SQL queries in the target database. To provide comprehensive detail into the differences on a row, value, and column-level, data diff leverages several JOIN-type queries, as well as various aggregate queries to compute differences in metrics and distributions.

### What types of data can data diff compare?

Data diff can compare data in tables, views, and SQL queries in relational databases and data lakes.


## Creating diffs

Diffs can be created in multiple ways including:

- Interactively via Datafold App 
- Through Datafold Cloud [API](/reference/cloud/rest_api)
- As part of a CI workflow in Deployment Testing


The basic inputs required to run a diff are data source connection, names of the datasets to compare and the primary key (column or a combination of columns that uniquely identify a row in the dataset).


The following parameters and options can be used to configure diffs:

#### Diff Type

* Table - use data in a table reference to compare
* Query – use data produced by an arbitrary SQL query to compare

#### Dataset

Reference to a relational dataset (table or view) to compare

#### Time travel point

For databases that support time travel (querying data as of particular time), data diff can use a specified timestamp to query the chosen version of the dataset.

#### Filter

SQL filter clause that will be inserted after `WHERE` to filter the dataset. Example: `created_at > '2000-01-01'`


#### Column remapping

If you have semantically identical columns with different names e.g. `userID` and `user_id`, you can specify mapping to compare them.


#### Primary key

Column or a list of columns that comprise the primary key for the dataset. Note that the primary key doesn't need to be formally defined in the database or anywhere – it is used to uniquely identify a row in the dataset during diffing.


#### Time series dimension column

Sometimes it can be helpful to plot diff results over time to identify any time-based patterns. For example, you may notice that a given column becomes different between databases after a certain date. To plot diff over time, provide a time dimension for the dataset.


#### Materialize diff results to table

While Datafold UI provides advanced exploration of diff results, sometimes it can be helpful to materialize diff results back to the database to investigate them further with SQL or for audit logging.


### Sampling

Sampling can be helpful when diffing extremely large datasets. When sampling is enabled, Datafold compares a randomly chosen subset of the data. Sampling is the trade-off between the diff detail and time/cost of the diffing process. For most use cases, sampling does not reduce the information value of diff as it provides the magnitude and examples differences. Sampling is less ideal when you need to audit every changed value with 100% confidence which is rare in practice.



#### Sampling Tolerance
Maximum percentage of rows in the dataset that we are OK with being different without us spotting the differences. When sampling is enabled, not all rows are considered which means that there is a probability of missing a difference between datasets. This parameter defines what is the maximum difference that we "don't care about".

Default: 0.001%


#### Sampling Confidence
Minimum confidence level that the number of rows with differences is less than the rate specified in **Sampling Tolerance**. E.g., with Tolerance at 0.001% and Confidence at 99%, we are 99% confident that there are at most 0.001% of different rows that we didn't account for in the diff results.

Default: 99%


#### Sampling Threshold
Sampling will be disabled if total row count of the largest table is less that the threshold value (because it's easier and fast enough to diff without sample).


#### Sample Size

Calculated estimated number of rows in combined sample of Dataset A and Dataset B used for diffing. If duplicate primary keys are present or filters are used, this estimate will be larger or smaller than the actual sample, respectively.

:::tip 
Although configuring sampling can seem overwhelming at first, a good rule of thumb is to stick to defaults and tweak them as needed. It is also helpful to tweak the parameters to see how they impact the sample size to make the trade off between performance and accuracy.
:::

### Comparing Numeric Columns


When comparing numerical columns or of `FLOAT` type which is inherently noisy, it can be helpful to specify tolerance levels for differences below which the values are considered equal.

#### Tolerance for Floats

Acceptable (relative or absolute) delta between numeric values to determine a matched value.


<!-- TODO: ## Interpreting data diffs -->

## Performance considerations

### How scalable is data diff?

Since data diff pushes down the compute to your database (which usually has sufficient capacity to store and compute the datasets in the first place), the diffing speed and scalability depends on the performance of the underlying SQL engine. In most cases, the diffing performance is comparable to typical transformation jobs and analytical queries running in the database and has scaled to trillions of rows.

### Optimizing diff performance

When diffs run longer or consume more database resources than desired, consider the following measures:

1. **Enable [Sampling](/data_diff/in-database_diffing#sampling)** to dramatically reduce the amount of data processed for diff
2. **Add a [SQL filter](/data_diff/in-database_diffing#filter)** if you actually need to compare just a subset of data (e.g., for a particular city or last two weeks) adding a filter is a great way to speed up diffing
3. Consider **increasing resources** available to Datafold in your data warehouse (e.g. for Snowflake, increase warehouse size)


