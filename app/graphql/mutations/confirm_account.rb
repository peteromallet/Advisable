class Mutations::ConfirmAccount < Mutations::BaseMutation
  argument :email, String, required: true
  argument :token, String, required: true

  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      user: Accounts::Confirm.call({
        account: Account.find_by_email!(args[:email]),
        token: args[:token]
      })
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
