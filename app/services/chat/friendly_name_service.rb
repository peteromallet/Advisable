class Chat::FriendlyNameService < ApplicationService
  MAX_FRIENDLY_NAME = 120
  attr_reader :identity, :channel_sid

  def initialize(identity:, channel_sid:)
    @identity = identity
    @channel_sid = channel_sid
  end

  def call
    chat_service = client.chat.services(ENV.fetch('TWILIO_CHAT_SERVICE_SID'))
    chat_service.channels(channel_sid).members(identity).fetch
    channel = chat_service.channels(channel_sid).fetch
    last_message = channel.messages.list(limit: 1, page_size: 1, order: 'desc').first&.body
    truncated_name = last_message.truncate(MAX_FRIENDLY_NAME)
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