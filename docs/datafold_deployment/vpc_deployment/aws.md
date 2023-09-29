---
sidebar_position: 1
title: AWS
description: ""
#pagination_prev: enterprise_accounts/vpc_deployments
#pagination_next: enterprise_accounts/sso
---
# VPC Deployment with AWS
:::info
VPC deployments are an Enterprise feature. Please email [sales@datafold.com](mailto:sales@datafold.com) to enable your account. 
:::

## Create a Domain Name

Create a DNS A-record for the domain (for example, `datafold.domain.tld`) where Datafold will be hosted. For the DNS record, there are two options:

* **Public-facing:** When the domain is publicly available, we will provide an SSL certificate for the endpoint.
* **Internal:** It is also possible to have Datafold disconnected from the internet. This would require an internal DNS (for example, AWS Route 53) record that points to the Datafold instance. It is possible to provide your own certificate for setting up the SSL connection.

Once the deployment is complete, you will point that A-record to the IP address of the Datafold service.

## Give Datafold Access to AWS

For setting up Datafold, it is required to set up a separate account within your organization where we can deploy Datafold. We're following the [best practices of AWS to allow third-party access](https://docs.aws.amazon.com/IAM/latest/UserGuide/id\_roles\_common-scenarios\_third-party.html).

### Create a separate AWS account for Datafold

First, create a new account for Datafold. Go to **My Organization** to add an account:

![](/img/onprem_aws_landing.png)

Click **Add an AWS Account**:

![](/img/onprem_aws_add_account.png)

You can name this account anything that helps identify it clearly. In our examples, we name it **Datafold**. Make sure that the email address of the owner isn't used by another account.

![](/img/onprem_aws_account.png)


When you click the **Create AWS Account** button, you'll be returned back the organization screen, and see the notification that the new account is being created. After refresh a few minutes later, the account should appear in the organizations list.

### Grant Third-Party access to Datafold

To make sure that deployment runs as expected, your Datafold Support Engineer may need access to the Datafold-specific AWS account that you created. The access can be revoked after the deployment if needed. 

To grant access, log into the account created in the previous step. You can switch to the newly created account using the [Switch Role page](https://signin.aws.amazon.com/switchrole):

![](/img/onprem_aws_switch_role.png)

By default, the role name is **OrganizationAccountAccessRole**.

Click **Switch Role** to log in to the Datafold account.

## Grant Access to Datafold

Next, we need to allow Datafold to access the account. We do this by allowing the Datafold AWS account to access your AWS workspace. Go to the [IAM page](https://console.aws.amazon.com/iam/home) or type **IAM** in the search bar:

![](/img/onprem_aws_iam.png)

Go to the Roles page, and click the **Create Role** button:

![](/img/onprem_aws_create_role.png)

Select **Another AWS Account**, and use account ID `710753145501`, which is Datafold's account ID. Select **Require MFA** and click **Next: Permissions**.

![](/img/onprem_aws_role_config.png)

On the Permissions page, attach the **AdministratorAccess** permissions for Datafold to have control over the resources within the account.

![](/img/onprem_aws_role_permissions.png)

Next, you can set **Tags**; however, they are not a requirement.

Finally, give the role a name of your choice. Be careful not to duplicate the account name. If you named the account in an earlier step `Datafold`, you may want to name the role `Datafold-role`.

Click **Create Role** to complete this step. 

Now that the role is created, you should be routed back to a list of roles in your organization. 

Click on your newly created role to get a sharable link for the account and store this in your password manager. When setting up your deployment with a support engineer, Datafold will use this link to gain access to the account. 

After validating the deployment with your support engineer, and making sure that everything works as it should, we will let you know when it's clear to revoke the credentials.
