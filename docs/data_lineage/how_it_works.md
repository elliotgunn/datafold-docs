---
sidebar_position: 1
id: how_it_works
title: How it works
#pagination_prev: enterprise_accounts/sso
#pagination_next: enterprise_accounts/custom_integrations/github_vpc
hide_table_of_contents: true
---

Datafold computes column-level lineage by:

1. Ingesting, parsing and analyzing SQL logs from your databases and data warehouses to infer dependencies between SQL statements, including those that create, modify, and read data.

2. Augmenting the metadata graph with various sources, including metadata from the orchestration tools (e.g., dbt), BI tools, and user-provided documentation.


## Data Search
Datafold provides a searchbar to find relevant assets:

![](../../static/img/catalog_landing.png)


## Accessing column-level Lineage

* Navigate to Lineage.
* Find a table or data asset of interest to see lineage.
* By default, table-level lineage will be shown.
* Click on the Columns dropdown of any table to view column-level lineage.

![](../../static/img/lineage_detail.png)
