---
id: model-specific_data_diff_configuration
title: Model-specific data diff configuration
---
### Model-specific data diff configuration
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


