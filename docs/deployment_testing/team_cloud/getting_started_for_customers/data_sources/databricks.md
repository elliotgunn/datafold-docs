---
sidebar_position: 4
title: Databricks
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/data_sources
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/source_control
---
**Steps to complete:**

1. [Generate a Personal Access Token](databricks.md#generate-a-personal-access-token)
2. [Retrieve SQL warehouse settings](databricks.md#retrieve-sql-warehouse-settings)
3. [Configure your data source in Datafold](databricks.md#configure-in-datafold)

### Generate a Personal Access Token

Visit **Settings** → **User Settings**, and then switch to **Personal Access Tokens** tab.

![](/img/databricks_new_token.png)

Then, click **Generate new token**. Save the generated token somewhere, you'll need it later on.

### Retrieve SQL warehouse settings

In **SQL** mode, navigate to **SQL Warehouses**.

![](/img/databricks_sql_warehouse.png)


Choose the preferred warehouse and copy the following fields values from its **Connection Details** tab:

* Server hostname
* HTTP path

![](/img/databrick_connection_details.png)

### Configure in Datafold

| Field Name      | Description |
| ----------- | ----------- |
| Name     | A name given to the data source within Datafold |
| Host   | The hostname retrieved in the `Connection Details` tab  |
| HTTP Path   | The HTTP Path retrieved in the `Connection Details` tab        |
| Access Token   | The token retrieved in [Generate a Personal Access Token](databricks.md#generate-a-personal-access-token)       |
| Database  | The catalog and database name of your Databricks account. Formatted as `catalog_name.database_name` (In most cases, `catalog_name` is `hive_metastore`.) |

Click **Create**. Your data source is ready!
