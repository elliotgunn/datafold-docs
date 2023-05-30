---
sidebar_position: 1
title: dbt Core
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/source_control
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/data_apps
---
## Configuration
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

## Generate API Key
Using dbt Core requires use of the Datafold SDK. Continue with setup by [generating a Datafold API key](/reference/cloud#create-an-api-key).

## Next Steps
- Save
- Note the CI config id:
    ![](/img/ci_config_id.png)
- Add Datafold to your [CI workflow](/guides/ci)
    * [CircleCI](/guides/ci/circleci)
    * [Github Actions](/guides/ci/github_actions)
    * [Gitlab CI](/guides/ci/gitlab_ci)
