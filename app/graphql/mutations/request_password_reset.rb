class Mutations::RequestPasswordReset < Mutations::BaseMutation
  argument :email, String, required: true

  field :sent, Boolean, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    Users::RequestPasswordReset.call({
      user: User.find_by_email!(args[:email].downcase)
    })

    { sent: true }

    rescue Service::Error => e
      return { sent: false, errors: [e] }
    rescue ActiveRecord::RecordNotFound => e
      return { sent: false, errors: [
        Service::Error.new("Cant find user")
      ] }
  end
end
