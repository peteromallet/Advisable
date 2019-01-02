class Mutations::Setup < Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :country_name, String, required: true
  argument :company_name, String, required: true

  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      user: Users::Setup.call(
        args.merge({
          user: context[:current_user]
        })
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
