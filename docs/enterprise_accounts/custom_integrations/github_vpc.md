---
sidebar_position: 1
id: github_vpc
title: GitHub for VPCs
---
:::info
VPC deployments are an Enterprise feature. Please email [sales@datafold.com](mailto:sales@datafold.com) to enable your account. 
:::

## Create GitHub Application

VPC clients of Datafold need to create their own GitHub app, rather than use the shared Datafold GitHub application.

To begin, navigate to **Settings** &rarr; **Global Settings**.

![](/img/onprem_github_settings.png)

To begin the set up process, enter the domain that was registered for the VPC deployment in [AWS](../vpc_deployments/aws.md) or [GCP](../vpc_deployments/gcp.md). Then, enter the name of the GitHub organization where you'd like to install the application. When filled, click **Create GitHub App**. 

This will redirect the admin to GitHub, where they may need to authenticate. **The GitHub user must be an admin of the GitHub organization.**


After authentication, you should be directed to enter a description for the GitHub App. After entering the description, click **Create Github app**.

Once the application is created, you should be returned to the Datafold settings screen. The button should then have disappeared, and the details for the GitHub App should be visible.

![](/img/onprem_github_confirmation.png)

## Configure GitHub in Datafold

If you see this screen with all the details, you've successfully created a GitHub App! Now that the app is created, you have to install it using the [GitHub integration setup](../../deployment_testing/team_cloud/getting_started_for_customers/source_control/github).
