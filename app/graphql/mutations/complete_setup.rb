class Mutations::CompleteSetup < Mutations::BaseMutation
  field :specialist, Types::SpecialistType, null: true

  def authorized?(**args)
    if !context[:current_user]
      raise ApiError::NotAuthenticated.new("You are not logged in")
    end

    if context[:current_user].is_a?(User)
      raise ApiError::NotAuthenticated.new("You are logged in as a user")
    end

    true
  end

  def resolve(**args)
    specialist = context[:current_user]

    if specialist.application_stage != "Started"
      raise ApiError::InvalidRequest.new(
        "invlaidapplicationStage", 
        "The account status must be 'Started' but it is #{speicalist.application_stage}"
      )
    end

    specialist.application_stage = "On Hold"
    specialist.save
    specialist.sync_to_airtable

    { specialist: specialist }
  end
end
