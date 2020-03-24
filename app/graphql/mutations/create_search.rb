class Mutations::CreateSearch < Mutations::BaseMutation
  argument :skill, String, required: true
  argument :industry, String, required: true
  argument :industry_experience_required, Boolean, required: false
  argument :company_type, String, required: true
  argument :company_experience_required, Boolean, required: false

  field :search, Types::SearchType, null: true

  def authorized?(**args)
    if context[:current_user].nil?
      raise ApiError::NotAuthenticated.new('You are not logged in')
    end

    if context[:current_user].is_a?(Specialist)
      raise ApiError::InvalidRequest.new(
              'viewerIsSpecialist',
              'You are logged in as a specialist'
            )
    end

    true
  end

  def resolve(**args)
    user = context[:current_user]
    update_user(**args)
    search = user.searches.create(args)
    search.create_recommendation

    { search: search }
  end

  private

  def update_user(**args)
    user = context[:current_user]

    user.update(
      industry: Industry.find_by_name!(args[:industry]),
      company_type: args[:company_type]
    )

    user.sync_to_airtable
  end
end
