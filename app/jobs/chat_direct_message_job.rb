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

    post = guild_post_id.blank? ? nil : Guild::Post.find(guild_post_id)

    # Add both members of the 1:1 direct message chat channel
    if channel.members_count.zero?
      [recipient_uid, sender_uid].each do |identity|
        client.create_channel_member(channel, identity: identity)
      end
    end

    # If this message relates to a post then
    #  1. create a post engagement
    #  2. update calendly link if there is one
    if post.present?
      specialist_sender = Specialist.find_by(uid: sender_uid)
      if post.engagements.where(specialist: specialist_sender).none?
        post.engagements.create(specialist: specialist_sender)
      end

      if guild_calendly_link && specialist_sender.guild_calendly_link.nil?
        specialist_sender.update(guild_calendly_link: guild_calendly_link)
      end
    end

    # Add the first or additional message
    client.create_channel_message(channel, {
      from: sender_uid,
      body: message,
      attributes: attributes(post, guild_calendly_link)
    })

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

  private

  def attributes(post, guild_calendly_link)
    {
      post: post&.id,
      postType: post&.type,
      postTitle: post&.title,
      calendlyLink: guild_calendly_link,
    }.compact.to_json
  end
end
