class Mutations::Login < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :token, String, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    token = Users::Login.call(args)
    { token: token }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
