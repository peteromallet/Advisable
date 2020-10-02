class Mutations::Guild::UpdateChatFriendlyName < Mutations::BaseMutation
  description "Updates a 1:1 direct chat message channel friendly name"

  argument :channel_sid, String, required: true

  field :chat_channel, Types::ChatChannelType, null: true
  field :errors, [Types::Error], null: true

  def resolve(channel_sid:)
    identity = context[:current_user].uid

    channel = Chat::FriendlyNameService.call(
      identity: identity,
      channel_sid: channel_sid,
    )

    {chat_channel: channel}
  rescue Service::Error => e
    return {errors: [e]}
  end
end

# mutation {
#   updateChatFriendlyName(input: {
#     channelSid: "CHeeb7ef7cb8db46faabf4806c687b25d8"
#   }) {
#     errors {
#       message
#     }
#   	chatChannel {
#       sid
#       dateUpdated
#       friendlyName
#     }
#   }
# }