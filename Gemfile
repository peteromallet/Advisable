source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "~> 2.7.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", "~> 6.1"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
gem "strong_migrations"
gem "good_migrations"
gem "pghero"
gem "logidze", ">= 1.0.0"
gem "fx"
# Use Puma as the app server
gem "puma", "~> 4.3.6"
gem "puma_worker_killer"
gem "barnes"
# Use SCSS for stylesheets
gem "sass-rails", ">= 6"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem "mini_racer", platforms: :ruby
gem "administrate"
# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"
# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"
gem "faraday"
gem "memoist"
gem "sidekiq", "< 7"
gem "rack-attack"

gem "bcrypt", "~> 3.1.7"

gem "countries"
gem "geocoder"
gem "money"
gem "sentry-raven"
gem "omniauth"
gem "omniauth-linkedin-oauth2", github: "decioferreira/omniauth-linkedin-oauth2", branch: "master"
gem "omniauth-google-oauth2"
gem "omniauth-rails_csrf_protection", "~> 0.1"

# Use ActiveStorage variant
# gem "mini_magick", "~> 4.8"

gem "webpacker", "~> 5.1"
gem "slim"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Airrecord for querying airtable
gem "airrecord", "~> 1.0.5"

# For graphQL endpoint
gem "graphql"
gem "parser"
gem "stripe", "~> 5.14"
gem "attr_encrypted", "~> 3.1.0"

gem "pundit"
gem "nanoid"

gem "aws-sdk-s3", "~> 1"
gem "image_processing"
gem "faker", git: "https://github.com/faker-ruby/faker.git", branch: "master"
gem "twilio-ruby"
gem "graphql_playground-rails"

# Guild
gem "jsonb_accessor", "~> 1.1.0"
# Remove github reference once
# https://github.com/mbleigh/acts-as-taggable-on/pull/1013
# or
# https://github.com/mbleigh/acts-as-taggable-on/pull/1012/files
# is merged
gem "acts-as-taggable-on", github: "kvokka/acts-as-taggable-on", branch: "add-rails-6-1-support"
gem "acts_as_follower", github: "tcocca/acts_as_follower", branch: "master"
gem "email_reply_parser"

gem "pry"
gem "pry-rails"
gem "pry-doc"
gem "pry-byebug"

group :development, :test do
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "cypress-on-rails", "~> 1.0"
  gem "database_cleaner-active_record"
end

group :development do
  # Access an interactive console on exception pages or by calling "console" anywhere in the code.
  gem "web-console", ">= 3.3.0"
  gem "listen", "~> 3.2"
  gem "niceql"
  gem "graphql-rails_logger"
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rspec", require: false
  gem "annotate"
  gem "foreman"
  gem "guard"
  gem "guard-rspec", require: false
  gem "letter_opener"
  gem "brakeman"
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara"
  gem "timecop"
  gem "selenium-webdriver"
  gem "webdrivers"
  gem "shoulda-matchers"
  gem "webmock"
  gem "rspec-rails", "~> 4.0.0"
  gem "rspec-github", require: false
  gem "rspec-retry"
  gem "rspec_junit_formatter"
  gem "simplecov", require: false
end
