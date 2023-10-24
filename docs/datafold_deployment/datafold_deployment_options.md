---
id: datafold_deployment_options
title: Datafold deployment options
---

Datafold is a web-based application that can be deployed and accessed by your team in two major modes:

### Datafold SaaS

Multi-tenant deployment hosted on AWS in us-west-2 (Oregon) region. This is a great cost-efficient option for most teams that you can [sign up](https://app.datafold.com/org-signup) today for.

### Datafold VPC

Single-tenant deployment in customer's Virtual Private Cloud in [AWS](/datafold_deployment/vpc_deployment/aws), [GCP](/datafold_deployment/vpc_deployment/gcp) or [Azure](/datafold_deployment/vpc_deployment/azure).

### Datafold VPC FAQ

#### What is the benefit of a VPC deployment?

VPC deployment may be the preferred deployment method by customers with special privacy and security concerns and in highly regulated domains.
In VPC deployment, entire Datafold stack runs in the customer's cloud environment and internal network which usually means it is:
1. Not accessible to public Internet (sits behind customer's VPN)
2. Uses internal network to communicate with customer's databases and other resources – none of the data is sent using public networks

#### How does VPC deployment work?

Datafold VPC deployment runs on customer's cloud infrastructure but is fully managed by Datafold. The only DevOps involvement needed from the customer's side is to set up a cloud project and role (steps #1 and #2 below). 

1. Customer creates a Datafold-specific namespace in their cloud account (subaccount in AWS / project in GCP)
2. Customer creates a Datafold-specific IAM role with
3. Datafold Infrastructure team provisions the Datafold stack in customer's VPC using fully-automated procedure with Terraform

See cloud-specific instructions here: [AWS](/datafold_deployment/vpc_deployment/aws), [GCP](/datafold_deployment/vpc_deployment/gcp), [Azure](/datafold_deployment/vpc_deployment/azure).

After the initial deployment, the Datafold team uses the same procedure to roll out software updates, perform maintenance to keep the uptime SLA.

#### We use Kubernetes here. Can Datafold be deployed on our Kubernetes infrastructure?

To provide the best customer experience and to minimize the overhead of managing Datafold on the customer's side, Datafold stack is deployed and managed by the Datafold team using a standard automated process based on Terraform.