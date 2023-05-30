---
sidebar_position: 3
title: Redshift
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/data_sources
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/source_control
---
**Steps to complete:**

1. [Run SQL Script for Permissions](redshift.md#run-sql-script)
2. [Configure your data source in Datafold](redshift.md#configure-in-datafold)

### Run SQL Script
To connect to Amazon Redshift, you need to create a user with read-only access to all tables in all schemas, write access to Datafold-specific schema for temporary tables, and the ability to access SQL logs:

```sql
/* Datafold utilizes a temporary dataset to materialize scratch work and keep data processing in the your warehouse. */

CREATE SCHEMA datafold_tmp;

/* The Datafold user needs read access to ALL schemas; this requires superuser level privilege in Redshift */
      
CREATE USER datafold CREATEUSER PASSWORD 'SOMESECUREPASSWORD';


/* The following permission allows Datafold to pull SQL logs and construct
   column-level lineage */

ALTER USER datafold WITH SYSLOG ACCESS UNRESTRICTED;
```

### Configure in Datafold

| Field Name      | Description |
| ----------- | ----------- |
| Name     | A name given to the data source within Datafold |
| Host   | The hostname of your cluster. (Go to Redshift in your AWS console, select your cluster, the hostname is the endpoint listed at the top of the page) |
| Port   | Redshift connection port; default value is 5439 |
| User   | The user created in our SQL script - `datafold`  |
| Password  | The password created in our SQL script |
| Database Name  | The name of the Redshift database you want to connect to |
| Schema for temporary tables  | The schema created in our SQL script - `datafold_tmp` |

Click **Create**. Your data source is ready!
