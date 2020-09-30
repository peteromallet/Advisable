class Chat::FriendlyNameService < ApplicationService
  MAX_FRIENDLY_NAME = 120
  attr_reader :identity, :channel_sid, :friendly_name

  def initialize(identity:, channel_sid:, friendly_name:)
    @identity = identity
    @friendly_name = friendly_name
    @channel_sid = channel_sid
  end

  def call
    chat_service = client.chat.services(ENV.fetch('TWILIO_CHAT_SERVICE_SID'))
    membership = chat_service.channels(channel_sid).members(identity).fetch
    truncated_name = friendly_name.truncate(MAX_FRIENDLY_NAME)
    channel = chat_service.channels(channel_sid).fetch

    updated_channel = channel.update(friendly_name: truncated_name)
    return updated_channel
  rescue Twilio::REST::RestError
    raise Service::Error.new("participant is not a member of the channel")
  end

  def client
    client ||= Twilio::REST::Client.new(
      ENV.fetch('TWILIO_CHAT_ACCOUNT_SID'),
      ENV.fetch('TWILIO_ACCESS_TOKEN')
    )
  end
end