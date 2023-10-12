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
      collapsible: false,
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
              label: "Performance",
              href: "/data_diff/in-database_diffing/#performance-considerations",
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
              label: "Interpreting data diffs",
              href: "/data_diff/cross-database_diffing/#interpreting-data-diffs",
            },
            {
              type: "link",
              label: "Performance considerations",
              href: "/data_diff/cross-database_diffing/#performance-considerations",
            },
            {
              type: "link",
              label: "Advanced features",
              href: "/data_diff/cross-database_diffing/#advanced-features",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Deployment Testing",
      collapsed: false,
      collapsible: false,
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
              id: "connections/orchestrators/dbt_core",
            },
            {
              type: "doc",
              label: "dbt Cloud",
              id: "connections/orchestrators/dbt_cloud",
            },
          ],
        },
        {
          type: "category",
          label: "Perfomance optimisation",
          link: {
            type: "doc",
            id: "deployment_testing/performance_optimization",
          },
          items: [
            {
              type: "link",
              label: "Slim diff",
              href: "/deployment_testing/performance_optimization/#slim-diff",
            },
            {
              type: "link",
              label: "Custom SQL files",
              href: "/deployment_testing/performance_optimization/#custom-sql-files",
            },
          ],
        },
        {
          type: "category",
          label: "Best practices",
          link: { type: "doc", id: "deployment_testing/best_practices" },
          items: [
            {
              type: "link",
              label: "BI & Data Apps impact analysis",
              href: "/deployment_testing/best_practices#bi--data-apps-impact-analysis",
            },
            {
              type: "link",
              label: "Primary key inference",
              href: "/deployment_testing/best_practices#primary-key-inference",
            },
            {
              type: "link",
              label: "Column remapping",
              href: "/deployment_testing/best_practices#column-remapping",
            },
          ],
        },
        {
          type: "category",
          label: "Advanced features",
          items: [
            {
              type: "category",
              label: "Data diff CI triggers",
              link: {
                type: "doc",
                id: "deployment_testing/advanced_features/data_diff_ci_triggers",
              },
              items: [
                {
                  type: "link",
                  label: "Running data diff on demand",
                  href: "/deployment_testing/advanced_features/data_diff_ci_triggers/#running-data-diff-on-demand",
                },
                {
                  type: "link",
                  label: "Running data diff on specific file changes",
                  href: "/deployment_testing/advanced_features/data_diff_ci_triggers/#running-data-diff-on-specific-file-changes",
                },
                {
                  type: "link",
                  label: "Skipping data diff run for a commit",
                  href: "/deployment_testing/advanced_features/data_diff_ci_triggers/#skipping-data-diff-run-for-a-commit",
                },
              ],
            },
            {
              type: "category",
              label: "Model-specific data diff configuration",
              link: {
                type: "doc",
                id: "deployment_testing/advanced_features/model-specific_data_diff_configuration",
              },
              items: [
                {
                  type: "link",
                  label: "Filter tables",
                  href: "/deployment_testing/advanced_features/model-specific_data_diff_configuration/#model-specific-data-diff-configuration",
                },
                {
                  type: "link",
                  label: "Time travel",
                  href: "/deployment_testing/advanced_features/model-specific_data_diff_configuration/#time-travel",
                },
                {
                  type: "link",
                  label: "Including/excluding columns",
                  href: "/deployment_testing/advanced_features/model-specific_data_diff_configuration/#include--exclude-columns",
                },
                {
                  type: "link",
                  label: "Excluding models",
                  href: "/deployment_testing/advanced_features/model-specific_data_diff_configuration/#excluding-models",
                },
                {
                  type: "link",
                  label: "Diff timeline",
                  href: "/deployment_testing/advanced_features/model-specific_data_diff_configuration/#diff-timeline",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Development Testing",
      collapsed: false,
      collapsible: false,
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
      label: "Connections",
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Databases",
          link: { type: "doc", id: "connections/databases" },
          items: [{ type: "autogenerated", dirName: "connections/databases" }],
        },
        {
          type: "category",
          label: "Orchestrators",
          link: { type: "doc", id: "connections/orchestrators" },
          items: [
            { type: "autogenerated", dirName: "connections/orchestrators" },
          ],
        },
        {
          type: "category",
          label: "BI & Data apps",
          link: { type: "doc", id: "connections/bi_data_apps" },
          items: [
            { type: "autogenerated", dirName: "connections/bi_data_apps" },
          ],
        },
        {
          type: "category",
          label: "Code Repositories",
          link: { type: "doc", id: "connections/code_repositories" },
          items: [
            { type: "autogenerated", dirName: "connections/code_repositories" },
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
      collapsed: false,
      collapsible: false,
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
