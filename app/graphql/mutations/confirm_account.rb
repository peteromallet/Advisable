class Mutations::ConfirmAccount < Mutations::BaseMutation
  argument :email, String, required: true
  argument :token, String, required: true

  field :token, String, null: true
  field :viewer, Types::ViewerUnion, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    account = Account.find_by_email!(args[:email])

    {
      token: Accounts::Jwt.call(account),
      viewer: Accounts::Confirm.call(account: account, token: args[:token])
    }

    rescue Service::Error => e
      raise APIError::InvalidRequest.new(e.code, e.message)
  end
end
