module Integrations
  class TwilioChat::Client
    MAX_FRIENDLY_NAME = 120
    attr_reader :client
    attr_accessor :channel_sid, :identity

    def initialize(channel_sid: nil, identity: nil)
      @client = Twilio::REST::Client.new(
        ENV.fetch('TWILIO_SID'),
        ENV.fetch('TWILIO_AUTH_TOKEN')
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

    def find_or_create_channel(sender_uid:, recipient_uid:, message:)
      friendly_name = message.truncate(MAX_FRIENDLY_NAME)
      @channel_sid = Digest::MD5.hexdigest([sender_uid, recipient_uid].sort.join)
      channel
    rescue Twilio::REST::RestError
      chat_service.channels.create(
        type: 'private',
        unique_name: channel_sid,
        friendly_name: friendly_name,
        attributes: {
          subject: friendly_name,
          members: {
            sender_uid: sender_uid,
            recipient_uid: recipient_uid
          }
        }.to_json
      )
    end

    def fetch_other_participant
      channel_member_uids = JSON.parse(channel.attributes)["members"]&.values
      other_uid = channel_member_uids.find { |uid| uid != identity }
      fetch_user(other_uid)
    end

    def fetch_user(user_identity)
      chat_service.users(user_identity).fetch
    end

    def update_friendly_name!
      last_message = channel.messages.list(limit: 1, page_size: 1, order: 'desc').first&.body
      truncated_name = last_message.truncate(MAX_FRIENDLY_NAME)
      channel.update(friendly_name: truncated_name)
    end
  end
end
