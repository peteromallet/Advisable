class Mutations::CreateSetupIntent < Mutations::BaseMutation
  field :secret, String, null: true
  field :errors, [Types::Error], null: true

  # There must be a User logged in ( not a specialist )
  def authorized?(**args)
    return true if context[:current_user].is_a?(User)
    return false, { errors: [{ code: "notAuthorized" }] }
  end

  def resolve(**args)
    intent = Stripe::SetupIntent.create
    user.update_columns(
      stripe_setup_intent_id: intent.id,
      setup_intent_status: 'pending'
    )

    {
      secret: intent.client_secret
    }
  end

  private

  def user
    context[:current_user]
  end
end
