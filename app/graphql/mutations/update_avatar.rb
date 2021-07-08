# frozen_string_literal: true

module Mutations
  class UpdateAvatar < Mutations::BaseMutation
    description "Update avatar of currently signed in user"

    argument :avatar, String, required: true

    field :viewer, Types::ViewerUnion, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(avatar:)
      current_user.avatar.attach(avatar)

      success = current_account_responsible_for do
        current_user.save
      end

      ApiError.invalid_request("FAILED_TO_UPDATE", current_user.errors.full_messages.first) unless success

      current_user.sync_to_airtable

      {viewer: current_user}
    end
  end
end
