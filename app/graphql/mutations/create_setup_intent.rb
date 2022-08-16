# frozen_string_literal: true

module Mutations
  class CreateSetupIntent < Mutations::BaseMutation
    field :secret, String, null: true

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**_args)
      intent = Stripe::SetupIntent.create
      current_user.company.update(
        stripe_setup_intent_id: intent.id,
        setup_intent_status: "pending"
      )

      {secret: intent.client_secret}
    end
  end
end
