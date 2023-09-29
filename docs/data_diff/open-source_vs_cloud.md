---
id: open-source_vs_cloud
title: Open Source Data Diff
description: ""
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

## Three Use Cases
Our Open Source Data Diff package, [data-diff](https://github.com/datafold/data-diff), has three functions - each with a different use case in mind:
- **dbt** for comparing *dbt models* within the *same* data source
- **joindiff** for comparing *tables* within the *same* data source
- **hashdiff** for comparing *tables* across *different* data sources (e.g., Postgres and Snowflake)

## Getting Started
### Install
To get started with any of the use cases above, install data-diff and the relevant database connector(s):

<Tabs
  defaultValue="snowflake"
  queryString='database'
  groupId
  values={[
    {label: 'Snowflake', value: 'snowflake'},
    {label: 'BigQuery', value: 'bigquery'},
    {label: 'Redshift', value: 'redshift'},
    {label: 'PostgreSQL', value: 'postgres'},
    {label: 'Databricks', value: 'databricks'},
    {label: 'DuckDB', value: 'duckdb'},
    {label: 'Other', value: 'other'},
  ]}>
  <TabItem value="snowflake">

  ```
  pip install data-diff 'data-diff[snowflake]' -U
  ```

  </TabItem>
  <TabItem value="bigquery">

  ```
  pip install data-diff google-cloud-bigquery -U
  ```

  <details>
    <summary>Additional BigQuery details</summary>
    Only dbt projects that use the <a href="https://docs.getdbt.com/reference/warehouse-setups/bigquery-setup#oauth-via-gcloud">OAuth via gcloud</a> connection method are currently supported.
    <br/> <br/>
    For example, run: <code>gcloud auth application-default login</code> before running a <code>data-diff</code> command.
  </details>

  </TabItem>
  <TabItem value="redshift">

  ```
  pip install data-diff 'data-diff[redshift]' -U
  ```

  </TabItem>
  <TabItem value="postgres">

  ```
  pip install data-diff 'data-diff[postgres]' -U
  ```

  <details>
    <summary>Supported for PostgreSQL >=10</summary>
    If you need support for an earlier version, please <a href="https://github.com/datafold/data-diff/issues">open an issue</a>.
  </details>

  </TabItem>
  <TabItem value="databricks">

  ```
  pip install data-diff 'data-diff[databricks]' -U
  ```

  </TabItem>
  <TabItem value="duckdb">

  ```
  pip install data-diff 'data-diff[duckdb]' -U
  ```

  <details>
    <summary>Supported for DuckDB >=0.6</summary>
    If you need support for an earlier version, please <a href="https://github.com/datafold/data-diff/issues">open an issue</a>.
  </details>

  </TabItem>
  <TabItem value="other">

  ```
  pip install data-diff 'data-diff[<database_name>]' -U
  ```

  <details>
    <summary>Additionally Supported Databases</summary>
    The following databases are support for <code>hashdiff</code> and <code>joindiff</code>, but not dbt.
    <ul>
        <li>MySQL</li>
        <li>Clickhouse</li>
        <li>Presto</li>
        <li>Trino</li>
        <li>Vertica</li>
        <li>Oracle</li>
    </ul>
    To install one of the above, specify the database name in all lowercase letters - e.g., <code>'data-diff[mysql]'</code>
    <br/><br/>
    If you'd like to request support for another database, please <a href="https://github.com/datafold/data-diff/issues">open an issue</a>.
  </details>

  </TabItem>
</Tabs>

### Run

Once you've installed data-diff, you can run it from the command line (see below) or via Python API ([see docs](https://data-diff.readthedocs.io/en/latest/python-api.html)). 

<!-- In the examples below, we use URI connection strings to connect to your database; however, we also support config files as an alternate connection method ([see docs](../reference/open_source/cli)). -->

<Tabs defaultValue="dbt">
  <TabItem label='dbt' value='dbt'>

  <Admonition type="caution">
    <p>
      If you are a dbt user, check out our docs on <a href='/development_testing/open_source'>Development Testing with Open Source</a>.
    </p>
  </Admonition>

  </TabItem>
  
  <TabItem label='joindiff' value='joindiff'>

  ```
  data-diff <DB_URI> <TABLE_NAME_1> <TABLE_NAME_2> [OPTIONS]
  ```

  <Admonition type="info">
    <p>
      You can find the <a href='/reference/open_source/cli#uri-strings'>URI string</a> for your database, a full list of <a href='/reference/open_source/cli'>options</a>, and <a href='/reference/open_source/cli#joindiff'>joindiff</a> and <a href='/reference/open_source/cli#joindiff'>hashdiff</a> examples in our Reference section.
    </p>
  </Admonition>

  </TabItem>

  <TabItem label='hashdiff' value='hashdiff'>

  ```
  data-diff <DB_URI_1> <TABLE_NAME_1> <DB_URI_2> <TABLE_NAME_2> [OPTIONS]
  ```

  <Admonition type="info">
    <p>
      You can find the <a href='/reference/open_source/cli#uri-strings'>URI string</a> for your database, a full list of <a href='/reference/open_source/cli'>options</a>, and <a href='/reference/open_source/cli#joindiff'>joindiff</a> and <a href='/reference/open_source/cli#joindiff'>hashdiff</a> examples in our Reference section.
    </p>
  </Admonition>

  </TabItem>

</Tabs>

<!-- <details>
<summary>You can also install multiple databases at once</summary>
<code>
pip install data-diff 'data-diff[snowflake,postgresql,duckdb]'
</code>
</details> -->

<!-- :::note
Some drivers have dependencies that cannot be installed using pip and still need to be installed manually.
::: -->
