require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Advisable
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    config.active_job.queue_adapter = :sidekiq

    config.eager_load_paths << Rails.root.join('app/models/concerns/airtable')
    config.eager_load_paths << Rails.root.join('app/models/concerns/fields')


    config.action_mailer.default_url_options = { host: ENV["ORIGIN"] }
    config.action_mailer.asset_host = ENV["ORIGIN"]

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
