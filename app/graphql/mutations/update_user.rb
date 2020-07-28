class Mutations::UpdateUser < Mutations::BaseMutation
  argument :industry, String, required: true
  argument :company_type, String, required: true

  field :user, Types::User, null: true

  def authorized?(**args)
    unless context[:current_user]&.is_a?(User)
      raise ApiError::NotAuthenticated.new
    end

    true
  end

  def resolve(**args)
    user = context[:current_user]
    user.industry = Industry.find_by_name!(args[:industry]) if args[:industry]
    user.company_type = args[:company_type] if args[:company_type]
    user.save
    user.sync_to_airtable

    return { user: user }
  end
end
