# frozen_string_literal: true

module Mutations
  class UpdateAvailability < Mutations::BaseMutation
    argument :availability, [String], required: true, description: "An array of ISO strings"

    # Do we need this anymore now that we have #timezone on Account?
    argument :time_zone, String, required: false

    # This should now handle Specialist so you need to update the frontend
    field :user, Types::User, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**args)
      current_account_responsible_for do
        current_user.update!(time_zone: args[:time_zone]) if args[:time_zone] && current_user.respond_to?(:time_zone)
        current_user.account.update!(availability: args[:availability])
      end
      {user: current_user}
    end
  end
end
