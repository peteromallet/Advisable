class Mutations::Signup < Mutations::BaseMutation
  argument :id, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :token, String, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    account = Accounts::Signup.call(
      airtable_id: args[:id],
      email: args[:email],
      password: args[:password],
      password_confirmation: args[:password_confirmation]
    )

    token = Accounts::JWT.call(account)
    { token: token }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
