class Mutations::Signup < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :token, String, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    user = Accounts::Signup.call(args)
    token = Accounts::JWT.call(user)
    { token: token }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
