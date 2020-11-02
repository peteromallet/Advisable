class Mutations::UpdatePassword < Mutations::BaseMutation
  description <<~HEREDOC
    Updates the logged in specialists/user password.
  HEREDOC

  argument :current_password, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def authorized?(**args)
    requires_current_user!
  end

  def resolve(current_password:, password:, password_confirmation:)
    account = current_user.account

    if account.authenticate(current_password) && password == password_confirmation
      account.update!(password: password)
      {viewer: current_user}
    else
      ApiError.invalid_request(code: 'CAN_NOT_CHANGE_PASSWORD')
    end
  end
end
