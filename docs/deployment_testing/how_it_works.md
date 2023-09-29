---
id: how_it_works
title: How Datafold in CI Works
sidebar_label: How It Works
pagination_prev: null
#pagination_next: deployment_testing/team_cloud/getting_started_for_customers
hide_table_of_contents: true
---

A core component of Datafold Cloud is the integration of Datafold into your _Continuous Integration (CI)_ process. This is how Datafold creates Data Diffs for all dbt model code changes, catching issues before they make it into production.

:::tip What is CI?

Put simply, Continuous Integration (or CI) is a process for building and testing changes to your code before deploying to production.

:::

#### Without CI
* Changes are manually coordinated, and often become a complex synchronization chore.
* Testing is done manually, if at all.
* Code changes are released at a slower cadence, and with higher rates of failure.

#### With CI
* Smoothly manage code changes, and scale as your team and codebase grows.
* Automate high-confidence test coverage.
* Boost the quantity and quality of developer output.

For Datafold to work in CI, a step building dbt _staging data_ needs to be added to your CI process in GitHub or GitLab.

:::tip What is Staging Data?

**Staging data** is created using the version of the dbt code in your PR/MR branch, which contains the edits you're currently working on.

:::

:::info Prerequisite: dbt in CI

In order to have Datafold in CI, you need to first add a dbt step to CI. This can be done using [dbt Cloud](https://www.datafold.com/blog/slim-ci-the-cost-effective-solution-for-successful-deployments-in-dbt-cloud) or [dbt Core](https://www.datafold.com/blog/accelerating-dbt-core-ci-cd-with-github-actions-a-step-by-step-guide).

:::

## dbt in CI: Creating production and staging data 

Datafold in CI automatically identifies data differences between production data and staging data. 

Data Diff results are then written directly to GitHub/GitLab and can be viewed in the Datafold Cloud application.

### Production data
dbt builds and updates production data in your warehouse. This is the data your dashboards, BI systems, and users depend on.

We'll assume that you have a production job in [dbt Cloud](https://docs.getdbt.com/docs/deploy/dbt-cloud-job) or [dbt Core](https://docs.getdbt.com/docs/deploy/deployment-tools) that builds or updates your dbt models in the warehouse on a schedule.

### Staging data
When you set up dbt in CI, dbt builds a version of the data in your warehouse that is based on your PR/MR code.

:::tip

You can use either dbt Cloud or dbt Core to add astep in your CI process that builds staging data.

:::

- [Setting up dbt in CI for dbt Cloud users](https://www.datafold.com/blog/slim-ci-the-cost-effective-solution-for-successful-deployments-in-dbt-cloud)
- [Setting up dbt in CI for dbt Core users](https://www.datafold.com/blog/accelerating-dbt-core-ci-cd-with-github-actions-a-step-by-step-guide)

## Datafold in CI: Comparing production and staging data 

Once you have a job in CI that builds staging data, you'll be ready to get started with Datafold in CI!

We'll walk through the setup steps in more detail in the [Getting Started](/deployment_testing/team_cloud/getting_started_for_customers.md) section. 

### How does Datafold in CI work?

- Two versions of your dbt project's `manifest.json` will be submitted to Datafold representing the state of production code as well as PR/MR code.
  - This submission of dbt artifacts happens out-of-the-box with dbt Cloud.
  - dbt Core users can set this up by adding steps to their existing CI configuration in Circle CI, GitHub Actions, or GitLab.
- Datafold uses two versions of the `manifest.json` to identify code differences.
- Datafold queries your warehouse and runs Data Diffs of modified models and other downstream impacts to data apps like Hightouch, Mode, Looker, and Tableau.
  - Datafold will diff dbt models that are materialized as both tables and views.
  - Got a huge dbt project with many downstreams? Don't worry--you can set up [Slim Diff](/guides/slim_diff.md) or utilize other [configuration options](/guides/dbt_advanced_configs.md) to manage scale while ensuring critical models are diffed.
- The results of the Data Diffs are then written directly to GitHub/GitLab, and more details can be viewed in the Datafold Cloud application.
