---
sidebar_position: 2
id: github_actions
title: GitHub Actions
pagination_prev: guides/ci
pagination_next: guides/cd
---
## Basic Config

dbt Core users can configure CI steps in GitHub Actions to:
* Build production and PR versions of dbt data
* Submit dbt `manifest.json` files representing both prodction and PR data to Datafold

### Production Job

The `dbt prod` job runs in two scenarios: Production Deployments and Scheduled Runs.

##### Production Deployments
* **When?**
    * New commits are pushed to the main branch
* **Why?** 
    * Deploy model changes into the data warehouse

##### Scheduled Runs
  * **When?**
    * Every day at 2AM (for cron help, check out [crontab.guru](https://crontab.guru/))
  * **Why?**
    * Data warehouse daily refresh with new data

```yml
name: dbt prod

on:
  push: # Run the job on push to the main branch
    branches:
      - main
  schedule: # Run the job daily at 2AM
    - cron: '0 2 * * *'

jobs:
  run:
    # This is the docker image used for the CI container
    runs-on: ubuntu-20.04

    steps:
        # Pull code from your Github repo into the container
      - name: checkout
        uses: actions/checkout@v2

        # Install Python 3.9 (required to run dbt)
      - uses: actions/setup-python@v2
        with:
          python-version: '3.9'

        # Install Python packages defined in requirements.txt (dbt and dependencies)
      - name: install requirements
        run: pip install -q -r requirements.txt

        # Install dbt packages defined in packages.yml
      - name: dbt deps
        run: dbt deps

        # Run and test dbt models
      - name: dbt build
        run: dbt build --full-refresh --profiles-dir ./
        env:
          # Secrets are pulled from the Github Actions secrets setting
          # See: https://docs.github.com/en/actions/security-guides/encrypted-secrets
          SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}
          SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}
          SNOWFLAKE_ROLE: ${{ secrets.SNOWFLAKE_ROLE }}
          SNOWFLAKE_SCHEMA: "${{ '<YOUR_PROD_SCHEMA>' }}" # Replace `<YOUR_PROD_SCHEMA>` with the name of your production schema.

        # Use the Datafold sdk to create a diff and write results to the PR.
      - name: submit artifacts to datafold
        run: |
          set -ex
          datafold dbt upload --ci-config-id <datafold_ci_config_id> --run-type ${DATAFOLD_RUN_TYPE} --commit-sha ${GIT_SHA}
        # The <datafold_ci_config_id> value can be obtained from the Datafold application: Settings > Integrations > dbt Core/Cloud > the ID column
        env:
          DATAFOLD_APIKEY: ${{ secrets.DATAFOLD_APIKEY }}
          DATAFOLD_RUN_TYPE: "${{ 'production' }}"
          GIT_SHA: "${{ github.ref == 'refs/heads/master' && github.sha }}"
```

### Pull Request Job
This job runs in the following scenario:
* **When?**
  * New commits are pushed to a branch *other than* main
* **Why?**
  * To understand, test, and QA changes before deploying to the data warehouse

```yml
name: dbt staging

# Run this job when a commit is pushed to any branch except main
on:
  pull_request:
  push:
    branches:
      - '!main'

jobs:
  run:
    # This is the docker image used for the CI container
    runs-on: ubuntu-20.04

    steps:
        # Pull code from the Github repo into the container
      - name: checkout
        uses: actions/checkout@v2

        # Install Python 3.9 (required to run dbt)
      - uses: actions/setup-python@v2
        with:
          python-version: '3.9'

        # Install Python packages defined in requirements.txt (dbt and dependencies)
      - name: install requirements
        run: pip install -q -r requirements.txt

        # Install dbt packages defined in packages.yml
      - name: dbt deps
        run: dbt deps

        # Retrieve the PR number and set it to the variable findPR
      - name: Find Current Pull Request
        uses: jwalton/gh-find-current-pr@v1.3.0
        id: findPR

        # Run and test all dbt models
      - name: dbt build
        run: dbt build --profiles-dir ./
        env:
          # Secrets are pulled from the Github Actions secrets setting
          # See: https://docs.github.com/en/actions/security-guides/encrypted-secrets
          # The findPR variable from the previous step is used to create a schema for the current PR 
          SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}
          SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}
          SNOWFLAKE_ROLE: ${{ secrets.SNOWFLAKE_ROLE }}
          SNOWFLAKE_SCHEMA: "${{ format('{0}_{1}', 'PR_NUM', steps.findPr.outputs.pr) }}"

      - name: submit artifacts to datafold
        run: |
          set -ex
          datafold dbt upload --ci-config-id <datafold_ci_config_id> --run-type ${DATAFOLD_RUN_TYPE} --commit-sha ${GIT_SHA}
        # The <datafold_ci_config_id> value can be obtained from the Datafold application: Settings > Integrations > dbt Core/Cloud > the ID column
        env:
          DATAFOLD_APIKEY: ${{ secrets.DATAFOLD_APIKEY }}
          DATAFOLD_RUN_TYPE: "${{ 'pull_request' }}"
          GIT_SHA: "${{ github.event.pull_request.head.sha }}"
```

## Advanced Config

### Advanced Pull Request Job
This is similar to the [pull request job](github_actions.md#pull-request-job) above, with some added features:
* [Slim CI](https://docs.getdbt.com/docs/dbt-cloud/using-dbt-cloud/cloud-enabling-continuous-integration#configuring-a-dbt-cloud-ci-job)
    * Speeds up CI by running only modified models and downstreams
    * Quick primer on [state:modified](https://docs.getdbt.com/reference/node-selection/methods#the-state-method) syntax:
        * `state:modified+` run the modified model(s) and all downstream models
        * `state:+modified` run the modified model(s) and all upstream models
        * `state:modified+n` run the modified model(s) and N downstream models
* Concurrency
    * [Cancel in-progress workflows](#use-concurrency-to-cancel-in-progress-workflows) for new commits pushed

```yml
name: dbt staging

# Run this job when a commit is pushed to any branch except main
on:
  pull_request:
  push:
    branches:
      - '!main'

jobs:
  run:
    # This is the docker image used for the CI container
    runs-on: ubuntu-20.04
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
      cancel-in-progress: true

    steps:
        # Pull code from the Github repo into the container
      - name: checkout
        uses: actions/checkout@v2

        # Install Python 3.9, this is required to run dbt
      - uses: actions/setup-python@v2
        with:
          python-version: '3.9'

        # Install Python packages defined in requirements.txt (dbt and dependencies)
      - name: install requirements
        run: pip install -q -r requirements.txt

        # Install the Datafold sdk via pip
      - name: install datafold-sdk
        run: pip install -q datafold-sdk

        # Install dbt packages defined in packages.yml
      - name: dbt deps
        run: dbt deps

        # Retrieve the PR number and set it to the variable findPR
      - name: Find Current Pull Request
        uses: jwalton/gh-find-current-pr@v1.3.0
        id: findPR

        # Get the latest manifest.json from production
        # The manifest.json is used for dbt state comparison and Datafold's diff comparison
      - name: Grab production manifest from S3
        run: |
          aws s3 cp s3://datafold-dbt-prod-manifest/manifest.json ./manifest.json
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}

        # Run and test modified dbt models and downstreams. Production data will depended on for any models that are upstream 
        # of any modified code. This process, called "deferral", removes the need to build every single model in the project in the staging job.
      - name: dbt build
        run: dbt build --select state:modified+ --defer --state ./ --exclude config.materialized:snapshot --profiles-dir ./
        env:
          SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}
          SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}
          SNOWFLAKE_ROLE: ${{ secrets.SNOWFLAKE_ROLE }}
          SNOWFLAKE_SCHEMA: "${{ format('{0}_{1}', 'PR_NUM', steps.findPr.outputs.pr) }}"

        # Use the Datafold sdk to create a diff and write results to the PR
      - name: submit artifacts to datafold
        run: |
          set -ex
          datafold dbt upload --ci-config-id <datafold_ci_config_id> --run-type ${DATAFOLD_RUN_TYPE} --commit-sha ${GIT_SHA}
        # The <datafold_ci_config_id> value can be obtained from the Datafold application: Settings > Integrations > dbt Core/Cloud > the ID column
        env:
          DATAFOLD_APIKEY: ${{ secrets.DATAFOLD_APIKEY }}
          DATAFOLD_RUN_TYPE: "${{ 'pull_request' }}"
          GIT_SHA: "${{ github.event.pull_request.head.sha }}"

        # Run dbt's source freshness tests
      - name: dbt source freshness
        run: dbt source freshness --profiles-dir ./
        env:
          SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}
          SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}
          SNOWFLAKE_ROLE: ${{ secrets.SNOWFLAKE_ROLE }}
          SNOWFLAKE_SCHEMA: "${{ format('{0}_{1}', 'PR_NUM', steps.findPr.outputs.pr) }}"
```

### Skip Diffing for Draft Pull Requests

In the example `dbt_staging` job provided in the [Advanced Pull Request Job](#advanced-pull-request-job) section, once a pull request is opened, _each subsequent push_ will trigger the `dbt_staging` job. If an open pull request is a work-in-progress, running staging on each push can become noisy and expensive.

By incorporating the below modifications, pull requests marked as a draft will skip the staging job. Once marked as a draft, developers can push commits until the pull request is marked ready for review, at which point the staging job will run.

```yml
name: dbt staging

on:
  pull_request:
    types:
    - opened
    - reopened
    - synchronize
    - ready_for_review
  push:
    branches:
      - '!main'

jobs:
  run:
    runs-on: ubuntu-20.04
    if: ${{ !github.event.pull_request.draft }}
```

### Use Concurrency to Cancel In-Progress Workflows

By default, once a workflow is triggered, the workflow will run to completion. If the same workflow is subsequently triggered again, both workflows will run in parallel.

For example, if `dbt staging` is triggered by opening a pull request, each additional push to the pull request will result in _another_ `dbt staging` workflow being triggered. For pull requests with many pushes in a short time frame, or a long running staging job, multiple staging workflows running simultaneously can be slow and costly.

By implementing GitHub's [concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency#example-only-cancel-in-progress-jobs-or-runs-for-the-current-workflow) feature, new commits to an existing pull request will cancel any in progress runs.


```yml
jobs:
  run:
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
      cancel-in-progress: true
```

### Use source_state method to skip stale sources

:::caution

[From dbt Labs](https://docs.getdbt.com/reference/node-selection/methods#the-source_status-method): the `source_status` selection method is experimental and subject to change.

:::

If a data source in your dbt project has not received new data since the previous dbt run, rerunning downstream models is an unnessary expense. The `source_status` method allows you to skip models downstream of stale sources. 

This method compares artifacts from the previous run to the current run, using the `max_loaded_at` field to dermine which sources have new data. Importantly, the `sources.json` artifact from the previous freshness test will need to be stored, and a freshness test will need to be invoked for the current run.

```yml title="GitHub Actions source_status snippet"
name: dbt prod
    [...]
    steps:
    [...]
      - name: Grab sources.json from S3 # download previous state sources.json
        run: |
          aws s3 cp [s3 url] ./sources.json

      - name: dbt source freshness # invoke for current state sources.json
        run: dbt source freshness --profiles-dir ./

      - name: dbt build
        run: dbt run --select source_status:fresher+ --state ./ --profiles-dir ./ # use source_status:fresher+ to compare artifacts

      - name: Upload sources.json to S3 # upload current state sources.json for following run
        run: |
          aws s3 cp target/sources.json [s3 url]
```