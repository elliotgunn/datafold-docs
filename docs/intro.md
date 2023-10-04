---
id: intro
slug: /
title: Introduction
hide_table_of_contents: true
---

## What is Datafold?

Datafold is an end-to-end data quality platform that automates data testing.

## Why Datafold?

Datafold automates the most error-prone and time-consuming parts of the data engineering workflow: testing data to guarantee its quality. Data quality (just like software quality) is a complex and multifaceted problem. Datafold relies on three core principles for solving data quality:


### Embedding data QA in the workflow

Data quality is a byproduct of a great data engineering workflow. That means, data testing needs to be deeply embedded in the development and deployment process for data products: in CI/CD for deployment testing and IDEs for testing during development.


### Shifting data quality to the left

Learning about data quality issues in production is already too late since bad data most likely already negatively impacted the business. 

Instead, Data quality issues should be addressed before the code is deployed. Most data quality issues are bugs in the code that processes data, and applying a proactive, shift-left approach is the most effective way to achieve high shipping velocity and data quality simultaneously.

### Leveraging metadata

Lack of metadata (data about data) is the biggest gap in the data engineering workflow. Datafold brings powerful insights such as data diffing and column-level lineage to the data engineering workflow to help validate the code, the underlying datam, and to fully understand the dependencies in complex data pipelines.


## Key features


### Deployment testing in CI/CD

See any SQL code change affects the data, downstream metrics, BI dashboards and applications, right in the pull request.

### Development testing

When developing with dbt, preview the impact of your changes to SQL code to develop faster with higher confidence.


### Column-level lineage

Trace data dependencies on a field-level from source data to BI applications. Datafold builds the lineage graph automatically by analyzing SQL logs and metadata.

### Data migration testing

Compare legacy and new data stacks within or across databases when migrating data and workloads from legacy databases and transformation tools to modern data stack, e.g. Oracle > Snowflake or Informatica > dbt.

### Data replication testing

Continuously monitor data consistency across databases when replicating data at scale. Datafold compares data efficiently and notifies you when the data is corrupted or out-of-sync.