class Mutations::CreateFreelancerAccount < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :token, String, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    specialist = Specialist.find_by_airtable_id!(args[:id])
    specialist = Specialists::CreateAccount.call(args.except(:id).merge({
      specialist: specialist
    }))
    token = Accounts::JWT.call(specialist)
    { token: token }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
