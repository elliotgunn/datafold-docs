---
id: data_diff_ci_triggers
title: Data Diff CI Triggers
---

## Running data diff on demand

![](../../../../../static/img/dbt_cloud_advanced_settings.png)

- **Enable Datafold in CI/CD**: High-level switch to turn Datafold off or on in CI (but we hope you'll leave it on!).
- **Import dbt tags and descriptions**: Populate our Lineage tool with dbt metadata. ⚠️ This feature is in development. ⚠️
- **Slim Diff**: Only diff modified models in CI, instead of all models. [Please read more about Slim Diff](../../../../guides/slim_diff.md), which is highly configurable using dbt yaml, and each organization will need to set a strategy based on their data environment.
    - Downstream Hightouch models will be diffed even when Slim Diff is turned on.
- **Diff Hightouch Models**: Hightouch customers can see diffs of downstream Hightouch assets in Pull Requests.
- **CI fails on primary key issues**: The existence of null or duplicate primary keys causes the Datafold CI check to fail.
- **Pull Request Label**: For when you want Datafold to *only* run in CI when a label is manually applied in GitHub/GitLab.
- **Files to ignore**: If any files listed in this field are modified in the Pull Request, Datafold will not run in CI. 
    - If you want individual models to never be diffed, but don't want them to block Datafold from diffing other models in the PR, [check out our Never Diff dbt yaml config](../../../../guides/dbt_advanced_configs.md#never-diff-a-model).
    - If **Files to ignore** is defined, the files matching the pattern will be ignored in the PRs. The pattern uses the syntax of `.gitignore`. Excluded files can be re-included by using the negation; re-included files can be later re-excluded again to narrow down the filter. For example, to exclude everything except the `/dbt` folder, but not the dbt `.md` files, do:`*!dbt/*dbt/*.md`

Click save and that's it! 🎉 

Now that you've set up a dbt Cloud integration, Datafold will diff your impacted tables whenever you push commits to a PR. A summary of the diff will appear in GitHub, and detailed results will appear in the Datafold app.

## Running data diff on specific file changes
## Skipping data diff run for a commit
