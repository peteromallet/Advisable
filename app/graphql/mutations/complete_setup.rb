# Updates the specialist application_stage from 'Started' to 'On Hold'
class Mutations::CompleteSetup < Mutations::BaseMutation
  field :specialist, Types::SpecialistType, null: true

  # The completeSetup mutation requires a specalist to be logged in.
  def authorized?(**args)
    specialist = context[:current_user]

    if !specialist
      raise ApiError::NotAuthenticated.new("You are not logged in")
    end

    if specialist.is_a?(User)
      raise ApiError::NotAuthenticated.new("You are logged in as a user")
    end

    if specialist.application_stage != "Started"
      raise ApiError::InvalidRequest.new(
        "invalidApplicationStage", 
        "The account status must be 'Started' but it is #{specialist.application_stage}"
      )
    end

    true
  end

  def resolve(**args)
    specialist = context[:current_user]
    specialist.application_stage = "On Hold"
    specialist.save
    specialist.sync_to_airtable

    { specialist: specialist }
  end
end
