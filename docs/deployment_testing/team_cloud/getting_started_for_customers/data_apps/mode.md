---
sidebar_position: 1
title: Mode
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/dbt
pagination_next: guides
---
### Create a Mode Integration

:::info

To complete this integration your Mode account must be a part of a Mode Business Workspace in order to generate an API Token.

:::

Navigate to Settings > Integrations > Data Apps and add a Mode Integration.

![](/img/data_apps_add_new_integration.png)

![](/img/mode_blank_integration_form.png)

Complete the configuration by specifying the following fields:

| Field Name | Description |
| ----------- | ----------- |
| Integration name | An identifier used in Datafold to identify this Data App configuration. |
| Token | Follow [these steps](https://mode.com/developer/api-reference/authentication/) to generate an Mode API token. |
| Password | The password generated with the [token](https://mode.com/developer/api-reference/authentication/) above. |

When completed, click **Submit**.

Datafold will start to sync your reports. It can take some time to fetch all the reports, depending on the number of reports. When completed, your reports will appear in Lineage as search results.

![](/img/mode_sync_results.png)
