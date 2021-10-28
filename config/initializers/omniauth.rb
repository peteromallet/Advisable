# frozen_string_literal: true

require "omniauth/strategies/linkedin"

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["GOOGLE_ID"], ENV["GOOGLE_SECRET"]
  provider :linkedin, ENV["LINKEDIN_KEY"], ENV["LINKEDIN_SECRET"], scope: "r_basicprofile", fields: %w[id first-name last-name picture-url]
  provider :linkedin, ENV["LINKEDIN_KEY"], ENV["LINKEDIN_SECRET"], scope: "r_liteprofile rw_ads", name: "linkedin_ads", fields: %w[id first-name last-name picture-url]
end
