# frozen_string_literal: true

module HostHelper
  def root_host
    "https://advisable.com"
  end

  def app_host
    heroku_name = ENV.fetch("HEROKU_APP_NAME", nil)
    if heroku_name.present? && heroku_name != "advisable"
      "https://#{heroku_name}.herokuapp.com"
    elsif Rails.env.production?
      "https://app.advisable.com"
    else
      ActionMailer::Base.default_url_options[:host]
    end
  end
end
