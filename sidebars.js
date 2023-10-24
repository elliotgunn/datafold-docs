/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    { type: "doc", id: "intro", label: "Introduction" },
    {
      type: "category",
      label: "Data Diff",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "data_diff/what_is_data_diff",
          label: "What is Data Diff",
        },

        {
          type: "category",
          label: "In-database diffing",
          link: { type: "doc", id: "data_diff/in-database_diffing" },
          items: [
            {
              type: "link",
              label: "How it works",
              href: "/data_diff/in-database_diffing/#how-it-works",
            },
            // {type: 'link', label: "Interpreting data diffs", href: "/data_diff/in-database_diffing/#interpreting-data-diffs"},
            {
              type: "link",
              label: "Creating diffs",
              href: "/data_diff/in-database_diffing/#creating-diffs",
            },
            {
              type: "link",
              label: "Optimizing Performance",
              href: "/data_diff/in-database_diffing/#optimizing-performance",
            },
          ],
        },
        {
          type: "category",
          label: "Cross-database diffing",
          link: { type: "doc", id: "data_diff/cross-database_diffing" },
          items: [
            {
              type: "link",
              label: "How it works",
              href: "/data_diff/cross-database_diffing/#how-it-works",
            },
            {
              type: "link",
              label: "Creating diffs",
              href: "/data_diff/cross-database_diffing/#creating-diffs",
            },
            {
              type: "link",
              label: "Optimizing Performance",
              href: "/data_diff/cross-database_diffing/#optimizing-performance",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Deployment Testing",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "deployment_testing/how_it_works",
          label: "How it works",
        },
        {
          type: "category",
          label: "Getting started",
          link: { type: "doc", id: "deployment_testing/getting_started" },
          items: [
            {
              type: "doc",
              label: "dbt Core",
              id: "integrations/orchestrators/dbt_core",
            },
            {
              type: "doc",
              label: "dbt Cloud",
              id: "integrations/orchestrators/dbt_cloud",
            },
          ],
        },
        {
          type: "category",
          label: "Using Datafold in CI",
          link: { type: "doc", id: "deployment_testing/best_practices" },
          items: [
            {
              type: "link",
              label: "Column remapping",
              href: "/deployment_testing/best_practices#column-remapping",
            },
          ],
        },
        {
          type: "category",
          label: "Configuration",
          items: [
            {
              type: "doc",
              label: "Primary Key Inference",
              id: "deployment_testing/configuration/primary_key_inference",
            },

            {
              type: "doc",
              label: "Slim Diff",
              id: "deployment_testing/configuration/slim_diff",
            },
            
            {
              type: "category",
              label: "Datafold CI Triggers",
              items:[
                {
                  type: "link",
                  label: "Run CI on-demand",
                  href: "/deployment_testing/configuration/data_diff_ci_triggers/#running-data-diff-on-demand",
                },
                {
                  type: "link",
                  label: "Run CI for specific files",
                  href: "/deployment_testing/configuration/data_diff_ci_triggers/#running-data-diff-on-specific-file-changes",
                },
                {
                  type: "link",
                  label: "Skip CI run for a commit",
                  href: "/deployment_testing/configuration/data_diff_ci_triggers/#skipping-data-diff-run-for-a-commit",
                }],
          },
          
          {
              type: "category",
              label: "Model-specific CI Configs",
              link: {
                type: "doc",
                id: "deployment_testing/configuration/model-specific_ci_configuration",},
              items: [
                {
                  type: "link",
                  label: "SQL Filters",
                  href: "/deployment_testing/configuration/model-specific_ci_configuration/#sql-filters",
                },
                {
                  type: "link",
                  label: "Time Travel",
                  href: "/deployment_testing/configuration/model-specific_ci_configuration/#time-travel",
                },
                {
                  type: "link",
                  label: "Including/excluding Columns",
                  href: "/deployment_testing/configuration/model-specific_ci_configuration/#include--exclude-columns",
                },
                {
                  type: "link",
                  label: "Excluding Models",
                  href: "/deployment_testing/configuration/model-specific_ci_configuration/#excluding-models",
                },
                {
                  type: "link",
                  label: "Diff Timeline",
                  href: "/deployment_testing/configuration/model-specific_ci_configuration/#diff-timeline",
                }],
          }],
        }],
    },
    {
      type: "category",
      label: "Development Testing",
      collapsed: true,
      collapsible: true,
      items: [{ type: "autogenerated", dirName: "development_testing" }],
    },
    {
      type: "category",
      label: "Data Lineage",
      collapsed: false,
      collapsible: false,
      items: [{ type: "autogenerated", dirName: "data_lineage" }],
    },
    {
      type: "category",
      label: "Data Monitoring",
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "data_monitoring/data_replication_monitors",
          label: "Data Replication Monitors",
        },
        {
          type: "doc",
          id: "data_monitoring/custom_sql_monitors",
          label: "Custom SQL Monitors",
        },
        {
          type: "category",
          label: "Alerting",
          items: [
            { type: "autogenerated", dirName: "data_monitoring/alerting" },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Integrations",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "category",
          label: "Databases",
          link: { type: "doc", id: "integrations/databases" },
          items: [{ type: "autogenerated", dirName: "integrations/databases" }],
        },
        {
          type: "category",
          label: "Orchestrators",
          link: { type: "doc", id: "integrations/orchestrators" },
          items: [
            { type: "autogenerated", dirName: "integrations/orchestrators" },
          ],
        },
        {
          type: "category",
          label: "BI & Data Apps",
          link: { type: "doc", id: "integrations/bi_data_apps" },
          items: [
            { type: "autogenerated", dirName: "integrations/bi_data_apps" },
          ],
        },
        {
          type: "category",
          label: "Code Repositories",
          link: { type: "doc", id: "integrations/code_repositories" },
          items: [
            { type: "autogenerated", dirName: "integrations/code_repositories" },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Datafold Deployment",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "datafold_deployment/datafold_deployment_options",
          label: "Deployment Options",
        },
        {
          type: "autogenerated",
          dirName: "datafold_deployment/vpc_deployment",
        },
      ],
    },
    //     {
    //     type: 'category',
    //     label: 'VPC Deployment',
    //     link: {type: 'doc', id: 'datafold_deployment/vpc_deployment'},
    //     items: [
    //       {type: 'autogenerated', dirName: 'datafold_deployment/vpc_deployment'},
    //     ]
    //   }
    //   ]
    // },
    {
      type: "category",
      label: "Security",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "link",
          label: "Compliance & Trust Center",
          href: "https://security.datafold.com/",
        },
        {
          type: "doc",
          id: "security/ip_whitelisting",
          label: "IP Whitelisting",
        },
        {
          type: "category",
          label: "Single Sign-On",
          link: { type: "doc", id: "security/single_sign-on" },
          items: [
            { type: "autogenerated", dirName: "security/single_sign-on" },
          ],
        },
      ],
    },
    "support",
  ],
  references: [
    {
      type: "category",
      label: "Overview",
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Open Source",
          link: { type: "doc", id: "reference/open_source" },
          collapsible: false,
          items: [
            "reference/open_source/cli",
            {
              type: "link",
              label: "Python API",
              href: "https://data-diff.readthedocs.io/en/latest/python-api.html",
            },
          ],
        },
        {
          type: "category",
          label: "Cloud",
          collapsible: false,
          items: [
            "reference/cloud/rest_api",
            // 'reference/cloud/graphql',
            "reference/cloud/datafold-sdk",
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
