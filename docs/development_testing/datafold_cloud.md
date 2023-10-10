---
sidebar_position: 4
id: datafold_cloud
title: 'Datafold Cloud'
sidebar_label: Datafold Cloud
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Datafold Cloud extends development testing by allowing you to use the same interface as the open-source data-diff CLI but enables rich visualization capabilities to make exploring diffs and collaborating with your team easier.

# Getting started

#### 1. [Sign up](https://app.datafold.com/org-signup) for Datafold Cloud

#### 2. Set up your dbt project

Install open source data-diff CLI and configure your dbt project as described [here](/development_testing/cli).

#### 3. Configure the data source

To connect to your data warehouse, navigate to **Settings** &rarr; **Integrations** &rarr; **Data warehouses** and click **Add new integration** and follow the prompts. For more information, check out our [Data Source configuration guides](/connections/databases).

After you **Test and Save**, add the Data Source ID (which can be found on the Data warehouses page) to your **dbt_project.yml**.
    
  ```yaml
  # dbt_project.yml
  vars:
    data_diff:
        ...
        datasource_id: <DATA_SOURCE_ID>
  ```

#### 4. Generate an API key

To generate a personal API key, navigate to **Settings** &rarr; **Account** and click **Create API Key**. 

Copy and export your API Key as an environment variable. We suggest storing it in a file like `.zshrc` or `.bash_profile`, but you can also run the command below directly in your project.

  ```bash
  export DATAFOLD_API_KEY=XXXXXXXXX
  ``` 

:::info
If your Datafold instance runs in your company's VPC, you should set an environment variable specifying the Datafold app URL.

  ```bash
  export DATAFOLD_HOST=https://datafold.domain.tld
  ``` 
:::

#### 5. Run `data-diff --dbt --cloud`

After you execute `dbt run` in your local environment run `data-diff --dbt --cloud` to see the impact that your model changes had on the data.
    
  ```zsh
  dbt run --select <MODEL> && data-diff --dbt --cloud
  ```
  