---
id: what_is_data_diff
title: What is data diff
---

Data diff is a tool that compares datasets fast, within or across databases.

There is a lot you can do with data diff: you can test SQL code by comparing development or staging environment data to production, or compare source and target data to identify discrepancies when moving data between databases.

  
  

### Why diff data?

  

Just as diffing code and text is fundamental to software engineering and working with text documents, diffing data is essential to the data engineering workflow.

  

In data engineering, both data and the code that processes it are constantly evolving. Without the ability to easily diff data, understanding and tracking data changes becomes challenging. This slows down the developement process and makes it harder to ensure data quality.

  
  

### Is data diff open-source?

  

Yes, [data-diff](https://github.com/datafold/data-diff) is an open-source Python package. We chose to open-sourced data-diff because we believe that diffing is a fundamental capability in data engineering that every engineer should have access to.


### How does open-source data diff compare to Datafold Cloud?

- data-diff unlocks an essential capability of diffing data for data engineers, whereas Datafold Cloud provides end-to-end solutions for automating testing.
- Datafold Cloud uses [data-diff](https://github.com/datafold/data-diff) as part of its platform alongside column-level lineage and ML-based anomaly detection.
- Datafold Cloud is to data-diff what Github is to git: application that automates workflows on top of an enabling open-source technology.


