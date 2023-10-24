---
sidebar_position: 3
id: dbt_metadata_sync
title: 'dbt Metadata Sync'
---

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
