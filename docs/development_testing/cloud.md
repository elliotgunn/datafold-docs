---
sidebar_position: 2
id: cloud
title: 'Development Testing: Team Cloud'
sidebar_label: Team Cloud
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## See value-level impact as you develop in dbt.

### Create a Team Cloud account to view and save value-level impact reports generated while developing in your dbt local environment.

:::tip Team Cloud
🔧 Interested in adding Datafold Team Cloud to your CI pipeline? [Let's talk!](https://calendly.com/d/zkz-63b-23q/see-a-demo?email=clay%20analytics%40datafold.com&first_name=Clay&last_name=Moeller&a1=) ☎️
:::

### Set up your dbt project

Install Datafold's open source data-diff tool and update a few lines in your **dbt_project.yml** by [following these installation instructions](/development_testing/open_source).

### Create a Team Cloud account

If you don't already have a Team Cloud account, [reach out to our team](https://calendly.com/d/zkz-63b-23q/see-a-demo?email=clay%20analytics%40datafold.com&first_name=Clay&last_name=Moeller&a1=) to get started.

### Configure a data source

To connect to your data warehouse, navigate to **Settings** &rarr; **Integrations** &rarr; **Data warehouses** and click **Add new integration** and follow the prompts. For more information, check out our [Data Source configuration guides](/deployment_testing/team_cloud/getting_started_for_customers/data_sources).

After you **Test and Save**, add the Data Source ID (which can be found on the Data warehouses page) to your **dbt_project.yml**.
    
  ```yaml
  # dbt_project.yml
  vars:
    data_diff:
        ...
        datasource_id: <DATA_SOURCE_ID>
  ```

### Generate an API key

To generate a personal API key, navigate to **Settings** &rarr; **Account** and click **Create API Key**. 

Copy and export your API Key as an environment variable. We suggest storing it in a file like `.zshrc` or `.bash_profile`, but you can also run the command below directly in your project.

  ```bash
  export DATAFOLD_API_KEY=XXXXXXXXX
  ``` 

:::info
On-prem customers should set an environment variable specifying the URL you use to access Datafold.

  ```bash
  export DATAFOLD_HOST=https://datafold.domain.tld
  ``` 
:::

### Run `data-diff --dbt --cloud`

Build 1 or more dbt models, and then run `data-diff --dbt --cloud` to see the impact that your model changes had on the data.
    
  ```zsh
  dbt run --select <MODEL> && data-diff --dbt --cloud
  ```
  