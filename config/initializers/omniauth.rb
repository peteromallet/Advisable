# frozen_string_literal: true

require "omniauth/strategies/linkedin"

Rails.application.config.middleware.use(OmniAuth::Builder) do
  provider :google_oauth2, ENV.fetch("GOOGLE_ID", nil), ENV.fetch("GOOGLE_SECRET", nil)
  provider :google_oauth2, ENV.fetch("GOOGLE_ID", nil), ENV.fetch("GOOGLE_SECRET", nil), name: "google_oauth2_calendar", scope: "userinfo.email, calendar", prompt: "consent", access_type: "offline"
  provider :linkedin, ENV.fetch("LINKEDIN_KEY", nil), ENV.fetch("LINKEDIN_SECRET", nil), scope: "r_basicprofile", fields: %w[id first-name last-name picture-url]
end
