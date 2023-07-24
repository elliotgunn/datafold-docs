---
id: catalog-lineage
title: Column-level Lineage
pagination_prev: enterprise_accounts/sso
pagination_next: enterprise_accounts/custom_integrations/github_vpc
hide_table_of_contents: true
---
## Lineage
![](../../static/img/catalog_landing.png)
With the Datafold's Lineage tool, you can quickly see row counts, nulls, and column distributions for tables in your data warehouse.

To include more details in Lineage, you can sync metadata from dbt and your data warehouse to create a single source of truth. You can implement custom tags to easily categorize and filter the data sets. 

## Accessing column-level Lineage

![](../../static/img/lineage_detail.png)
After connecting your data warehouse, Datafold parses the query logs to construct and visualize dependencies at both the table and column levels. See how data is produced, consumed, and transformed. Datafold supports complex queries, such as correlated subqueries, `CASE WHEN` statements, and window functions.

No additional developer resources are needed to unlock this capability. Simply connect your data warehouse and explore your lineage graph. 

To view the column-level Lineage of any table in your warehouse:

* Navigate to Lineage.
* Click on any table name in the data browser.
* By default, table-level lineage will be shown. 
* Click on the Columns dropdown of any table to view column-level lineage.