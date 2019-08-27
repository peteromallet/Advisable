class Mutations::CompleteSetup < Mutations::BaseMutation
  field :specialist, Types::SpecialistType, null: true

  def authorized?(**args)
    if !context[:current_user]
      raise APIError::NotAuthenticated.new("You are not logged in")
    end

    if context[:current_user].is_a?(User)
      raise APIError::NotAuthenticated.new("You are logged in as a user")
    end

    true
  end

  def resolve(**args)
    specialist = context[:current_user]

    if specialist.account_status != "Started"
      raise APIError::InvalidRequest.new(
        "invlaidAccountStatus", 
        "The account status must be 'Started' but it is #{speicalist.account_status}"
      )
    end

    specialist.account_status = "On Hold"
    specialist.save
    specialist.sync_to_airtable

    { specialist: specialist }
  end
end
