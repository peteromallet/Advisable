# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Advisable
  class Application < Rails::Application
    ORIGIN_HOST = ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults(6.1)
    config.add_autoload_paths_to_load_path = false

    config.active_job.queue_adapter = :sidekiq
    config.action_mailer.default_url_options = {host: ORIGIN_HOST}
    config.action_mailer.asset_host = ORIGIN_HOST
    config.action_mailer.preview_path = Rails.root.join("test/mailers/previews")
    config.action_mailbox.ingress = :sendgrid
    config.assets.paths << Rails.root.join("app/assets/fonts")

    config.skylight.probes += %w[redis graphql faraday]

    # Do not load log_data columns unless needed
    config.logidze.ignore_log_data_by_default = true
  end
end
