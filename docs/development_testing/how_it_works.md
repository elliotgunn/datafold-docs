---
sidebar_position: 1
id: how_it_works
title: 'How it works'
sidebar_label: How it works
hide_table_of_contents: true
---

:::info
Development testing is currently only available for dbt
:::

Development testing with Datafold enables you to see the impact of code changes on data as you write the code, in IDE or CLI. It leverages data diff, integrates deeply with dbt and follows the same concepts as deployment testing while allowing to test earlier in the development flow.

<img src={'/img/development_testing_gif.gif'} />

## Development Testing Workflow

Development testing plugs in the general code+run workflow by adding a diffing step to see how each code change impacts the data. In a nutshell, the workflow follows the following three steps:

1. Change the dbt code
2. `dbt run` to materialize the code changes in development environment
3. Run data diff to see the impact of code changes on data

## Available integrations options

1. [CLI (open-source)](/development_testing/cli) - easiest to get started, works with any IDE
2. [CLI + Datafold Cloud](/development_testing/datafold_cloud) - enables visualizations and value-level diffs
3. [VS Code Extension](/development_testing/vs_code_extension) – provides diff results right in VS Code