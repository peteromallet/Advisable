# Updates the specialist application stage from 'On Hold' to 'Full Application'
class Mutations::SubmitFullApplication < Mutations::BaseMutation
  field :specialist, Types::SpecialistType, null: true

  # The completeSetup mutation requires a specalist to be logged in.
  def authorized?(**args)
    specialist = context[:current_user]

    raise ApiError::NotAuthenticated.new if !specialist

    if specialist.is_a?(User)
      raise ApiError::NotAuthenticated.new('You are logged in as a user')
    end

    if specialist.application_stage != 'On Hold'
      raise ApiError::InvalidRequest.new(
              'invalidApplicationStage',
              "The account status must be 'On Hold' but it is #{
                specialist.application_stage
              }"
            )
    end

    true
  end

  def resolve(**args)
    specialist = context[:current_user]
    specialist.application_stage = 'Full Application'
    specialist.save
    specialist.sync_to_airtable

    { specialist: specialist }
  end
end
