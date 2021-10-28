# frozen_string_literal: true

class Mutations::CreateSetupIntent < Mutations::BaseMutation
  field :secret, String, null: true

  def authorized?(**args)
    requires_client!
  end

  def resolve(**args)
    intent = Stripe::SetupIntent.create
    current_user.company.update(
      stripe_setup_intent_id: intent.id,
      setup_intent_status: "pending"
    )

    {secret: intent.client_secret}
  end
end
