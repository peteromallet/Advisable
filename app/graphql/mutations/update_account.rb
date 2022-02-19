# frozen_string_literal: true

module Mutations
  class UpdateAccount < Mutations::BaseMutation
    argument :avatar, String, required: false
    argument :email, String, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :timezone, String, required: false

    field :account, Types::Account, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**args)
      assignable = args.except(:avatar)
      current_account.assign_attributes(assignable) if assignable.present?
      current_account.avatar.attach(args[:avatar]) if args.key?(:avatar)

      success = current_account_responsible_for do
        current_account.save
      end

      current_user.bg_sync_to_airtable if current_user.is_a?(Specialist)

      ApiError.invalid_request("FAILED_TO_UPDATE", current_account.errors.full_messages.first) unless success

      {account: current_account}
    end
  end
end
