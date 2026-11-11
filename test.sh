#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

# Preview the site. Run ./script/check for production validation.
exec bundle exec jekyll serve --livereload --trace "$@"
