require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Advisable
  class Application < Rails::Application
    ORIGIN_HOST = ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    config.active_job.queue_adapter = :sidekiq
    config.action_mailer.default_url_options = {host: ORIGIN_HOST}
    config.action_mailer.asset_host = ORIGIN_HOST
    config.action_mailer.preview_path = Rails.root.join("test/mailers/previews")
    config.action_mailbox.ingress = :sendgrid
    config.assets.paths << Rails.root.join("app/assets/fonts")
  end
end

if ENV['SENTRY_API_DSN']
  Raven.configure do |config|
    config.dsn = ENV['SENTRY_API_DSN']
    config.current_environment = ENV['SENTRY_ENVIRONMENT']
    config.processors -= [Raven::Processor::PostData]
    config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  end
end
