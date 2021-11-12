# frozen_string_literal: true

require "google/api_client/client_secrets"
require "google/apis/calendar_v3"

class AuthProvider < ApplicationRecord
  belongs_to :account

  scope :google_calendar, -> { where(provider: "google_oauth2_calendar") }

  validates :uid, :provider, presence: true
  validates :uid, uniqueness: {scope: :provider}

  def self.robot_calendar_provider
    service = Google::Apis::CalendarV3::CalendarService.new
    provider = google_calendar.find do |p|
      p.refresh_google_token!
      service.authorization = p.google_secret.to_authorization
      service.list_calendar_lists.items.find do |calendar|
        calendar.id == ENV["GOOGLE_INTERVIEW_CALENDAR_ID"] && calendar.access_role == "owner"
      end
    end
    return provider if provider

    Sentry.capture_message("GOOGLE ROBOT CALENDAR AUTH REQUIRED", level: "fatal")
  end

  def google_secret
    return unless provider == "google_oauth2_calendar"

    Google::APIClient::ClientSecrets.new({
      "web" => {
        "access_token" => token,
        "refresh_token" => refresh_token,
        "expires_at" => expires_at,
        "client_id" => ENV["GOOGLE_ID"],
        "client_secret" => ENV["GOOGLE_SECRET"]
      }
    })
  end

  def refresh_google_token!
    return if expires_at.future?

    authorization = google_secret.to_authorization
    authorization.refresh!
    update!(token: authorization.access_token, refresh_token: authorization.refresh_token, expires_at: authorization.expires_at)
  end
end

# == Schema Information
#
# Table name: auth_providers
#
#  id            :bigint           not null, primary key
#  blob          :jsonb
#  expires_at    :datetime
#  provider      :string
#  refresh_token :string
#  token         :string
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  account_id    :bigint           not null
#
# Indexes
#
#  index_auth_providers_on_account_id        (account_id)
#  index_auth_providers_on_provider_and_uid  (provider,uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
