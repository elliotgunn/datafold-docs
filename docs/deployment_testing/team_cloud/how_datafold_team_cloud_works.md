---
id: how_datafold_team_cloud_works
title: Datafold in CI
sidebar_label: How It Works
pagination_prev: null
pagination_next: deployment_testing/team_cloud/getting_started_for_customers
hide_table_of_contents: true
---

A core component of Datafold Cloud is the integration of Datafold into your CI process. This is how Datafold creates Data Diffs for all dbt model code changes, catching issues before they make it into production.

## Datafold compares two versions of your dbt data

Datafold in CI automatically compares production data to PR/MR data. Data Diff results are written directly to GitHub/GitLab and stored in the Datafold Cloud application.

### Production dbt data
dbt builds and updates production data in your warehouse. This is the data your dashboards, BI systems, and users depend on.

We'll assume that you have a production job in [dbt Cloud](https://docs.getdbt.com/docs/deploy/dbt-cloud-job) or [dbt Core](https://docs.getdbt.com/docs/deploy/deployment-tools) that builds or updates your dbt models in the warehouse on a schedule.

### PR/MR dbt data
When you set up dbt in CI, dbt builds a version of the data in your warehouse that is based on your PR/MR code.

:::info

In order to run Data Diffs in CI, you will need to add dbt to your CI process, either using dbt Cloud or dbt Core.

:::

- [Setting up dbt in CI for dbt Cloud users](https://www.datafold.com/blog/slim-ci-the-cost-effective-solution-for-successful-deployments-in-dbt-cloud)
- [Setting up dbt in CI for dbt Core users](https://www.datafold.com/blog/accelerating-dbt-core-ci-cd-with-github-actions-a-step-by-step-guide)

## Datafold in CI

Once you have a production job buiding production data and a dbt in CI building PR/MR data, you'll be ready to get started with Datafold in CI!

We'll walk through the setup steps in more detail in the next sections. 

### How does Datafold in CI work?

- Two versions of your dbt project's `manifest.json` (otherwise known as artifacts) will be submitted to Datafold representing the state of production code as well as PR/MR code.
  - This submission of dbt artifacts out-of-the-box with dbt Cloud.
  - dbt Core users can set this up by adding steps to their existing CI configuration in Circle CI, GitHub Actions, or GitLab.
    - [CircleCI](/guides/ci/circleci)
    - [GitHub Actions](/guides/ci/github_actions.md)
    - [GitLab](/guides/ci/gitlab_ci)
- Datafold will use these two version of dbt artifacts to identify code differences.
- Datafold will then query your warehouse and run Data Diffs of modified models and downstreams.
  - Got a huge dbt project with many downstreams? Don't worry--you can set up [Slim Diff](/guides/slim_diff.md) or utilize other [configuration options](/guides/dbt_advanced_configs.md) to manage scale while ensuring critical models are diffed.
- The results of the Data Diffs are then written directly to GitHub/GitLab and stored in the Datafold Cloud application.