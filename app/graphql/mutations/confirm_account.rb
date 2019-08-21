class Mutations::ConfirmAccount < Mutations::BaseMutation
  argument :email, String, required: true
  argument :token, String, required: true

  field :viewer, Types::ViewerUnion, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      viewer: Accounts::Confirm.call({
        account: Account.find_by_email!(args[:email]),
        token: args[:token]
      })
    }

    rescue Service::Error => e
      raise APIError::InvalidRequest.new(e.code, e.message)
  end
end
