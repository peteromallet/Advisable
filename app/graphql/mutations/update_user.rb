class Mutations::UpdateUser < Mutations::BaseMutation
  argument :industry, String, required: false
  argument :company_type, String, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    unless context[:current_user].is_a?(User)
      raise ApiError::NotAuthenticated.new
    end

    true
  end

  def resolve(**args)
    user = context[:current_user]

    # If the users address has not yet been set then schedule the geocode job
    unless user.company.address.provided?
      GeocodeUserJob.perform_later(user.id, context[:client_ip])
    end

    company_args = {}

    company_args[:industry] = Industry.find_by!(name: args[:industry]) if args[:industry]
    company_args[:kind] = args[:company_type] if args[:company_type]

    user.company.update(company_args)

    current_account_responsible_for { user.save }
    user.sync_to_airtable

    {user: user}
  end
end
