require 'simplecov'

SimpleCov.start 'rails' do
  add_filter 'app/dashboards'
  add_filter 'controllers/admin'
  add_filter 'app/fields'
  add_filter 'graphql_controller.rb'
  add_group 'GraphQL', 'app/graphql'
  add_group 'Services', 'app/services'
end


ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)

if Rails.env.production?
  abort('The Rails environment is running in production mode!')
end

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
