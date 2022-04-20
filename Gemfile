# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "~> 3.1.2"

gem "active_link_to"
gem "airrecord"
gem "analytics-ruby", require: "segment/analytics"
gem "aws-sdk-s3"
gem "barnes"
gem "bcrypt"
gem "bootsnap", require: false
gem "countries"
gem "dalli"
gem "debug"
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
gem "hotwire-rails"
gem "image_processing"
gem "logidze"
gem "matrix"
gem "memoist"
gem "money"
gem "nanoid"
gem "omniauth"
gem "omniauth-google-oauth2"
gem "omniauth-rails_csrf_protection"
gem "pdfmonkey"
gem "pg", ">= 0.18", "< 2.0"
gem "pghero"
gem "propshaft"
gem "puma"
gem "pundit"
gem "rack-attack"
gem "rails", "~> 7.0.0"
gem "ruby-openai"
gem "ruby-progressbar", require: false
gem "rubyzip"
gem "sentry-rails"
gem "sentry-ruby"
gem "sentry-sidekiq"
gem "shakapacker", "6.1.1"
gem "sidekiq"
gem "sidekiq-scheduler"
gem "slim"
gem "stripe"
gem "twilio-ruby"

group :development, :test do
  gem "database_cleaner-active_record"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "parallel_tests"
  gem "rack-mini-profiler"
  gem "stackprof"
end

group :development do
  gem "annotate"
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
  gem "stripe-ruby-mock", require: "stripe_mock"
  gem "timecop"
  gem "webdrivers"
  gem "webmock"
end
