class ChatDirectMessageJob < ApplicationJob
  def perform(initiator_id:, participant_id:, message:)
    unique_name = Digest::MD5.hexdigest([initiator_id, participant_id].sort.join)
    chat_service = client.chat.services(ENV.fetch('TWILIO_CHAT_SERVICE_SID'))
    friendly_name = message.truncate(Chat::FriendlyNameService::MAX_FRIENDLY_NAME)

    # find or initialize the private channel
    channel = begin
      chat_service.channels(unique_name).fetch
              rescue Twilio::REST::RestError
                chat_service.channels.create(
                  type: 'private',
                  unique_name: unique_name,
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

    # Add both members of the 1:1 direct message chat channel
    if channel.members_count.zero?
      [initiator_id, participant_id].each do |identity|
        channel.members.create(identity: identity)
      end
    end

    # Add the first or addtional message
    # Note: We can also additional store context with, attributes: {}
    channel.messages.create(body: message, from: initiator_id)
  end

  def client
    @client ||= Twilio::REST::Client.new(
      ENV.fetch('TWILIO_CHAT_ACCOUNT_SID'),
      ENV.fetch('TWILIO_ACCESS_TOKEN')
    )
  end
end