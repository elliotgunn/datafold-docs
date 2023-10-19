---
id: model-specific_ci_configuration
title: Model-specific CI configuration
---

Datafold leverages dbt YAML configuration to allow setting model-specific configuration for CI.


## SQL Filters

SQL filters can be helpful in two scenarios:

1. When **Production** and **Staging** environment are not built using the same data. I.e., when **Staging** is built using a subset of production data, filters can be applied to ensure that both environments are on par and can be diffed.

2. To improve Datafold CI performance by reducing the volume of data compared, e.g. to only last 3 months.


are an effective technique to speed up diffs by narrowing the data diffed. SQL filter adds a `WHERE` clause to allow you to filter data on both sides using standard SQL filter expressions. SQL filters can be added to dbt YAML under the `meta.datafold.datadiff.filter` tag:

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          filter: "user_id > 2350 AND source_timestamp >= current_date() - 7"

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


### Including/Excluding Columns
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

### Excluding Models
You can exclude a model or a subdirectory of models using `never_diff`.

```yaml
models:
  - name: users
    meta:
      datafold:
        datadiff:
          never_diff: true
```


### Diff Timeline
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


