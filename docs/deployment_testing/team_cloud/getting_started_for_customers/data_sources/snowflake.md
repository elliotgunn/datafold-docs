---
sidebar_position: 1
title: Snowflake
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/data_sources
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/source_control
---
**NOTE**: Datafold needs permissions in your Snowflake dataset to read your table data. You will need to be a Snowflake *Admin* in order to grant the required permissions.

**Steps to complete:**

* [Create a user and role for Datafold](snowflake.md#create-a-user-and-role-for-datafold)
* [Setup password-based](snowflake.md#set-up-password-based-authentication) or [Use key-pair authentication](snowflake.md#use-key-pair-authentication)
* [Create a temporary schema](snowflake.md#create-schema-for-datafold)
* [Give the Datafold role access to your warehouse](snowflake.md#give-the-datafold-role-access)
* [Configure your data source in Datafold](snowflake.md#configure-in-datafold)

### Create a user and role for Datafold

> A [full script](snowflake#full-script) can be found at the bottom of this page.

It is best practice to create a separate role for the Datafold integration (e.g., `DATAFOLDROLE`):

```sql
CREATE ROLE DATAFOLDROLE;
CREATE USER DATAFOLD DEFAULT_ROLE = "DATAFOLDROLE" MUST_CHANGE_PASSWORD = FALSE;
GRANT ROLE DATAFOLDROLE TO USER DATAFOLD;
```

To provide column-level lineage, Datafold needs to read & parse all SQL statements executed in your Snowflake account:

```sql
GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE DATAFOLDROLE;
GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE DATAFOLDROLE;
```

### Set up password-based authentication

Datafold supports username/password authentication, but also key-pair authentication.

```sql
ALTER USER DATAFOLD SET PASSWORD = 'SomethingSecret';
```

You can set the username/password in the Datafold web UI.

#### Use key-pair authentication

If you want to use key-pair authentication, please [follow the steps of Snowflake](https://docs.snowflake.com/en/user-guide/key-pair-auth.html). The public key will be set to the Snowflake user:

```sql
ALTER USER DATAFOLD SET rsa_public_key='abc..'
```

The private key needs to be uploaded to Datafold, and the optional passphrase of the private-key can be set to the user.

### Create schema for Datafold

Datafold utilizes a temporary dataset to materialize scratch work and keep data processing in the your warehouse. 

```sql
CREATE SCHEMA <database_name>.DATAFOLD_TMP;
GRANT ALL ON SCHEMA <database_name>.DATAFOLD_TMP TO DATAFOLDROLE;
```

### Give the Datafold role access

Datafold will only scan the tables that it has access to. The snippet below will give Datafold read access to a database. If you have more than one database that you want to use in Datafold, rerun the script below for each one.

```sql
/* Repeat for every DATABASE to be usable in Datafold. This allows Datafold to
correctly discover, profile & diff each table */
GRANT USAGE ON WAREHOUSE <warehouse_name> TO ROLE DATAFOLDROLE;
GRANT USAGE ON DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT USAGE ON ALL SCHEMAS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT USAGE ON FUTURE SCHEMAS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT SELECT ON ALL TABLES IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT SELECT ON FUTURE TABLES IN DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT SELECT ON ALL VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT SELECT ON FUTURE VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT SELECT ON ALL MATERIALIZED VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT SELECT ON FUTURE MATERIALIZED VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
```

### Full Script

```sql
--Step 1: Create a user and role for Datafold
CREATE ROLE DATAFOLDROLE;
CREATE USER DATAFOLD DEFAULT_ROLE = "DATAFOLDROLE" MUST_CHANGE_PASSWORD = FALSE;
GRANT ROLE DATAFOLDROLE TO USER DATAFOLD;

GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE DATAFOLDROLE;
GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE DATAFOLDROLE;

--Step 2a: Use password-based authentication
ALTER USER DATAFOLD SET PASSWORD = 'SomethingSecret';
--OR
--Step 2b: Use key-pair authentication
--ALTER USER DATAFOLD SET rsa_public_key='abc..'

--Step 3: Create schema for Datafold
CREATE SCHEMA <database_name>.DATAFOLD_TMP;
GRANT ALL ON SCHEMA <database_name>.DATAFOLD_TMP TO DATAFOLDROLE;

--Step 4: Give the Datafold role access to your Data Source
/*
  Repeat for every DATABASE to be usable in Datafold. This allows Datafold to
  correctly discover, profile & diff each table
*/
GRANT USAGE ON WAREHOUSE <warehouse_name> TO ROLE DATAFOLDROLE;
GRANT USAGE ON DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT USAGE ON ALL SCHEMAS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT USAGE ON FUTURE SCHEMAS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT SELECT ON ALL TABLES IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT SELECT ON FUTURE TABLES IN DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT SELECT ON ALL VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT SELECT ON FUTURE VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;

GRANT SELECT ON ALL MATERIALIZED VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
GRANT SELECT ON FUTURE MATERIALIZED VIEWS IN DATABASE <database_name> TO ROLE DATAFOLDROLE;
```
### Configure in Datafold
| Field Name      | Description |
| ----------- | ----------- |
| Name     | A name given to the data source within Datafold |
| Account   | The Account name for your Snowflake account. This can be found in the browser address string. It may look like `https://myaccountname.snowflakecomputing.com`. In the setup form, enter `myaccountname`.  |
| User   | The username set in the [Setup password-based](snowflake.md#set-up-password-based-authentication) authentication section  |
| Password   | The password set in the [Setup password-based](snowflake.md#set-up-password-based-authentication) authentication section |
| Key Pair file  | The key file generated in the [Use key-pair authentication](snowflake.md#use-key-pair-authentication) section|
| Warehouse     | The Snowflake warehouse name |
| Schema for temporary tables     | The schema name you created with our script (`<database_name>.DATAFOLD_TMP`) |
| Role     | The role you created for Datafold (Typically `DATAFOLDROLE`) |
| Default DB     | A database the role above can access. If more than one database was added, whichever you prefer to be the default |


Click **Create**. Your data source is ready!
