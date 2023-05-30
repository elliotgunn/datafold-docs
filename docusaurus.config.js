// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Datafold',
  tagline: 'The fastest way to validate dbt model changes in development & deployment',
  url: 'https://docs.datafold.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  customFields: {
    image: 'img/logo_with_text.svg',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/datafold/datafold-docs/tree/main/',
        },
        // To add blog, change to true and uncomment the block below
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/datafold/datafold-docs/tree/main/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-Y2WJ1FSBEC',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: false,
        // title: 'Datafold', // replace title with logo
        logo: {
          alt: '',
          src: 'img/logo_with_text.svg',
          srcDark: 'img/logo_with_text.svg',
          // width: 32,
          // height: 32,
        },
        items: [
          {type: 'doc', docId: 'getting_started', label: 'Getting Started', position: 'left'},
          {type: 'docSidebar', sidebarId: 'guides', label: 'Guides', position: 'left'},
          {type: 'docSidebar', sidebarId: 'references', label: 'Reference', position: 'left'},
          // {type: 'docSidebar', sidebarId: 'api', label: 'APIs', position: 'left'},
          // {to: '/blog', label: 'Blog', position: 'left'}, // remove to turn on blog
          // {
          //   href: 'https://github.com/datafold/datafold-docs',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              to: '/',
              from: '/features/data_diff',
            },
            {
              to: '/development_testing/open_source',
              from: '/quickstart_guide',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_sources',
              from: '/integrations/data_warehouses/dw_overview',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_sources/snowflake',
              from: '/integrations/data_warehouses/content/snowflake',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_sources/bigquery',
              from: '/integrations/data_warehouses/content/bigquery',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_sources/redshift',
              from: '/integrations/data_warehouses/content/redshift',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_sources/databricks',
              from: '/integrations/data_warehouses/content/databricks',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_sources/postgres',
              from: [
                '/category/postgresql', 
                '/integrations/data_warehouses/content/postgres/', 
                '/integrations/data_warehouses/content/postgres/postgres_aurora'
              ],
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/source_control/GitHub',
              from: '/integrations/git/github',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/source_control/GitLab',
              from: '/integrations/git/gitlab',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/dbt/dbt_cloud',
              from: [
                '/integrations/orchestration/dbt_cloud/prerequisites', 
                '/integrations/orchestration/dbt_cloud/configuration'
              ],
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/dbt/dbt_core',
              from: [
                '/integrations/orchestration/dbt_core/prerequisites', 
                '/integrations/orchestration/dbt_core/connection', 
                '/integrations/orchestration/dbt_core/configuration'
              ],
            },
            {
              to: '/guides/dbt_advanced_configs',
              from: '/integrations/orchestration/dbt_adv_config',
            },
            {
              to: '/reference/cloud/datafold-sdk',
              from: [
                '/integrations/orchestration/datafold_sdk/prerequisites', 
                '/integrations/orchestration/datafold_sdk/configuration', 
                '/integrations/orchestration/datafold_sdk/usage', 
                '/api/content/datafold-sdk', 
                '/guides/ci_guides/datafold-sdk', 
                '/guides/ci_guides/datafold-sdk/uploading_dbt_artifacts'
              ],
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_apps/hightouch',
              from: '/integrations/data_apps/hightouch',
            },
            {
              to: '/deployment_testing/team_cloud/getting_started_for_customers/data_apps/mode',
              from: '/integrations/data_apps/mode',
            },
            {
              to: '/enterprise_accounts/vpc_deployments/aws',
              from: '/on-prem/content/vpcs/aws',
            },
            {
              to: '/enterprise_accounts/vpc_deployments/gcp',
              from: '/on-prem/content/vpcs/gcp',
            },
            {
              to: '/enterprise_accounts/custom_integrations/github_vpc',
              from: '/on-prem/content/github_on-prem',
            },
            {
              to: '/enterprise_accounts/custom_integrations/slack_vpc',
              from: '/on-prem/content/slack_on-prem',
            },
            {
              to: '/enterprise_accounts/sso/google_oauth',
              from: '/sso/google_oauth',
            },
            {
              to: '/enterprise_accounts/sso/okta',
              from: '/sso/okta',
            },
            {
              to: '/enterprise_accounts/sso/saml',
              from: '/sso/saml',
            },
            {
              to: '/security',
              from: [
                '/security/gdpr', 
                '/security/ip_whitelisting'
              ],
            },
            {
              to: '/support',
              from: '/support/grant_access_for_troubleshooting',
            },
            {
              to: '/reference/cloud/rest_api',
              from: '/api/content/rest_api',
            },
            {
              to: '/reference/cloud/graphql',
              from: '/api/content/graphql',
            },
            {
              to: '/guides/ci',
              from: '/guides/ci/cd',
            },
            {
              to: '/guides/slim_diff',
              from: '/guides/ci_guides/slim_diff',
            },
            {
              to: '/development_testing/open_source',
              from: '/os_diff/dbt_integration',
            },
            {
              to: '/guides/os_data_diff',
              from: [
                '/os_diff/how_to_install', 
                '/os_diff/databases_we_support', 
                '/os_diff/how_to_use/how_to_use_with_command_line'
              ],
            },
            {
              to: '/reference/open_source/cli',
              from: [
                '/os_diff/how_to_use/how_to_use_with_toml', 
                '/os_diff/how_to_use/options'
              ],
            },
          ],
        },
      ],
    ],
};

module.exports = config;
