---
sidebar_position: 2
title: GitLab
description: ""
pagination_prev: deployment_testing/team_cloud/getting_started_for_customers/source_control
pagination_next: deployment_testing/team_cloud/getting_started_for_customers/dbt
---

To get the [project access token](https://docs.gitlab.com/ee/user/project/settings/project\_access\_tokens.html), navigate to your GitLab project settings and create a new token. *Note*: Project access tokens are preferred over personal tokens for security.

When configuring your token, select the **Maintainer** role and select the **api** scope. 

![](/img/gitlab_access_token.png)

Finally, navigate back to Datafold and enter the **Project Token** and the name of your **Project** before hitting **Save**.
