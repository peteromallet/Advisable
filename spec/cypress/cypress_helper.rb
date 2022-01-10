# frozen_string_literal: true

# This is loaded once before the first command is executed
require "database_cleaner/active_record"
require "factory_bot_rails"
require "cypress_on_rails/smart_factory_wrapper"

factory = CypressOnRails::SimpleRailsFactory
factory = FactoryBot if defined?(FactoryBot)

CypressOnRails::SmartFactoryWrapper.configure(
  always_reload: !Rails.configuration.cache_classes,
  factory:,
  files: [
    Rails.root.join("spec/factories.rb"),
    Rails.root.join("spec/factories/**/*.rb")
  ]
)
