# frozen_string_literal: true

class Mutations::SendMessage < Mutations::BaseMutation
  argument :conversation_id, ID, required: true
  argument :content, String, required: true

  field :message, Types::MessageType, null: true

  def authorized?(**args)
    requires_current_user!

    true
  end

  def resolve(**args)
    conversation = Conversation.find(args[:conversation_id])
    message = conversation.messages.create(
      content: args[:content],
      account: current_user.account
    )

    conversation.accounts.each do |account|
      AdvisableSchema.subscriptions.trigger(:new_message, {}, message, scope: account.uid)
    end

    {message: message}
  end
end
