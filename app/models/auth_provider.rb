# frozen_string_literal: true

require "google/api_client/client_secrets"

class AuthProvider < ApplicationRecord
  belongs_to :account

  scope :google_calendar, -> { where(provider: "google_oauth2_calendar") }

  validates :uid, :provider, presence: true
  validates :uid, uniqueness: {scope: :provider}

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
