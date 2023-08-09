---
id: dbt_advanced_configs
title: dbt - Advanced Configs
description: ""
---
## Tag Primary Keys

Datafold needs to know which column is the primary key of the table to perform the diff. We use this in the dbt metadata to let Datafold know which column can be used to perform the diff. Datafold supports composite primary keys, meaning that you can assign multiple columns that make up the primary key together.

### Metadata

The first option is setting the `primary-key` key in the dbt metadata. There are [several ways to configure this](https://docs.getdbt.com/reference/resource-configs/meta) in your dbt project using either the `meta` key in a yaml file or a model-specific config block.

```yaml
models:
  - name: users
    columns:
      - name: user_id
        meta:
          primary-key: true
    ## for compound primary keys, set all parts of the key as a primary-key ##
    # - name: company_id
    #   meta:
    #     primary-key: true      
```

### Tags

If the primary key is not found in the metadata, it will go through the [tags](https://docs.getdbt.com/reference/resource-properties/tags).

```yaml
models:
  - name: users
    columns:
      - name: user_id
        tags:
          - primary-key
    ## for compound primary keys, tag all parts of the key ##
    # - name: company_id
    #   tags:
    #       - primary-key
```

### Inferred

If the primary key isn't provided explicitly, Datafold will try to infer a primary key from dbt's uniqueness tests. If you have a single column uniqueness test defined, it will use this column as the PK.

```yaml
models:
  - name: users
    columns:
      - name: user_id
        tests:
          - unique
```

Also, model-level uniqueness tests can be used for inferring the PK.

```yaml
models:
  - name: sales
    columns:
      - name: col1
      - name: col2
      ...
    tests:
      - unique:
          column_name: "col1 || col2"
          # or
          column_name: "CONCAT(col1, col2)"
      # we also support dbt_utils unique_combination_of_columns test
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - order_no
            - order_line
```

Keep in mind that this is a failover mechanism. If you change the uniqueness test, this will also impact the way Datafold performs the diff.

## Data Diff Configurations

### Filter Tables
Like `where` clauses, filters allow you to narrow the data diffed by specifying certain conditions. In fact, a filter is a SQL expression, and can be anything you could put into `where` clause.

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          filter: "user_id > 2350"
          # or
          filter: "source_timestamp >= current_date() - 7"
          # or
          filter: "created_at >= '2021-01-01'"
```

### Include / Exclude Columns
You can specify which columns to include or exclude in the diff.

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          include_columns:
            - user_id
            - created_at
            - name
          exclude_columns:
            - full_name
```
### Timeline
You can specify a `time_column` to visualize the match rate between tables for each column over time.

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          time_column:
            - created_at
```

### Time Travel
If your database supports time travel, you can diff tables from a particular point in time by specifying `prod_time_travel` for a production model and `pr_time_travel` for a PR model.               

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          prod_time_travel:
            - 2022-02-07T00:00:00
          pr_time_travel:
            - 2022-02-07T00:00:00
```
### Never Diff a Model
You can exclude a model or a subdirectory of models using `never_diff`.

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          never_diff: true
```

## Column Remapping

If your PR includes updates to column names, you can specify these updates in your git commit message using the following syntax. That way, Datafold will understand that the 
renamed column should be compared to the column in the production data with the original name.

By specifying column remapping in the commit message, when you rename a column, instead of thinking one column has been removed, and another has been added ... 

![](../../static/img/column_remapping_schema_difference_collapsed.png)
![](../../static/img/column_remapping_schema_difference.png)

... Datafold will recognize that the column has been renamed:

![](../../static/img/column_remapping_no_schema_diff.png)

Any of the following syntax styles can be added as a single 
line to a commit message to instruct Datafold in CI to remap a column from `oldcol` to `newcol`.


```
# All models/tables in the PR:
datafold remap oldcol newcol
X-Datafold: rename oldcol newcol
/datafold renamed oldcol newcol
datafold: remapped oldcol newcol

# Filtered models/tables by shell-like glob:
datafold remap oldcol newcol model_NAME
X-Datafold: rename oldcol newcol TaBLE
/datafold renamed oldcol newcol VIEW_*
```

### Chaining together column name updates
Commit messages can be chained together, so a commit message does not lock you in to 
renaming a column. For example, if your commit history looks like this ...

![](../../static/img/column_remapping_commit_messages.png)

... Datafold will understand that the production column `name` has been 
renamed in the PR branch to `first_name`.

## dbt Metadata Sync

:::info
You can enable the metadata sync in your Orchestration settings.
:::

When configured, Datafold can automatically ingest dbt metadata from your production environment and display it in Datafold Lineage. Note: When enabled, user editing of table metadata is disabled.

### Model-level

The following model-level information can be synced:
* `description` is synchronized into the description field of the table into Lineage.
* The `owner` of the table is set to the user identified by the `user@company.com` field. This user must exist in Datafold with that email.
* The `foo` meta information is added to the description field with the value `bar`.
* The tags `pii` and `bar` are applied to the table as tags.

```yaml
models:
  - name: users
    description: "Description of the table"
    meta:
      owner: user@company.com
      foo: bar
    tags:
      - pii
      - abc
```

### Column-level

The following column-level information can be sync'd:
* The column `user_id` has two tags applied: `pk` and `id`.
* The metadata for `user_id` is ignored, because it reflects the primary key tag.
* The `email` column has the description applied.
* The `email` column has the tag `pii` applied.
* The `email` column has extra metadata information in the description field: `type` with the value `email`.

```yaml
models:
  - name: users
    ...
    columns:
      - name: user_id
        tags:
          - pk
          - id
        meta:
          pk: true
      - name: email
        description: "The user's email"
        tags:
          - pii
        meta:
          type: email
```
