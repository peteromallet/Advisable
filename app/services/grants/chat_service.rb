class Grants::ChatService < ApplicationService
  attr_reader :identity

  def initialize(identity:)
    @identity = identity
  end

  # Twilio Chat Tokens expire after 24 hours and are refreshed on the client.
  def call
    grant = Twilio::JWT::AccessToken::ChatGrant.new

    grant.service_sid = ENV.fetch('TWILIO_CHAT_SERVICE_SID')

    token = Twilio::JWT::AccessToken.new(
      ENV.fetch('TWILIO_SID'),
      ENV.fetch('TWILIO_API_KEY_SID'),
      ENV.fetch('TWILIO_API_KEY_SECRET'),
      [grant],
      identity: identity,
      ttl: 86_400
    )

    {
      identity: identity,
      access_token: token.to_jwt
    }
  end
end