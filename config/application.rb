require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Advisable
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.active_job.queue_adapter = :sidekiq

    config.action_mailer.default_url_options = {
      host: ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
    }
    config.action_mailer.asset_host =
      ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
    config.action_mailer.preview_path = "#{Rails.root}/test/mailers/previews"

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')

    config.action_mailbox.ingress = :sendgrid
  end
end

if ENV['SENTRY_API_DSN']
  Raven.configure do |config|
    config.dsn = ENV['SENTRY_API_DSN']
    config.current_environment = ENV['SENTRY_ENVIRONMENT']
    config.sanitize_fields =
      Rails.application.config.filter_parameters.map(&:to_s)
  end
end
