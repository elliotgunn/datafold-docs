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

Datafold Cloud is to data-diff what Github is to git: application that automates workflows on top of an enabling open-source technology.

While [data-diff](https://github.com/datafold/data-diff) unlocks an essential capability of diffing data for data engineers, Datafold Cloud provides end-to-end solutions for automating testing. Datafold Cloud incorporates data-diff within its platform, complemented by features such as column-level lineage and ML-based anomaly detection.

Here's a high-level comparison of open source data-diff and Datafold Cloud, focusing on use cases, tech stack, and feature sets:

| Feature/Aspect                      | Open source data-diff                                                       | Datafold Cloud                                                                                                                                                      |
|------------------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **User interface**                 | CLI or VS Code IDE                                                          | Datafold Cloud app UI and VS Code IDE                                                                                                                              |
| **Diffing capabilities**           | Diff overview                                                               | Diff overview, value-level diffs, automated CI diffs                                                                                                               |
| **Best suited for**                | Individual developers                                                       | Teams                                                                                                                                                              |
| **Lineage**                        | None                                                                        | Column-level lineage                                                                                                                                               |
| **Automated impact analysis in CI**| None                                                                        | Automatically see in GitHub/GitLab PRs how code changes will impact downstream dbt models, data apps like Hightouch, and BI tools like Mode                         |
| **Use Cases**                      | - Individual and ad hoc data diffs<br/>- Cross-database diffing              | - Automated and collaborative diffing and testing for dbt models<br/>- Column-level lineage<br/>- Large data migrations or replications that require automated cross-data warehouse diffing |
| **Security, compliance, and deployment** | N/A                                                                      | - SOC2 Type II, HIPAA, and GDPR compliant<br/>- Multi and single-tenant deployment solutions available                                                           |
