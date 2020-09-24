class ChatDirectMessageJob < ApplicationJob
  def perform(initiator_id:, participant_id:, message:)
    client = TwilioChat::Client.new
    channel = client.find_or_create_channel(
      initiator_id: initiator_id,
      participant_id: participant_id,
      message: message
    )

    # Add both members of the 1:1 direct message chat channel
    if channel.members_count.zero?
      [initiator_id, participant_id].each do |identity|
        channel.members.create(identity: identity)
      end
    end

    # Add the first or additional message
    channel.messages.create(body: message, from: initiator_id)
  end
end