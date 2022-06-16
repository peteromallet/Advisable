# frozen_string_literal: true

module Mutations
  class UpdateAvailability < Mutations::BaseMutation
    argument :availability, [String], required: true, description: "An array of ISO strings"

    # This should now handle Specialist so you need to update the frontend
    field :user, Types::User, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(availability:)
      current_account_responsible_for do
        current_user.account.update!(availability:)
      end
      {user: current_user}
    end
  end
end
