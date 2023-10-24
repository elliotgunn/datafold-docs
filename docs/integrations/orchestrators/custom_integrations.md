---
sidebar_position: 3
id: custom_integrations
title: Custom Integrations
description: ""
#pagination_prev: reference/open_source
pagination_next: 
---
<!-- :::info
To use the Datafold REST API, you should first [create a Datafold API Key](/cloud#create-an-api-key).
::: -->

## Install
First, create your virtual environment for python:
```
> python3 -m venv venv
> source venv/bin/activate
> pip install --upgrade pip setuptools wheel
```
Now, you're ready to install the datafold SDK:
```
> pip install datafold-sdk
```

## Configure
After selecting datafold-sdk from the available options, complete configuration with the following information:

| Field Name      | Description |
| ----------- | ----------- |
| Repository | Select the repository that generates the webhooks and where pull / merge requests will be raised. |
| Data Source | Select the data source where the code that is changed in the repository will run.|
| Name | An identifier used in Datafold to identify this CI configuration. |
| Files to ignore | If defined, the files matching the pattern will be ignored in the PRs. The pattern uses the syntax of .gitignore. Excluded files can be re-included by using the negation; re-included files can be later re-excluded again to narrow down the filter. For example, to exclude everything except the `/dbt` folder, but not the dbt `.md` files, do:`*!dbt/*dbt/*.md`.|
| Mark the CI check as failed on errors | If the checkbox is disabled, the errors in the CI runs will be reported back to GitHub/GitLab as successes, to keep the check "green" and not block the PR/MR. By default (enabled), the errors are reported as failures and may prevent PR/MRs from being merged. |
| Require the `datafold` label to start CI | When this is selected, the Datafold CI process will only run when the 'datafold' label has been applied. This label needs to be created manually in GitHub or GitLab and the title or name must match 'datafold' exactly. |
| Sampling tolerance | The tolerance to apply in sampling for all data diffs. |
| Sampling confidence | The confidence to apply when sampling. |
| Sampling Threshold | Sampling will be disabled automatically if tables are smaller than specified threshold. If unspecified, default values will be used depending on the Data Source type. |

<!-- ### Generate a Datafold API Key
To generate a Datafold API key, navigate to **Settings** &rarr; **Account** and click **Create API Key** .-->

## Example Uses

### Submit dbt Artifacts

The following arguments need to be specified when submitting dbt artifacts via the Datafold SDK (examples for Python and CLI below):
- **ci_config_id**: The id of your Orchestration config, which can be found in Settings > Integrations > Orchestration.
- **run-type**: This can be either 'pull_request' or 'production', depending on whether you're uploading dbt artifacts for a git commit SHA corresponding to production or pull request code.
- **artifacts_path**: A path to dbt artifacts. Typically, these artifacts will be located in the 'target' folder of your dbt project. If your current working directory is the dbt project, you can use './target/' as your artifacts_path.
- **git_sha**: The git commit SHA for which you will provide artifacts.

#### CLI

```bash
export DATAFOLD_API_KEY=XXXXXXXXX

# only needed if your Datafold app url is not app.datafold.com
export DATAFOLD_HOST=<CUSTOM_DATAFOLD_APP_DOMAIN>
```

<!-- ```bash
git branch <branch_name> <commit-hash>
git checkout <branch_name>

dbt compile
``` -->

```bash
datafold dbt upload \
  --ci-config-id <ci_config_id> \
  --run-type <run-type> \
  --target-folder <artifacts_path> \
  --commit-sha <git_sha>
```

#### Python
```python
import os

from datafold.sdk.dbt import submit_artifacts

api_key = os.environ.get('DATAFOLD_API_KEY')

# only needed if your Datafold app url is not app.datafold.com
host = os.environ.get("DATAFOLD_HOST")

submit_artifacts(host=host,
                 api_key=api_key,
                 ci_config_id=<ci_config_id>,
                 run_type='<run-type>',
                 target_folder='<artifacts_path>',
                 commit_sha='<git_sha>')
```
<!-- 
### Create CI Run
:::note
The "prod", "pr", and "pk" key values will need to be variables if the goal is running dynamic tables for each PR. For example, it might make sense to create a list of ** [changed files](https://github.com/marketplace/actions/changed-files) ** in a previous step, and complete multiple diffs using a file naming convention.
:::

#### CLI

```bash
export DATAFOLD_API_KEY=XXXXXXXXX

# only needed if your Datafold app url is not app.datafold.com
export DATAFOLD_HOST=<CUSTOM_DATAFOLD_APP_DOMAIN>
```

```bash
datafold ci submit \
    --ci-config-id <ci_config_id> \
    --pr-num <pr_num> <<- EOF
[{
        "prod": "INTEGRATION.BEERS.BEERS",
        "pr": "INTEGRATION.BEERS_DEV.BEERS",
        "pk": ["BEER_ID"]
}]
EOF
Successfully started a diff under Run ID 401
```

#### Python sdk example

```python
from datafold_sdk.sdk.ci import run_diff, CiDiff
run_id = run_diff(
   host="https://datafold.company.io",
   api_key="tnQrPAyIHquhx4x9LJdOHC28waU1P0FdCvabcabc",
   ci_config_id=13,
   pr_num=6,
   diffs=[
     CiDiff(
       prod='INTEGRATION.BEERS.BEERS',
       pr='INTEGRATION.BEERS_DEV.BEERS',
       pk=["BEER_ID"]
     )
   ]
)

print(f"Successfully started a diff under Run ID {run_id}")
``` -->


<!-- ### Checking primary key annotations

You can check what models in your dbt repo already have primary key annotations, and which need more attention. You'll need to install Datafold SDK and configure access parameters.

```bash
$ pip3 install 'datafold-sdk'

# skip this step if you are using app.datafold.com
$ export DATAFOLD_HOST=https://<hostname>

# get your API key in Datafold UI &rarr; Edit Profile &rarr; API Key
$ export DATAFOLD_API_KEY=<your_api_key>
```

After that, you need to compile `manifest.json`, and you'll be ready to do the check.

```bash
# Lookup your CI configuration id in URL when you go to Settings &rarr; CI settings &rarr; <name>:
# https://app.datafold.com/settings/ci_integrations/14

$ datafold dbt check-primary-keys --ci-config-id 14 manifest.json 
meta        dbt_snowflake.service_calls              INCIDENT_NUMBER            models/service_calls.sql              models/schema.yml 
meta        dbt_snowflake.supply_of_ones             ID                         models/supply_of_ones.sql             models/schema.yml 
none        dbt_snowflake.fokko.boom                                            models/fokko/boom.sql                                   
none        dbt_snowflake.new_service_calls                                     models/new_service_calls.sql          models/schema.yml 
tags        dbt_snowflake.ephemeral_supply_of_twos   ID                         models/ephemeral_supply_of_twos.sql   models/schema.yml 
uniqueness  dbt_snowflake.new_service_calls_concat2  CAL_YEAR, INCIDENT_NUMBER  models/new_service_calls_concat2.sql  models/schema.yml 
uniqueness  dbt_snowflake.supply_of_twos             ID                         models/supply_of_twos.sql             models/schema.yml 
```

The first column shows how the key was inferred:

* `none` - Datafold was unable to find any PKs,
* `uniqueness` - primary keys were derived from uniqueness tests,
* `tags` - PKs were specified with column-level tags,
* `meta` - column-level metadata was used,
* `meta_table` - table-level metadata.

Out of those, `none` and possibly `uniqueness` require further actions.

The other fields in the printout are:

* fully qualified name of dbt model,
* list of primary keys,
* sql file that contains model definition,
* "patch" yml file that has dbt configuration of the model. -->
