# Creates or finds a channel and adds a message.
# NOTE: This is only kicked off from the 1:1 direct message modal.

class ChatDirectMessageJob < ApplicationJob
  def perform(recipient_uid:, sender_uid:, message:)
    client = TwilioChat::Client.new
    channel = client.find_or_create_channel(
      recipient_uid: recipient_uid,
      sender_uid: sender_uid,
      message: message
    )

    # Add both members of the 1:1 direct message chat channel
    if channel.members_count.zero?
      [recipient_uid, sender_uid].each do |identity|
        channel.members.create(identity: identity)
      end
    end

    # Add the first or additional message
    channel.messages.create(body: message, from: sender_uid)

    # Email notify other member of the conversation if they arent online
    other = client.fetch_user(recipient_uid)

    unless other.is_online
      Guild::ChatMailer.new_message(
        recipient_uid: recipient_uid,
        sender_uid: sender_uid,
        channel_sid: channel.sid,
        message_body: message
      ).deliver_later
    end
  end
end