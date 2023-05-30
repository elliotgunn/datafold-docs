---
sidebar_position: 1
title: GitHub
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/source_control
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/dbt
---
<!-- :::caution
If you are on an VPC deployment, you should first create a GitHub App for the integration. See [GitHub integration for Datafold VPC](enterprise_accounts/vpc_deployments/github_vpc) before proceeding with this tutorial.
::: -->

:::info Prerequisites
* Datafold Admin role
* Your GitHub account must be a member of the GitHub organization where the Datafold app is to be installed
* Approval of your request to add the Datafold app to your repo must be granted by a GitHub repo admin or GitHub organization owner
:::

To set up a new integration, click on the repository field to access the **Install GitHub app** button.

![](/img/github_install_button.png)

From here, GitHub will redirect you to login to your account and choose which organization you would like to connect. After choosing the right organization, you may choose to allow access to all repositories or specific ones. 

When complete, you'll be redirected back to Datafold, where you can choose the appropriate repository for connection. 

:::tip
If your GitHub account does not have permission to add the Datafold app, you can request that your GitHub admin approve and install the app.

Once installed, click refresh and the newly added repos will appear in the dropdown list.
:::

To complete the setup, click **Save**!
