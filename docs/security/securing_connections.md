---
title: Securing Connections
description: "Options to secure connection between your environment and Datafold Cloud"
pagination_prev: null
---

Datafold supports multiple options to secure connections between your resources such as databases and BI tools and Datafold Cloud.

### IP Whitelisting

If access to your data source is restricted to IP addresses on an allowlist, you will need to manually add Datafold's addresses in order to use our product. Otherwise, you will receive a connection error when setting up your data source.

For SaaS (app.datafold.com) deployments, whitelist the following IP addresses:

* `23.23.71.47`
* `35.166.223.86`
* `52.11.132.23`
* `54.71.177.163`
* `54.185.25.103`
* `54.210.34.216`

Note that at any time, you will only see one of these addresses in use. However, the active IP address can change at any time, so you should add them all to your IP whitelist to ensure no interruptions in service. 

### Reverse SSH Tunnel

The reverse proxy design sets up a tunnel from a customer's private subnet to allow Datafold to establish connections with resources in the customer's private subnet. This design can be preferential to avoid exposure of those resources directly to the Internet, even if strict filtering rules would be applied on the firewalls or security groups.

Please contact support@datafold.com for documentation specific to your cloud setup.
