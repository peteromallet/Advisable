module Integrations
  class TwilioChat::Client
    MAX_FRIENDLY_NAME = 120
    attr_reader :client

    def initialize
      @client = Twilio::REST::Client.new(
        ENV.fetch('TWILIO_CHAT_ACCOUNT_SID'),
        ENV.fetch('TWILIO_ACCESS_TOKEN')
      )      
    end

    def chat_service
      @chat_service ||= client.chat.services(ENV.fetch('TWILIO_CHAT_SERVICE_SID'))
    end

    def get_channel(channel_sid)
      chat_service.channels(channel_sid).fetch
    end
    
    # Service utilities

    def check_membership!(channel_sid, identity)
      chat_service.channels(channel_sid).members(identity).fetch
    end

    def set_friendly_name_last_message(channel_sid)
      channel = get_channel(channel_sid)
      last_message = channel.messages.list(limit: 1, page_size: 1, order: 'desc').first&.body
      truncated_name = last_message.truncate(MAX_FRIENDLY_NAME)
      updated_channel = channel.update(friendly_name: truncated_name)
      updated_channel
    end

    def has_unread_messages(identity)
      member = chat_service.users(identity).fetch
      member.user_channels.list.any? { |channel| channel&.unread_messages_count != 0 }
    end

    # TODO: Webhooks for email notification dispatch and inline reply
    # https://www.twilio.com/docs/chat/webhook-events

  end
end
