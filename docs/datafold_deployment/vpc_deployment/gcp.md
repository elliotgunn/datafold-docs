---
sidebar_position: 2
title: GCP
description: ""
#pagination_prev: enterprise_accounts/vpc_deployments
#pagination_next: enterprise_accounts/sso
---
# VPC Deployment with GCP

:::info
VPC deployments are an Enterprise feature. Please email [sales@datafold.com](mailto:sales@datafold.com) to enable your account. 
:::

## Create a Domain Name

Create a DNS A-record for the domain (for example, `datafold.domain.tld`) where Datafold will be hosted. For the DNS record, there are two options:

* **Public-facing:** When the domain is publicly available, we will provide an SSL certificate for the endpoint.
* **Internal:** It is also possible to have Datafold disconnected from the internet. This would require an internal DNS (for example, AWS Route 53) record that points to the Datafold instance. It is possible to provide your own certificate for setting up the SSL connection.

Once the deployment is complete, you will point that A-record to the IP address of the Datafold service.
## Create a New Project

For isolation reasons, it is best practice to [create a new project](https://console.cloud.google.com/projectcreate) within your GCP organization. Please call it something like `yourcompany-datafold` to make it easy to identify:

![](/img/onprem_gcp_create.png)

After a minute or so, you should receive confirmation that the project has been created. Afterward, you should be able to see the new project.

## Set IAM Permissions
Navigate to the **IAM** tab in the sidebar and click **Grant Access** to invite Datafold to the project.

![](/img/onprem_gcp_iam.png)

Add your Datafold solutions engineer as a **principal** and assign them as an **owner** of your project. The owner role is only required temporarily while we configure and test the initial Datafold deployment. We'll inform you when it is ok to revoke this permission.

The service account will run under “Project/Editor”, “Service Networking/Service Networking Admin” permissions. We'll enable the following GCP APIs to run Datafold:

1. [Cloud Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)
2. [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com)
3. [Identity and Access Management (IAM) API](https://console.cloud.google.com/apis/library/iam.googleapis.com)
4. [Kubernetes Engine API](https://console.cloud.google.com/apis/library/container.googleapis.com)
5. [Service Networking API](https://console.cloud.google.com/apis/library/servicenetworking.googleapis.com)
6. [Compute Engine API](https://console.cloud.google.com/apis/library/compute.googleapis.com)
7. [Service Management API](https://console.cloud.google.com/apis/library/servicemanagement.googleapis.com)
8. [Cloud SQL Admin API](https://console.cloud.google.com/apis/library/sqladmin.googleapis.com)
9. [Google Cloud Memorystore for Redis API](https://console.cloud.google.com/apis/library/redis.googleapis.com?q=memor\&id=306efa89-7b50-4186-ba99-29c960fb6289\&project=rapidsql\&authuser=2\&folder\&organizationId)

Once the access has been granted, make sure to notify Datafold so we can initiate the deployment.
