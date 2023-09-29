---
id: cli
title: CLI
description: ""
#pagination_prev: reference
#pagination_next: reference/cloud
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Options
| Category | Config key | CLI&nbsp;switch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description | dbt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | joindiff | hashdiff |
|---|---|---|---|---|---|---|
| | `help` | `--help` | Show help message and exit. |  | ✅ | ✅ |
| Schema | `key_columns`  | `-k` or `--key-columns` | Name of the primary key column. If none provided, default is 'id'. |  | ✅ | ✅ |
| Schema | `update_column` | `-t` or `--update-column` | Name of updated_at/last_updated column. |  | ✅ | ✅ |
| Schema | `columns` | `-c` or `--columns` | Names of extra columns to compare.  Can be used more than once in the same command. Accepts a name or a pattern, like in SQL. Example: `-c col% -c another_col -c %foorb.r%` |  | ✅ | ✅ |
| Schema | `assume_unique_key` | `--assume-unique-key` | Skip validating the uniqueness of the key column during joindiff, which is costly in non-cloud dbs. |  | ✅ |  |
| Filtering | `min_age` | `--min-age` | Considers only rows older than specified. Useful for specifying replication lag. Example: `--min-age=5min` ignores rows from the last 5 minutes. Valid units: `d, days, h, hours, min, minutes, mon, months, s, seconds, w, weeks, y, years` |  | ✅ | ✅ |
| Filtering | `max_age` | `--max-age` | Considers only rows younger than specified. See `--min-age`. |  | ✅ | ✅ |
| Filtering | `where` | `-w`, `--where` | An additional 'where' expression to restrict the search space. |  | ✅ | ✅ |
| Performance | `limit` | `-l` or `--limit` | Maximum number of differences to find (limits maximum bandwidth and runtime). |  | ✅ | ✅ |
| Performance | `threads` | `-j` or `--threads` | Number of worker threads to use per database. Default=1. |  | ✅ | ✅ |
| Performance | `algorithm`   | `-a`, `--algorithm` | Force algorithm choice. Options: `auto`, `joindiff`, `hashdiff` |  | ✅ | ✅ |
| Performance | `bisection_threshold` | `--bisection-threshold` | Minimal size of segment to be split. Smaller segments will be downloaded and compared locally. |  |   | ✅ |
| Performance | `bisection_factor` | `--bisection-factor` | Segments per iteration. When set to 2, it performs binary search. |  |   | ✅ |
| Output | `stats` | `-s` or `--stats` | Print stats instead of a detailed diff. |  | ✅ | ✅ |
| Output | `debug` | `-d` or `--debug` | Print debug info. |  | ✅ | ✅ |
| Output | `interactive` | `-i` or `--interactive` | Confirm queries, implies `--debug` |  | ✅ | ✅ |
| Output | `verbose` | `-v` or `--verbose` | Print extra info. |  | ✅ | ✅ |
| Output | `json` | `--json` | Print JSONL output for machine readability. |  | ✅ | ✅ |
| Output | `sample_exclusive_rows` | `--sample-exclusive-rows` | Sample several rows that only appear in one of the tables, but not the other. Use with `-s`. |  | ✅ |  |
| Output | `materialize_all_rows` | `--materialize-all-rows` | Materialize every row, even if they are the same, instead of just the differing rows. |  | ✅ |  |
| Output | `materialize` | `-m`, `--materialize` | Materialize the diff results into a new table in the database. If a table exists by that name, it will be replaced. Use `%t` in the name to place a timestamp. Example: `-m test_mat_%t` |  | ✅ |  |
| Output | `table_write_limit` | `--table-write-limit` | Maximum number of rows to write when creating materialized or sample tables, per thread. Default=1000. |  | ✅ |  |
| Settings | | `--conf`, `--run` | Specify the run and configuration [from a TOML file](cli#toml-config-file). |  | ✅ | ✅ |
| Settings | `no_tracking` | `--no-tracking` | data-diff sends home anonymous usage data. Use this to disable it. |  | ✅ | ✅ |

## Examples
### dbt
For dbt examples, check out our documentation on [Development Testing with Open Source](development_testing/cli).

### joindiff

```shell
data-diff \
  "snowflake://<username>:<password>@<ACCOUNT>/<DATABASE>/<SCHEMA_1>?warehouse=<WAREHOUSE>&role=<ROLE>" <TABLE_1> \
  <SCHEMA_2>.<TABLE_2> \
  -k org_id \
  -c created_at -c is_internal \
  -w "org_id != 1 and org_id < 2000" \
  -m test_results_%t \
  --materialize-all-rows \
  --table-write-limit 10000
```

`-m` materializes the results into the specified table. `%t` will get replaced by the current timestamp.

Check out the rest of the options [here](#options).

### hashdiff

```shell
data-diff \
  postgresql://<username>:'<password>'@localhost:5432/<database> \
  <table> \
  "snowflake://<username>:<password>@<ACCOUNT>/<DATABASE>/<SCHEMA>?warehouse=<WAREHOUSE>&role=<ROLE>" \
  <TABLE> \
  -k activity_id \
  -c activity \
  -w "event_timestamp < '2022-10-10'"
```

Check out the options available [here](#options).

## Connection Methods
### URI Strings

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
  
  Note: Unless something is explicitly case sensitive (like your password), use all caps.<br /><br />

  **With password:**
  ```
  "snowflake://<USER>:<password>@<ACCOUNT>/<DATABASE>/<SCHEMA>?warehouse=<WAREHOUSE>&role=<ROLE>"
  ```

  **With SSO:**
  ```
  "snowflake://<USER>@<ACCOUNT>/<DATABASE>/<SCHEMA>?warehouse=<WAREHOUSE>&role=<ROLE>&authenticator=externalbrowser"
  ```

  </TabItem>
  <TabItem value="bigquery">

  <details>
    <summary>Additional BigQuery details</summary>
    Only dbt projects that use the <a href="https://docs.getdbt.com/reference/warehouse-setups/bigquery-setup#oauth-via-gcloud">OAuth via gcloud</a> connection method are currently supported.
    <br/> <br/>
    For example, run: <code>gcloud auth application-default login</code> before running a <code>data-diff</code> command.
  </details>

  ```
  data-diff \
    bigquery://<project>/<dataset>
  ```

  </TabItem>
  <TabItem value="redshift">

  ```
  redshift://<username>:<password>@<hostname>:5439/<database>
  ```

  </TabItem>
  <TabItem value="postgres">

  ```
  postgresql://<username>:'<password>'@<host>:5432/<database>
  ```

  </TabItem>
  <TabItem value="databricks">

  ```
  databricks://:<access_token>@<server_name>/<http_path>?catalog=<catalog>&schema=<schema>
  ```

  </TabItem>
  <TabItem value="duckdb">

  ```
  duckdb://<database>@<dbpath>
  ```

  </TabItem>
  <TabItem value="other">

  MySql: ```mysql://<username>:<password>@<hostname>:3306/<database>```

  Clickhouse: ```clickhouse://<username>:<password>@<hostname>:9000/<database>```

  Presto: ```presto://<username>:<password>@<hostname>:8080/<database>```
  
  Trino: ```trino://<username>:<password>@<hostname>:8080/<database>```
  
  Vertica: ```vertica://<username>:<password>@<hostname>:5433/<database>```
  
  Oracle: ```oracle://<username>:<password>@<hostname>/database```

  </TabItem>

</Tabs>

### TOML Config File

There are two main sections to a TOML config file: 
1. Database Connection - define one or more databases that will be used by runs.
2. Run Parameters - define default options that are inherited or overridden by specific runs.

#### Example

```python
# datadiff.toml

## DATABASE CONNECTION ##
[database.postgres_connection] 
  driver = "postgresql"
  database = "<PG_DATABASE>"
  user = "<PG_USERNAME>"
  password = ${PASSWORD_ENV_VARIABLE} # or "<PASSWORD_STRING>"

[database.snowflake_connection]
  driver "snowflake"
  database = "<SNOWFLAKE_DATABASE>"
  user = "<SNOWFLAKE_USER>"
  password = ${PASSWORD_ENV_VARIABLE} # or "<PASSWORD_STRING>"
  # the info below is only required for snowflake
  account = "<SNOWFLAKE_ACCOUNT>"
  schema = "<SNOWFLAKE_SCHEMA>"
  warehouse = "<SNOWFLAKE_WAREHOUSE>"
  role = "<SNOWFLAKE_ROLE>"


## RUN PARAMETERS ##
[run.default]
  verbose = true

[run.<RUN_NAME>]
  # Source 1 ("left")
  1.database = "postgres_connection"
  1.table = "<TABLE_NAME_1>"

  # Source 2 ("right")
  2.database = "<snowflake_connection>"
  2.table = "<TABLE_NAME_2>"

  verbose = false
```

The following command line input uses the configuration defined above

```
data-diff \
  --conf ~/config_files/datadiff.toml \
  --run <RUN_NAME> \
  -k <PRIMARY_KEY> \
  -w "<TIMESTAMP_COL> < 'XXXX-XX-XX'"
```

:::note 
When defining how a run connects to a database, you can use a URI string instead of a database defined in the "Database Connection" section:

```python
  # Source 1 ("left")
  1.database = "postgresql://<PG_DATABASE>:<PASSWORD>/"
  1.table = "<TABLE_NAME>"
```
:::

#### Inheritance and overriding parameters
CLI switches have the final say, and will override the settings defined by the configuration file.

#### Where should you store your TOML configuration file?

- If you are using a single file with multiple configurations for multiple projects, store it in your home directory.
- For project-specific TOML files, store the file in your project.

:::caution
Exclude the TOML file in your `.gitignore`, especially if it includes sensitive information such as passwords.
:::

