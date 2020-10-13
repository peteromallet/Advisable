class Mutations::Guild::UpdateChatFriendlyName < Mutations::BaseMutation
  description "Updates a 1:1 direct chat message channel friendly name"

  argument :channel_sid, String, required: true

  field :chat_channel, Types::ChatChannelType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!
    true
  end

  def resolve(channel_sid:)
    identity = context[:current_user].uid

    channel = Chat::FriendlyNameService.call(
      identity: identity,
      channel_sid: channel_sid
    )

    {chat_channel: channel}
  rescue Service::Error => e
    {errors: [e]}
  end
end