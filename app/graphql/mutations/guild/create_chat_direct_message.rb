class Mutations::Guild::CreateChatDirectMessage < Mutations::BaseMutation
  description "Creates or updates a 1:1 direct chat message channel"

  argument :participant_id, ID, required: true
  argument :body, String, required: true

  field :enqueued, Boolean, null: true

  def resolve(participant_id:, body:)
    identity = context[:current_user].uid

    # TODO: policy
    # channel_user = chat_service.users(identity).fetch

    ChatDirectMessageJob.perform_later(
      message: body,
      initiator_id: identity,
      participant_id: participant_id
    )

    {enqueued: true}
  end
end
