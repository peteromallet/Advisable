class Mutations::Guild::CreateChatDirectMessage < Mutations::BaseMutation
  description "Creates or updates a 1:1 direct chat message channel"

  argument :recipient_id, ID, required: true
  argument :body, String, required: true

  field :enqueued, Boolean, null: true

  def authorized?(**args)
    requires_guild_user!

    true
  end

  def resolve(recipient_id:, body:)
    identity = context[:current_user].uid

    ChatDirectMessageJob.perform_later(
      message: body,
      sender_uid: identity,
      recipient_uid: recipient_id
    )

    {enqueued: true}
  end
end