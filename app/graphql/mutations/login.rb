class Mutations::Login < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :token, String, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      token: Users::Login.call(
        email: args[:email],
        password: args[:password]
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
