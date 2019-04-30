class Mutations::RequestPasswordReset < Mutations::BaseMutation
  argument :email, String, required: true

  field :sent, Boolean, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    Accounts::RequestPasswordReset.call(args[:email])
    { sent: true }

    rescue Service::Error => e
      return { sent: false, errors: [e] }
  end
end
