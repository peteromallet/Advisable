# frozen_string_literal: true

module Mutations
  class UpdateTimezone < Mutations::BaseMutation
    argument :timezone, String, required: true

    field :viewer, Types::ViewerUnion, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(timezone:)
      current_account.timezone = timezone
      success = current_account_responsible_for { current_account.save }
      ApiError.invalid_request("FAILED_TO_UPDATE", current_account.errors.full_messages.first) unless success

      {viewer: current_user}
    end
  end
end
