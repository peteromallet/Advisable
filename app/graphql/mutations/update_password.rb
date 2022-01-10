# frozen_string_literal: true

module Mutations
  class UpdatePassword < Mutations::BaseMutation
    description <<~HEREDOC
      Updates the logged in specialists/user password.
    HEREDOC

    argument :current_password, String, required: false
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    field :viewer, Types::ViewerUnion, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(password:, password_confirmation:, current_password: nil)
      account = current_user.account

      if valid_current_password(current_password) && password == password_confirmation
        account.update!(password:)
        {viewer: current_user}
      else
        ApiError.invalid_request("CAN_NOT_CHANGE_PASSWORD")
      end
    end

    private

    def valid_current_password(current_password)
      current_user.account.password_digest.blank? || current_user.account.authenticate(current_password)
    end
  end
end
