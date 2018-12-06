class Mutations::ConfirmAccount < Mutations::BaseMutation
  argument :token, String, required: true

  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      user: Users::Confirm.call(args)
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
