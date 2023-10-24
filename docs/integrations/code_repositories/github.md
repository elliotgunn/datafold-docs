---
sidebar_position: 1
title: GitHub
description: ""
#pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/version_control
#pagination_next: deployment_testing/team_cloud/getting_started_for_customers/dbt
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


:::info
VPC deployments are an Enterprise feature. Please email [sales@datafold.com](mailto:sales@datafold.com) to enable your account. 
:::

## Github Integration for VPC / single-tenant Datafold deployments

### Create GitHub Application

VPC clients of Datafold need to create their own GitHub app, rather than use the shared Datafold GitHub application.

To begin, navigate to **Settings** &rarr; **Global Settings**.

![](/img/onprem_github_settings.png)

To begin the set up process, enter the domain that was registered for the VPC deployment in [AWS](/datafold_deployment/vpc_deployment/aws) or [GCP](/datafold_deployment/vpc_deployment/gcp). Then, enter the name of the GitHub organization where you'd like to install the application. When filled, click **Create GitHub App**. 

This will redirect the admin to GitHub, where they may need to authenticate. **The GitHub user must be an admin of the GitHub organization.**


After authentication, you should be directed to enter a description for the GitHub App. After entering the description, click **Create Github app**.

Once the application is created, you should be returned to the Datafold settings screen. The button should then have disappeared, and the details for the GitHub App should be visible.

![](/img/onprem_github_confirmation.png)

### Configure GitHub in Datafold

If you see this screen with all the details, you've successfully created a GitHub App! Now that the app is created, you have to install it using the [GitHub integration setup](/integrations/code_repositories/github).
