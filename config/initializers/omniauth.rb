# frozen_string_literal: true

require "omniauth/strategies/linkedin"

Rails.application.config.middleware.use(OmniAuth::Builder) do
  provider :google_oauth2, ENV["GOOGLE_ID"], ENV["GOOGLE_SECRET"]
  provider :google_oauth2, ENV["GOOGLE_ID"], ENV["GOOGLE_SECRET"], name: "google_oauth2_calendar", scope: "userinfo.email, calendar", prompt: "consent", access_type: "offline"
  provider :linkedin, ENV["LINKEDIN_KEY"], ENV["LINKEDIN_SECRET"], scope: "r_basicprofile", fields: %w[id first-name last-name picture-url]
end
