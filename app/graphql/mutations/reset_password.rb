class Mutations::ResetPassword < Mutations::BaseMutation
  argument :email, String, required: true
  argument :token, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :reset, Boolean, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    Accounts::ResetPassword.call({
      account: Account.find_by_email!(args[:email].downcase),
      token: args[:token],
      password: args[:password],
      password_confirmation: args[:password_confirmation]
    })

    { reset: true }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
