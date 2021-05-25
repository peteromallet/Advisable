# frozen_string_literal: true

module Mutations
  class RequestPasswordReset < Mutations::BaseMutation
    argument :email, String, required: true

    field :sent, Boolean, null: true

    def resolve(email:)
      account = Account.find_by(email: email)

      if account.blank?
        ApiError.invalid_request("ACCOUNT_NOT_FOUND")
      else
        account.reset_password!
        {sent: true}
      end
    end
  end
end
