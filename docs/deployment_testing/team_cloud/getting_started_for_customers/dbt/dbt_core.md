---
sidebar_position: 1
title: dbt Core
id: dbt_core
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/source_control
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/data_apps
---

### Getting Started

To add Datafold to your CI using dbt Core:

#### 1. Create a dbt Core integration.
![](../../../../../static/img/dbt_core_integration.png)

Complete the configuration by specifying the following fields:

| Field Name      | Description |
| ----------- | ----------- |
| Repository | Select the repository that generates the webhooks and where pull / merge requests will be raised. |
| Data Source | Select the data source where the code that is changed in the repository will run.|
| Name | An identifier used in Datafold to identify this CI configuration. |
| Primary key tag | See [dbt Integration](/guides/dbt_advanced_configs#tag-primary-keys). |
| Sync metadata on every push to production | When selected, will sync the metadata from the dbt run with Datafold every time a push happens on the default branch.|
| Files to ignore | If defined, the files matching the pattern will be ignored in the PRs. The pattern uses the syntax of .gitignore. Excluded files can be re-included by using the negation; re-included files can be later re-excluded again to narrow down the filter. For example, to exclude everything except the `/dbt` folder, but not the dbt `.md` files, do:`*!dbt/*dbt/*.md`. |
| CI Status Reporting | If the checkbox is disabled, the errors in the CI runs will be reported back to GitHub/GitLab as successes, to keep the check "green" and not block the PR/MR. By default (enabled), the errors are reported as failures and may prevent PR/MRs from being merged. |
| Slim Diff | If this box is checked, data diffs will be run only for models changed in a pull request. You'll be able to automatically diff downstream models within your PR. Downstream Hightouch models will be diffed even with Slim Diff turned on. |
| Require the `datafold` label to start CI | When this is selected, the Datafold CI process will only run when the 'datafold' label has been applied. This label needs to be created manually in GitHub or GitLab and the title or name must match 'datafold' exactly. |
| Sampling tolerance | The tolerance to apply in sampling for all data diffs. |
| Sampling confidence | The confidence to apply when sampling. |
| Sampling Threshold | Sampling will be disabled automatically if tables are smaller than specified threshold. If unspecified, default values will be used depending on the Data Source type. |

#### 2. Obtain the CI config ID of your dbt Core integration.
![](../../../../../static/img/dbt_core_ci_config_id.png)

#### 3. Obtain an Datafold API Key.
![](../../../../../static/img/api_key.png)

#### 4. Add a Datafold command to your PR CI process to upload dbt artifacts (the `manifest.json`) representing the state of the project _in the latest commit of the PR branch_.

That command will look something like this ...

```
datafold dbt upload --ci-config-id 123 --run-type ${DATAFOLD_RUN_TYPE} --commit-sha ${GIT_SHA}
```

... but the details will depend on [which CI tool](#ci-implementation-tools) you use.

Here is that `datafold dbt upload` line in the full context of a GitHub Actions CI Job script that will run during a Pull Request.

<details>
  <summary>Example GitHub Actions CI Job Script</summary>

```yaml
name: dbt staging

# Run this job when a commit is pushed to any branch except main/master
on:
  pull_request:
  push:
    branches:
      - '!main' # or '!master'

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
          DATAFOLD_API_KEY: ${{ secrets.DATAFOLD_API_KEY }}
          DATAFOLD_RUN_TYPE: "${{ 'pull_request' }}"
          GIT_SHA: "${{ github.event.pull_request.head.sha }}"
```

</details>

#### 5. Add a Datafold command to your production CI process to upload dbt artifacts (the `manifest.json`) representing the state of the project _in the latest commit of the production branch_.

That command will look something like this ...

```
datafold dbt upload --ci-config-id 123 --run-type ${DATAFOLD_RUN_TYPE} --commit-sha ${GIT_SHA}
```

... but again, the details will depend on [which CI tool](#ci-implementation-tools) you use.

Here is that `datafold dbt upload` line in the full context of a GitHub Actions Prod Job script.

<details>
  <summary>Example GitHub Actions Prod Job Script</summary>
 

```yaml
name: dbt prod

on:
  push: # Run the job on push to the main branch
    branches:
      - main # or master
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
          DATAFOLD_API_KEY: ${{ secrets.DATAFOLD_API_KEY }}
          DATAFOLD_RUN_TYPE: "${{ 'production' }}"
          GIT_SHA: "${{ github.ref == 'refs/heads/master' && github.sha }}" # or refs/heads/main
```



</details>

### CI Implementation Tools

We've created guides and templates for three popular CI tools.

- [CircleCI](./dbt_core/circleci)
- [GitHub Actions](./dbt_core/github_actions)
- [GitLab](./dbt_core/gitlab_ci)

### Optional CI Configurations and Strategies

#### Including `datafold-skip-ci` in the git commit message

* If the last commit contains the string `datafold-skip-ci`, the Datafold step in CI will be skipped.
