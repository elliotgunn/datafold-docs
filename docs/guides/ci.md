---
id: ci
title: Continuous Integration
pagination_next: guides/cd
---

Put simply, Continuous Integration (or CI) is a process for building and testing changes to your code before deploying to production.

#### Without CI
* Changes are manually coordinated, and often become a complex synchronization chore.
* Testing is done manually, if at all.
* Code changes are released at a slower cadence, and with higher rates of failure.

#### With CI
* Smoothly manage code changes, and scale as your team and codebase grows.
* Automate high-confidence test coverage.
* Boost the quantity and quality of developer output.

## Getting Started
:::info
To get started, you'll need an [API Key](/reference/cloud#create-an-api-key) and the [CI config ID](/deployment_testing/getting_started_for_customers/dbt/dbt_core#next-steps) for your dbt Core integration.
:::

To add Datafold to your CI, you'll need to follow these basic steps:

* Add a Datafold command to your PR CI process to upload dbt artifacts representing the state of the project _in the latest commit of the PR branch_.
* Add a Datafold command to your production CI process to upload dbt artifacts representing the state of the project _in the latest commit of the production branch_.
* In both the PR CI process and the production CI process, these Datafold commands should be added _after_ the `dbt run` or `dbt build` step.

Implementation details differ depending on the tool you're using for CI:

- [CircleCI](/guides/ci/circleci)
- [GitHub Actions](/guides/ci/github_actions)
- [GitLab](/guides/ci/gitlab_ci)

Alternatively, Datafold can also be implemented in CI without any code configuration using [dbt Cloud](../deployment_testing/getting_started_for_customers/dbt/dbt_cloud.md).

<!-- Interested in setting up CI or optimizing your current setup? Check out our guided walkthroughs.
* [dbt Cloud](ci_guides/dbt_cloud.md)
* [dbt Core](ci_guides/dbt_core.md)
    * [CircleCI](ci_guides/dbt_core/circleci.md)
    * [Github Actions](ci_guides/dbt_core/github_actions.md)
    * [Gitlab CI](ci_guides/dbt_core/gitlab_ci.md)

#### How we use CI at Datafold:
<iframe width="640" height="414" src="https://www.loom.com/embed/37fc5fb4c1e640c09b9b470128c85a7b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
