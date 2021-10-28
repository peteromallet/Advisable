# frozen_string_literal: true

module Mutations
  class Login < Mutations::BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :viewer, Types::ViewerUnion, null: true

    def resolve(email:, password:)
      account = Account.find_by(email: email)
      ApiError.invalid_request("AUTHENTICATION_FAILED", "Account does not exist") unless account&.has_password?
      ApiError.invalid_request("AUTHENTICATION_FAILED", "Invalid credentials") unless account.authenticate(password)

      login_as(account)
      {viewer: account.specialist_or_user}
    end
  end
end
