class Mutations::RequestPasswordReset < Mutations::BaseMutation
  argument :email, String, required: true

  field :sent, Boolean, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    Accounts::RequestPasswordReset.call(
      Account.find_by_email!(args[:email].downcase)
    )

    { sent: true }

    rescue Service::Error => e
      return { sent: false, errors: [e] }
    rescue ActiveRecord::RecordNotFound => e
      return { sent: false, errors: [
        Service::Error.new("request_password_reset.account_not_found")
      ] }
  end
end
