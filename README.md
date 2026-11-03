# davidw.tech

This Jekyll blog is built with GitHub Actions and hosted on GitHub Pages.
The customized theme lives in `_layouts`, `_includes`, and `_sass`.

## Local setup

Install Ruby **3.4.12** (see `.ruby-version`) using your Ruby version manager, then:

```sh
gem install bundler -v 4.0.23
bundle install
./test.sh
```

Open <http://127.0.0.1:4000>. The preview reloads after content changes;
restart it after changing `_config.yml`. Arguments are forwarded to Jekyll,
for example `./test.sh --drafts --port 4001`. The script can be invoked from
another directory using its full path. Analytics and live comments are enabled
only in production.

## Validation and updates

```sh
./script/check
bundle exec bundle-audit check --update
```

The first command builds in production mode and checks internal links, images,
stylesheets, page layouts, feed/sitemap XML, and excluded files. The second checks
the lockfile against the current Ruby advisory database. Both run on pull requests.
External links are not fetched by the site check.

To update dependencies, run `bundle update`, repeat both checks, and commit
`Gemfile.lock`. Dependabot proposes weekly gem and GitHub Actions updates. When
updating Font Awesome in `_includes/head.html`, update the exact version and its
SHA-384 integrity hash together.

Use Jekyll's `post_url` tag for links between posts, so a missing post fails the
build. Historical files under `old_website/` remain in Git but are excluded from
the website and sitemap, along with development scripts and this README.

## GitHub Pages deployment

**One-time migration:** when merging the Actions migration, set repository
**Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
Keep the custom domain `davidw.tech` and **Enforce HTTPS** enabled. The old
branch-based builder cannot install this site's Jekyll 4 bundle.

Pull requests build and validate without deploying. Pushes to `main` build using
`.ruby-version` and `Gemfile.lock`, validate the output, and deploy `_site` to the
`github-pages` environment. The workflow can also be run manually on `main`.
If the source setting is changed after merging, rerun the workflow on `main`.
The custom domain is retained in `CNAME`; URLs and timezone are set in `_config.yml`.
