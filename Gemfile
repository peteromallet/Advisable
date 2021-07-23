source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "~> 3.0.1"

gem "rails", "~> 6.1"
gem "pg", ">= 0.18", "< 2.0"
gem "strong_migrations"
gem "good_migrations"
gem "pghero"
gem "logidze", ">= 1.0.0"
gem "fx"
gem "puma"
gem "puma_worker_killer"
gem "barnes"
gem "sass-rails", ">= 6"
gem "administrate"
gem "faraday"
gem "faraday_middleware"
gem "memoist"
gem "sidekiq", "< 7"
gem "rack-attack"
gem "bcrypt"
gem "countries"
gem "geocoder"
gem "money"
gem "sentry-ruby"
gem "sentry-rails"
gem "sentry-sidekiq"
gem "webpacker", "~> 5.1"
gem "slim"
gem "bootsnap", require: false

gem "skylight"

gem "omniauth"
gem "omniauth-google-oauth2"
gem "omniauth-rails_csrf_protection"

gem "airrecord"

gem "graphql"
gem "parser"
gem "stripe"
gem "attr_encrypted"

gem "pundit"
gem "nanoid"

gem "aws-sdk-s3"
gem "image_processing"
gem "faker"
gem "twilio-ruby"
gem "graphql_playground-rails"

# Guild
gem "email_reply_parser"
gem "administrate-field-active_storage"

gem "pry"
gem "pry-rails"
# gem "pry-doc" Does not support Ruby 3 yet
gem "pry-byebug", github: "deivid-rodriguez/pry-byebug" # Uses pry 0.14
gem "ruby-progressbar", require: false
gem "app_profiler"

group :development, :test do
  gem "parallel_tests"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "database_cleaner-active_record"
end

group :development do
  gem "web-console", require: false
  gem "listen"
  gem "graphql-rails_logger"
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rspec", require: false
  gem "rubocop-graphql", require: false
  gem "annotate"
  gem "foreman"
  gem "guard"
  gem "guard-rspec", require: false
  gem "letter_opener"
  gem "brakeman"
  gem "benchmark-ips"
end

group :test do
  gem "capybara"
  gem "timecop"
  gem "selenium-webdriver"
  gem "webdrivers"
  gem "shoulda-matchers"
  gem "webmock"
  gem "rspec-rails"
  gem "rspec-retry"
  gem "rspec_junit_formatter"
  gem "rspec-github", require: false
  gem "simplecov", require: false
end
