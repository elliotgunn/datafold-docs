---
id: primary_key_inference
title: Primary Key Inference
description: ""
---

## Primary Key Inference

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
