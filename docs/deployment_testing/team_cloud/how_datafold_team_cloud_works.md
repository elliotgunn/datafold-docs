---
id: how_datafold_team_cloud_works
title: How Datafold Team Cloud Works
sidebar_label: How It Works
pagination_prev: null
pagination_next: deployment_testing/team_cloud/getting_started_for_customers
hide_table_of_contents: true
---

At a high level, Datafold in CI works by automatically comparing production data and PR/MR data and identifying differences.

### Comparing two versions of your dbt data

For this to happen, Datafold needs access to two sets of data:

* **Production dbt data** that dbt builds on a regular basis. This is the data your dashboards, BI systems, and users depend on.
* **PR/MR dbt data** that is built based on the code in a particular branch of your dbt project. 

### Creating production data
We'll assume that you have a production job in [dbt Cloud](https://docs.getdbt.com/docs/deploy/dbt-cloud-job) or [dbt Core](https://docs.getdbt.com/docs/deploy/deployment-tools) that builds or updates your dbt models in the warehouse on a schedule.

### Creating PR/MR data
In order for Datafold to have something to compare your production data to, you will need to set up a dbt CI job that is triggered by your GitHub/GitLab PR/MRs.

* [Setting up dbt in CI for dbt Cloud users](https://www.datafold.com/blog/slim-ci-the-cost-effective-solution-for-successful-deployments-in-dbt-cloud)
* [Setting up dbt in CI for dbt Core users](https://www.datafold.com/blog/accelerating-dbt-core-ci-cd-with-github-actions-a-step-by-step-guide)

Once you have a PR job and a production job, you'll be ready to get started with Datafold!