class Mutations::UpdateUser < Mutations::BaseMutation
  argument :industry, String, required: false
  argument :company_type, String, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    unless context[:current_user]&.is_a?(User)
      raise ApiError::NotAuthenticated.new
    end

    true
  end

  def resolve(**args)
    user = context[:current_user]

    # If the users address has not yet been set then schedule the geocode job
    unless user.address.provided?
      GeocodeUserJob.perform_later(user.id, context[:client_ip])
    end

    user.industry = Industry.find_by_name!(args[:industry]) if args[:industry]
    user.company_type = args[:company_type] if args[:company_type]
    user.save
    user.sync_to_airtable

    return { user: user }
  end
end
