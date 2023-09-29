---
sidebar_position: 2
id: google_oauth
title: Google OAuth
description: ""
#pagination_prev: enterprise_accounts/sso
#pagination_next: enterprise_accounts/custom_integrations/github_vpc
---
## Create OAuth Client ID
To begin, navigate to the [Google admin console](https://console.cloud.google.com/apis/credentials?authuser=1%5C&folder=%5C) for your organization, click **Create Credentials**, and select **OAuth Client ID**.

![](/img/google_oauth_create_credential.png)

:::tip
To configure OAuth, you may need to first configure your consent screen. We recommend selecting **Internal** to keep access limited to users in your Google workspace and organization. 
![](/img/google_oauth_consent_screen.png)
:::

### Configure OAuth
* **Application type**: "Web application"
* **Authorized JavaScript origins**: `https://<your.domain.name>`
* **Authorized redirect URIs**: `https://<your.domain.name>/oauth/google`

![](/img/google_oauth_authorizations.png)

Finally, click **Create**. You will see a set of credentials that you will copy over to your Datafold Global Settings. 

## Configure Google OAuth in Datafold
To finish the configuration, paste the OAuth credentials in your Datafold Global Settings. 

To begin, navigate to **Settings** &rarr; **Global Settings**. When scrolling down on the page you'll see a check box for **Google OAuth Enabled**.

![](/img/google_oauth_datafold_checkbox.png)

Clicking the checkbox will reveal two additional fields. In the first, enter the **domain** or URL of your OAuth client ID. In the second, paste your **Client Secret**.

When completed, scroll all the way down the page to click **Save**.
