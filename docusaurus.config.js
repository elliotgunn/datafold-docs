// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Datafold",
  tagline: "Automated testing for data engineers",
  url: "https://docs.datafold.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  customFields: {
    image: "img/logo_with_text.svg",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/datafold/datafold-docs/tree/main/",
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
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-Y2WJ1FSBEC",
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
          alt: "",
          src: "img/logo_with_text.svg",
          srcDark: "img/logo_with_text.svg",
          // width: 32,
          // height: 32,
        },
        items: [
          {type: 'doc', docId: 'intro', label: 'Documentation', position: 'left'},
          {type: 'docSidebar', sidebarId: 'references', label: 'API Reference', position: 'left'},
          { type: "search", position: "right" },
          //  {type: 'docSidebar', sidebarId: 'reference', label: 'API Reference', position: 'left'},
          // {type: 'doc', docId: 'reference', label: 'API Reference', position: 'left'},
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
    ["@cmfcmf/docusaurus-search-local", { indexBlog: false }],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/",
            from: "/features/data_diff",
          },
          {
            to: "/",
            from: [
              "/quickstart_guide",
              "/development_testing/open_source",
              "/os_diff/dbt_integration",
            ],
          },
          {
            to: "/connections/databases",
            from: [
              "/integrations/data_warehouses/dw_overview",
              "/deployment_testing/team_cloud/getting_started_for_customers/data_sources",
            ],
          },
          {
            to: "/connections/databases/snowflake",
            from: [
              "/integrations/data_warehouses/content/snowflake",
              "/deployment_testing/team_cloud/getting_started_for_customers/data_sources/snowflake",
            ],
          },
          {
            to: "/connections/databases/bigquery",
            from: [
              "/integrations/data_warehouses/content/bigquery",
              "/deployment_testing/team_cloud/getting_started_for_customers/data_sources/bigquery",
            ],
          },
          {
            to: "/connections/databases/redshift",
            from: [
              "/integrations/data_warehouses/content/redshift",
              "/deployment_testing/team_cloud/getting_started_for_customers/data_sources/redshift",
            ],
          },
          {
            to: "/connections/databases/databricks",
            from: [
              "/integrations/data_warehouses/content/databricks",
              "/deployment_testing/team_cloud/getting_started_for_customers/data_sources/databricks",
            ],
          },
          {
            to: "/connections/databases/postgresql",
            from: [
              "/category/postgresql",
              "/integrations/data_warehouses/content/postgres/",
              "/integrations/data_warehouses/content/postgres/postgres_aurora",
              "/deployment_testing/team_cloud/getting_started_for_customers/data_sources/postgres",
            ],
          },
          {
            to: "/connections/code_repositories/github",
            from: [
              "/integrations/git/github",
              "/deployment_testing/team_cloud/getting_started_for_customers/version_control/GitHub",
              "/deployment_testing/team_cloud/getting_started_for_customers/source_control/GitHub",
            ],
          },
          {
            to: "/connections/code_repositories/gitlab",
            from: [
              "/integrations/git/gitlab",
              "/deployment_testing/team_cloud/getting_started_for_customers/source_control/GitLab",
              "/deployment_testing/team_cloud/getting_started_for_customers/version_control/GitLab",
            ],
          },
          {
            to: "/connections/code_repositories",
            from: [
              "/deployment_testing/team_cloud/getting_started_for_customers/source_control",
              "/deployment_testing/team_cloud/getting_started_for_customers/version_control",
            ],
          },
          {
            to: "/connections/orchestrators/dbt_cloud",
            from: [
              "/deployment_testing/team_cloud/getting_started_for_customers/dbt/dbt_cloud",
              "/integrations/orchestration/dbt_cloud/prerequisites",
              "/integrations/orchestration/dbt_cloud/configuration",
              "/guides/ci_guides/dbt_cloud",
            ],
          },
          {
            to: "/connections/orchestrators/dbt_core",
            from: [
              "/guides/ci/cd",
              "/deployment_testing/team_cloud/getting_started_for_customers/dbt/dbt_core",
              "/integrations/orchestration/dbt_core/prerequisites",
              "/integrations/orchestration/dbt_core/connection",
              "/integrations/orchestration/dbt_core/configuration",
              "/guides/ci_guides/dbt_core",
            ],
          },
          {
            to: "/deployment_testing/best_practices",
            from: [
              "/guides/dbt_advanced_configs",
              "/integrations/orchestration/dbt_adv_config",
            ],
          },
          {
            to: "/connections/orchestrators/custom_integrations",
            from: [
              "/reference/cloud/datafold-sdk",
              "/integrations/orchestration/datafold_sdk/prerequisites",
              "/integrations/orchestration/datafold_sdk/configuration",
              "/integrations/orchestration/datafold_sdk/usage",
              "/api/content/datafold-sdk",
              "/guides/ci_guides/datafold-sdk",
              "/guides/ci_guides/datafold-sdk/uploading_dbt_artifacts",
            ],
          },
          {
            to: "/connections/bi_data_apps/hightouch",
            from: [
              "/deployment_testing/team_cloud/getting_started_for_customers/data_apps/hightouch",
              "/integrations/data_apps/hightouch",
            ],
          },
          {
            to: "/connections/bi_data_apps/looker",
            from: [
              "/deployment_testing/team_cloud/getting_started_for_customers/data_apps/looker",
              "/integrations/data_apps/looker",
            ],
          },
          {
            to: "/connections/bi_data_apps/mode",
            from: [
              "/deployment_testing/team_cloud/getting_started_for_customers/data_apps/mode",
              "/integrations/data_apps/mode",
            ],
          },
          {
            to: "/datafold_deployment/vpc_deployment/aws",
            from: [
              "/enterprise_accounts/vpc_deployments/aws",
              "/on-prem/content/vpcs/aws",
            ],
          },
          {
            to: "/datafold_deployment/vpc_deployment/gcp",
            from: [
              "/enterprise_accounts/vpc_deployments/gcp",
              "/on-prem/content/vpcs/gcp",
            ],
          },
          {
            to: "/connections/code_repositories/github_vpc",
            from: [
              "/enterprise_accounts/custom_integrations/github_vpc",
              "/on-prem/content/github_on-prem",
            ],
          },
          {
            // There's no dedicated page or this contents any more - redirecting to main
            to: "/",
            from: [
              "/enterprise_accounts/custom_integrations/slack_vpc",
              "/on-prem/content/slack_on-prem",
            ],
          },
          {
            to: "/security/single_sign-on/google_oauth",
            from: [
              "/enterprise_accounts/sso/google_oauth",
              "/sso/google_oauth",
            ],
          },
          {
            to: "/security/single_sign-on/okta",
            from: ["/enterprise_accounts/sso/okta", "/sso/okta"],
          },
          {
            to: "/security/single_sign-on/saml",
            from: ["/enterprise_accounts/sso/saml", "/sso/saml"],
          },
          {
            to: "/security/ip_whitelisting",
            from: ["/security/gdpr"],
          },
          {
            to: "/support",
            from: "/support/grant_access_for_troubleshooting",
          },
          // {
          //   to: "/reference/cloud/rest_api",
          //   from: "/api/content/rest_api",
          // },
          // {
          //   to: "/reference/cloud/graphql",
          //   from: "/api/content/graphql",
          // },
          {
            to: "/deployment_testing/performance_optimization",
            from: ["/guides/slim_diff", "/guides/ci_guides/slim_diff"],
          },
          {
            to: "/development_testing/vs_code_extension",
            from: [
              "/guides/datafold-vs-code-extension",
              "/guides/vs_code_extension",
            ],
          },
          {
            to: "/",
            from: [
              "/guides/os_data_diff",
              "/os_diff/how_to_install",
              "/os_diff/databases_we_support",
              "/os_diff/how_to_use/how_to_use_with_command_line",
            ],
          },
          {
            to: "/cli",
            from: [
              "/reference/open_source/cli",
              "/os_diff/how_to_use/how_to_use_with_toml",
              "/os_diff/how_to_use/options",
            ],
          },
          //       // {
          //       //   to: "/reference/cloud/rest_api",
          //       //   from: ["/api/api-overview"],
          //       // },
        ],
      },
    ],
  ],
};

module.exports = config;
