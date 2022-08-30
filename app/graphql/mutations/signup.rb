# frozen_string_literal: true

module Mutations
  class Signup < Mutations::BaseMutation
    argument :email, String, required: true
    argument :id, ID, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    field :viewer, Types::ViewerUnion, null: true

    def resolve(**args)
      email_taken?(args[:email])
      specialist_or_user = SpecialistOrUser.find_by_uid!(args[:id])
      account = specialist_or_user.account
      valid_account_already_exists?(account)

      account.assign_attributes(
        email: args[:email],
        password: args[:password],
        password_confirmation: args[:password_confirmation]
      )

      success = Logidze.with_responsible(account.id) do
        account.save
      end

      if success
        specialist_or_user.send_confirmation_email
        specialist_or_user.bg_sync_to_airtable
      else
        signup_failed(account)
      end

      login_as(account)
      {viewer: specialist_or_user}
    end

    private

    def email_taken?(email)
      account = Account.find_by(email:)
      return unless account&.has_password?

      ApiError.invalid_request("ACCOUNT_EXISTS", "Account with this email already exists")
    end

    def valid_account_already_exists?(account)
      return unless account.has_password?

      ApiError.invalid_request("ACCOUNT_EXISTS", "Account already exists")
    end

    def signup_failed(account)
      message = account.errors.full_messages.first
      ApiError.invalid_request("SIGNUP_FAILED", message)
    end
  end
end
