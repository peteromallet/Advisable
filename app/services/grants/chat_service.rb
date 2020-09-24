class Grants::ChatService < ApplicationService
  attr_reader :identity

  def initialize(identity:)
    @identity = identity
  end

  def call
    # https://www.rubydoc.info/gems/twilio-ruby/Twilio/JWT/AccessToken
    grant = Twilio::JWT::AccessToken::ChatGrant.new

    # https://www.twilio.com/console/chat/services
    grant.service_sid = ENV.fetch('TWILIO_CHAT_SERVICE_SID')

    token = Twilio::JWT::AccessToken.new(
      ENV.fetch('TWILIO_CHAT_ACCOUNT_SID'),
      ENV.fetch('TWILIO_CHAT_SID'),
      ENV.fetch('TWILIO_CHAT_SECRET'),
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