# frozen_string_literal: true

module Mutations
  class UpdateAvailability < Mutations::BaseMutation
    argument :id, ID, required: false, deprecation_reason: "Do not provide this anymore"
    argument :availability, [String], required: true, description: "The clients availability. Should be an array of ISO strings"
    argument :time_zone, String, required: false

    field :user, Types::User, null: true

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**args)
      current_user.update!(
        availability: args[:availability],
        time_zone: args[:time_zone]
      )

      {user: current_user}
    end
  end
end
