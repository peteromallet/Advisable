source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 2.6.1'

# loads env vars from the .env file in dev and test
gem 'dotenv-rails', groups: %i[development test]
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.0'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby
# gem "administrate"
gem 'administrate', git: 'https://github.com/thoughtbot/administrate.git'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'faraday'
gem 'sidekiq'
gem 'rack-attack'

gem 'bcrypt', '~> 3.1.7'

gem 'countries'
gem 'money'
gem 'sentry-raven'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
gem 'webpacker', '~> 4.0.x'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Airrecord for querying airtable
gem 'airrecord', '~> 1.0.2'

# For graphQL endpoint
gem 'graphql'
gem 'parser'
gem 'rollbar'
gem 'stripe', '~> 4.21.0'
gem 'attr_encrypted', '~> 3.0.0'

gem 'jwt'

# For geneating test coverage reports
gem 'simplecov', require: false, group: :test
gem 'pundit'
gem 'nanoid'

gem 'aws-sdk-s3', require: false
gem 'image_processing', '~> 1.2'

group :development, :test do
  gem 'pry'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'rspec-rails', '~> 3.8.2'
  gem 'factory_bot_rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'spring-commands-rspec'
  gem 'prettier'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'webdrivers'
  gem 'shoulda-matchers'
  gem 'webmock'
  gem 'rspec-retry'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'graphiql-rails', group: :development
