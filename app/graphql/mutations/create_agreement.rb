# frozen_string_literal: true

module Mutations
  class CreateAgreement < Mutations::BaseMutation
    argument :collaboration, String, required: true
    argument :hourly_rate, Int, required: false
    argument :invoicing, String, required: true
    argument :user, ID, required: true

    field :agreement, Types::Agreement, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(user:, **args)
      agreement = current_user.agreements.build(args)
      agreement.user = User.find_by!(uid: user)
      agreement.company = agreement.user.company
      agreement.status = "pending"

      save_with_current_account!(agreement)

      {agreement: agreement}
    end
  end
end
