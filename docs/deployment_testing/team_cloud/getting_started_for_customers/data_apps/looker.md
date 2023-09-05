---
sidebar_position: 1
title: Looker
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/dbt
pagination_next: guides
---

### Create a Version Control Integration

[Create a Version Control integration](/docs/deployment_testing/team_cloud/getting_started_for_customers/version_control.md) that connects Datafold to your Looker repository.

### Create a Looker Integration

Navigate to Settings > Integrations > Data Apps and add a Looker Integration.

![](/img/data_apps_add_new_integration.png)

![](/img/looker_blank_integration_form.png)

Complete the configuration by specifying the following fields:

| Field Name | Description |
| ----------- | ----------- |
| Integration name | An identifier used in Datafold to identify this Data App configuration. |
| Project Repository | Select the same repository as used in your Looker project. |
| API Host URL | The Looker [API Host URL](https://cloud.google.com/looker/docs/admin-panel-platform-api#api_host_url). It has the following format: `https://<instance_name>.cloud.looker.com:<port>`. The port defaults are `19999` (legacy) and `443` (new), see the [Looker Docs](https://cloud.google.com/looker/docs/api-getting-started#looker_api_path_and_port) for hints. Examples: Legacy (`https://datafold.cloud.looker.com:19999`), New (`https://datafold.cloud.looker.com:443`) |
| Client ID | Follow [these steps](https://cloud.google.com/looker/docs/api-auth#authentication_with_an_sdk) to generate Client ID and Client Secret. These are always user specific. We recommend using a group email for continuity. See [Looker User Minimum Access Policy](looker.md#looker-user-minimum-access-policy) for the required permissions. |
| Client Secret | See Client ID |
| Data source mapping | When the correct credentials are entered we will begin to populate data sources in Looker (on the left side) that will need to be mapped to data sources configured in Datafold (on the right side). See image below. |

![](/img/looker_configuration.png)

When completed, click **Submit**.

It may take some time to sync all the Looker entities to Datafold and for Lineage to populate. When completed, your Looker assets will appear in Lineage as search results.

![](/img/looker_sync_results.png)

### Looker User Minimum Access Policy
The user linked to the API credentials needs the predefined Developer role or you can create a custom role with these permissions:

- `access_data`
- `download_without_limit`
- `explore`
- `login_special_email`
- `manage_spaces`
- `see_drill_overlay`
- `see_lookml`
- `see_lookml_dashboards`
- `see_looks`
- `see_pdts`
- `see_sql`
- `see_user_dashboards`
- `send_to_integration`

### Current Limitations of Datafold Looker Integration
Datafold lets you connect to Looker and extend our capabilities to your Looker Views, Explores, Looks, and Dashboards. But this is a new feature, so there are some things we don’t support yet:

* **PDT/Derived Tables**:Datafold only works with the tables that come from your data sources, but not with the [tables](https://cloud.google.com/looker/docs/derived-tables#important_considerations_for_implementing_persisted_tables) that Looker makes from your SQL queries.
* **Merge Queries**: Datafold supports the Queries and Looks that make up your Dashboards, but [Merge Queries](https://cloud.google.com/looker/docs/merged-results) are not one of them. For some use cases you could achieve the same by joining the underlying views with an explore.
* **Usage metrics and popularity**: Datafold shows you your Looker objects - such as dashboards, looks, and fields - but not how much you use or like them.

We are improving our Looker integration and adding more features soon. We welcome your feedback and suggestions.