class Mutations::Signup < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :token, String, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    user = Users::Signup.call(args)
    token = Users::CreateToken.call(user: user)
    { token: token }

    rescue Service::Error => e
      return { errors: [e] }
  end

  private

  def session
    context[:session]
  end
end
