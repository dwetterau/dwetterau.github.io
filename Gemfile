source "https://rubygems.org"

ruby file: ".ruby-version"

# GitHub Actions installs this bundle and deploys the generated static site.
gem "jekyll", "~> 4.4.1"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.18"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-relative-links", "~> 0.9"
  gem "jekyll-seo-tag", "~> 2.9"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-titles-from-headings", "~> 0.6"
end

group :development do
  gem "bundler-audit", "~> 0.9"
  gem "nokogiri", "~> 1.19", ">= 1.19.7"
end

platforms :windows, :jruby do
  gem "tzinfo", "~> 2.0"
  gem "tzinfo-data"
end
