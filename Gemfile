# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "~> 3.1.0"

gem "administrate"
gem "administrate-field-active_storage"
gem "airrecord"
gem "app_profiler"
gem "aws-sdk-s3"
gem "barnes"
gem "bcrypt"
gem "bootsnap", require: false
gem "countries"
gem "dalli"
gem "email_reply_parser"
gem "faker"
gem "faraday"
gem "faraday_middleware"
gem "fx"
gem "geocoder"
gem "good_migrations"
gem "google-apis-calendar_v3"
gem "graphql"
gem "graphql_playground-rails"
gem "image_processing"
gem "logidze"
gem "memoist"
gem "money"
gem "nanoid"
gem "omniauth"
gem "omniauth-google-oauth2"
gem "omniauth-rails_csrf_protection"
gem "pdfmonkey"
gem "pg", ">= 0.18", "< 2.0"
gem "pghero"
gem "pry"
gem "pry-byebug", github: "deivid-rodriguez/pry-byebug" # Uses pry 0.14
gem "pry-doc"
gem "pry-rails"
gem "puma"
gem "pundit"
gem "rack-attack"
gem "rails", "~> 7.0.0"
gem "ruby-progressbar", require: false
gem "sass-rails", ">= 6"
gem "sentry-rails"
gem "sentry-ruby"
gem "sentry-sidekiq"
gem "sidekiq"
gem "sidekiq-scheduler"
gem "slim"
gem "stripe"
gem "strong_migrations"
gem "twilio-ruby"
gem "webpacker", "~> 5.1"

group :development, :test do
  gem "database_cleaner-active_record"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "parallel_tests"
end

group :development do
  gem "annotate", github: "dabit/annotate_models", branch: "rails-7"
  gem "benchmark-ips"
  gem "brakeman"
  gem "foreman"
  gem "graphql-rails_logger"
  gem "guard"
  gem "guard-rspec", require: false
  gem "letter_opener"
  gem "listen"
  gem "rubocop", require: false
  gem "rubocop-graphql", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
  gem "sql_spy"
  gem "web-console", require: false
end

group :test do
  gem "capybara"
  gem "rspec-github", require: false
  gem "rspec_junit_formatter"
  gem "rspec-rails"
  gem "rspec-retry"
  gem "selenium-webdriver"
  gem "shoulda-matchers"
  gem "simplecov", require: false
  gem "timecop"
  gem "webdrivers"
  gem "webmock"
end
