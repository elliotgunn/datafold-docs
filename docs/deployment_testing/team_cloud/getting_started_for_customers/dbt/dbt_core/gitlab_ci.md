---
sidebar_position: 3
id: gitlab_ci
title: GitLab CI
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/dbt
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/data_apps
---
## Basic Config

This job runs in two scenarios, determined in the `rules:` section:
##### Deploy Production
* **When?**
  * New commits are pushed to the default branch
* **Why?**
  * Deploy model changes into the data warehouse
##### Deploy Merge Request
* **When?**
    * A merge request is opened in Gitlab
* **Why?**
    * To understand, test, and QA changes before deploying to the data warehouse

```yml
image:
  name: ghcr.io/dbt-labs/dbt-core:1.2.2
  entrypoint: [ "" ]

run_pipeline:
  stage: deploy
  before_script:
    - pip install datafold-sdk
  script:
    - set -ex

    # Install dbt packages defined in packages.yml
    - dbt deps

    # Run and test all dbt models
    - dbt build --full-refresh --profiles-dir ./

    # Use the Datafold sdk to create a diff and write results to the PR
    - datafold dbt upload --ci-config-id <ci-config-id> --run-type $TYPE --commit-sha $CI_COMMIT_SHA
  rules:
    - if: $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH
      variables:
        TYPE: "production"
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      variables:
        TYPE: "pull_request"
        # You can set more environment variables that will be accessible by your dbt project
```

## Advanced Config

### Advanced Merge Request Job
This is similar to the [merge request job](gitlab_ci#basic-config) above, with some added features:
* [Slim CI](https://docs.getdbt.com/docs/dbt-cloud/using-dbt-cloud/cloud-enabling-continuous-integration#configuring-a-dbt-cloud-ci-job)
    * Speeds up CI by running only your changes
    * Quick primer on [state:modified](https://docs.getdbt.com/reference/node-selection/methods#the-state-method) syntax:
        * `state:modified+` run the modified model(s) and all downstream models
        * `state:+modified` run the modified model(s) and all upstream models
        * `state:modified+n` run the modified model(s) and N downstream models
* Datafold CI Diff
    * Create diffs automatically and write the details to the merge request

```yml
image:
  name: ghcr.io/dbt-labs/dbt-core:1.2.2
  entrypoint: [ "" ]

run_pipeline:
  stage: deploy
  before_script:
    - pip install datafold-sdk
  script:
    - set -ex

    # Get the latest manifest.json from production
    # The manifest.json is used for dbt state comparison and Datafold's diff comparison
    - aws s3 cp s3://datafold-dbt-prod-manifest/manifest.json ./manifest.json

    # Install dbt packages defined in packages.yml
    - dbt deps

    # Run and test modified dbt models and models downstream of them
    # Otherwise defer to production for unmodified models
    - dbt build --select state:modified+ --defer --state ./ --exclude config.materialized:snapshot --profiles-dir ./

    # Use the Datafold sdk to create a diff and write results to the PR
    - datafold dbt upload --ci-config-id <ci-config-id> --run-type $TYPE --commit-sha $CI_COMMIT_SHA

    # Optional source freshness tests
    - dbt source freshness --profiles-dir ./
  rules:
    - if: $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH
      variables:
        TYPE: "production"
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      variables:
        TYPE: "pull_request"
        # You can set more environment variables that will be accessible by your dbt project
```
