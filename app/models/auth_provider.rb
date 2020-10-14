class AuthProvider < ApplicationRecord
  LINKEDIN_ACCESS_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken".freeze
  belongs_to :account

  scope :linkedin_ads, -> { where(provider: "linkedin_ads") }

  validates :uid, :provider, presence: true
  validates :uid, uniqueness: {scope: :provider}

  def refresh_linkedin_token!
    return if expires_at.nil? || expires_at.future?
    params = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: ENV["LINKEDIN_KEY"],
      client_secret: ENV["LINKEDIN_SECRET"]
    }
    headers = {
      "Content-Type" => "application/x-www-form-urlencoded",
      "Accept" => "application/json"
    }
    response = Faraday.post(LINKEDIN_ACCESS_TOKEN_URL, params, headers)
    if response.status == 200
      body = JSON[response.body]
      self.token = body["access_token"]
      self.refresh_token = body["refresh_token"]
      self.expires_at = Time.zone.now + body["expires_in"]
      save!
    else
      destroy!
    end
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
#  uid           :string
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
