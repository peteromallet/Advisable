# frozen_string_literal: true

module Mutations
  class CreateUserForCompany < Mutations::BaseMutation
    description "Creates User for a Company"

    include Mutations::Helpers::BlacklistedEmail

    argument :email, String, required: true
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :team_manager, Boolean, required: false

    field :user, Types::User, null: true

    def authorized?(**_args)
      requires_team_manager!
    end

    def resolve(email:, **optional)
      email_blacklisted?(email)
      attributes = optional.slice(:first_name, :last_name)
      attributes[:permissions] = optional[:team_manager] ? [:team_manager] : []
      account = Account.new(email: email, **attributes)
      account.save!

      new_user = current_user.invite_comember!(account)
      UserMailer.invited_by_manager(current_user, new_user).deliver_later

      {user: new_user}
    rescue ActiveRecord::RecordInvalid
      if account.errors.added?(:email, :taken, value: email)
        ApiError.invalid_request("emailTaken", "The email #{email} is already used by another account.")
      elsif account.errors.added?(:email, :blank)
        ApiError.invalid_request("emailBlank", "Email is required.")
      else
        raise
      end
    end
  end
end
