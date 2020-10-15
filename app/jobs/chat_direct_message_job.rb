# Creates or finds a channel and adds a message.
# NOTE: This is only kicked off from the 1:1 direct message modal.

class ChatDirectMessageJob < ApplicationJob
  def perform(recipient_uid:, sender_uid:, message:, guild_post_id: nil, guild_calendly_link: nil)
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

    # If this message is an offer to help on a guild post:
    #  a. count this as an engagment
    #  b. modify the message to include the context
    if guild_post_id && (guild_post = Guild::Post.find(guild_post_id))
      context = "Offering help for '#{guild_post.title}':\n\n"
      @message_with_context = "#{context} #{message}"
      guild_post.record_engagement!
    end

    # Add the first or additional message
    channel.messages.create(
      from: sender_uid,
      body: @message_with_context || message,
      attributes: guild_calendly_link ? {calendly_link: guild_calendly_link}.to_json : {}
    )

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