source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 2.6.6'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0', '>= 6.0.3.4'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby
gem 'administrate'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'faraday'
gem 'sidekiq', '< 7'
gem 'rack-attack'

gem 'bcrypt', '~> 3.1.7'

gem 'countries'
gem 'geocoder'
gem 'money'
gem 'sentry-raven'
gem 'omniauth'
gem 'omniauth-linkedin-oauth2', github: 'decioferreira/omniauth-linkedin-oauth2', branch: 'master'
gem 'omniauth-rails_csrf_protection', '~> 0.1'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

gem 'webpacker', '~> 5.1'
gem 'slim'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

# Airrecord for querying airtable
gem 'airrecord', '~> 1.0.5'

# For graphQL endpoint
gem 'graphql'
gem 'parser'
gem 'stripe', '~> 5.14'
gem 'attr_encrypted', '~> 3.1.0'

gem 'pundit'
gem 'nanoid'

gem 'aws-sdk-s3', '~> 1'
gem 'image_processing', '~> 1.0'
gem 'faker', git: 'https://github.com/faker-ruby/faker.git', branch: 'master'

# Guild
gem "jsonb_accessor", "~> 1.1.0"
gem 'acts-as-taggable-on', '~> 6.0'
gem 'acts_as_follower', github: 'tcocca/acts_as_follower', branch: 'master'
gem 'twilio-ruby'

gem 'graphql_playground-rails'

group :development, :test do
  gem 'pry'
  gem 'pry-doc'
  gem 'dotenv-rails'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'rspec-rails', '~> 4.0.0'
  gem 'factory_bot_rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'spring-commands-rspec'
  gem 'pry-rails'
  gem 'niceql'
  gem 'graphql-rails_logger'
  gem 'rubocop', require: false
  gem 'annotate'
  gem 'guard'
  gem 'guard-rspec', require: false
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara'
  gem 'timecop'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'shoulda-matchers'
  gem 'webmock'
  gem 'rspec-retry'
  gem 'rspec_junit_formatter'
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
