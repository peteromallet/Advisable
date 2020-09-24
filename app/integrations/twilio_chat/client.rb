module Integrations
  class TwilioChat::Client
    MAX_FRIENDLY_NAME = 120
    attr_reader :client, :channel_sid, :identity

    def initialize(channel_sid: nil, identity: nil)
      @client = Twilio::REST::Client.new(
        ENV.fetch('TWILIO_CHAT_ACCOUNT_SID'),
        ENV.fetch('TWILIO_ACCESS_TOKEN')
      )
      @channel_sid = channel_sid
      @identity = identity
    end

    def chat_service
      @chat_service ||= client.chat.services(ENV.fetch('TWILIO_CHAT_SERVICE_SID'))
    end

    def channel
      @channel ||= chat_service.channels(channel_sid).fetch
    end

    def check_membership
      chat_service.channels(channel_sid).members(identity).fetch
    end

    def has_unread_messages?
      member = chat_service.users(identity).fetch
      member.user_channels.list.any? { |channel| channel&.unread_messages_count != 0 }
    end

    # Service utilities

    def find_or_create_channel(initiator_id:, participant_id:, message:)
      friendly_name = message.truncate(MAX_FRIENDLY_NAME)
      @channel_sid = Digest::MD5.hexdigest([initiator_id, participant_id].sort.join)
      channel
    rescue Twilio::REST::RestError
      chat_service.channels.create(
        type: 'private',
        unique_name: channel_sid,
        friendly_name: friendly_name,
        attributes: {
          subject: friendly_name,
          members: {
            initiator_id: initiator_id,
            participant_id: participant_id
          }
        }.to_json
      )
    end

    def update_friendly_name!
      last_message = channel.messages.list(limit: 1, page_size: 1, order: 'desc').first&.body
      truncated_name = last_message.truncate(MAX_FRIENDLY_NAME)
      channel.update(friendly_name: truncated_name)
    end

    # TODO: Webhooks for email notification dispatch and inline reply
    # https://www.twilio.com/docs/chat/webhook-events
  end
end
