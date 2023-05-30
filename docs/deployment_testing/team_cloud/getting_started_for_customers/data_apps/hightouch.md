---
sidebar_position: 1
title: Hightouch
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/dbt
pagination_next: guides
---
## Configuration

Complete the configuration by specifying the following fields:

| Field Name | Description |
| ----------- | ----------- |
| Integration name | An identifier used in Datafold to identify this Data App configuration. |
| Workspace URL | Then, grab your workspace URL, by navigating to **Settings** &rarr; **Workspace** tab &rarr; **Workspace slug** or by finding the workspace name in the search bar (`https://app.hightouch.io/<workspace_slug/>`). |
| API Key | Log into your [Hightouch account](https://app.hightouch.com/login) and navigate to **Settings** &rarr; **API keys** tab &rarr; **Add API key** to generate a new, unique API key. <br /><br /> :warning: Your API key will appear only once, so please copy and save it to your password manager for further use. |
| Data source mapping | When the correct credentials are entered we will begin to populate data sources in Hightouch (on the left side) that will need to be mapped to data sources configured in Datafold (on the right side). See image below. |

![](/img/hightouch_data_source_match.png)

When completed, click **Submit**.

It may take some time to sync all the Hightouch entities to Datafold and for Lineage to populate. When completed your Hightouch models and sync will appear in Catalog as search results and Hightouch sources in data sources filter.
