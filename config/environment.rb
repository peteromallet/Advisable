# frozen_string_literal: true

# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  user_name: ENV.fetch("SENDGRID_USERNAME", nil),
  password: ENV.fetch("SENDGRID_PASSWORD", nil),
  domain: ENV.fetch("SENDGRID_DOMAIN", nil),
  address: "smtp.sendgrid.net",
  port: 587,
  authentication: :plain,
  enable_starttls_auto: true
}
