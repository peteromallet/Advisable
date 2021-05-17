# frozen_string_literal: true

# Updates the specialist application stage from 'On Hold' to 'Full Application'
module Mutations
  class SubmitFullApplication < Mutations::BaseMutation
    field :specialist, Types::SpecialistType, null: true

    # The completeSetup mutation requires a specalist to be logged in.
    def authorized?(**_args)
      specialist = current_user

      ApiError.not_authenticated unless specialist

      ApiError.not_authenticated('You are logged in as a user') if specialist.is_a?(::User)

      ApiError.invalid_request("invalidApplicationStage", "The account status must be 'On Hold' but it is #{specialist.application_stage}") if specialist.application_stage != 'On Hold'

      true
    end

    def resolve(**_args)
      specialist = current_user
      specialist.application_stage = 'Full Application'
      current_account_responsible_for { specialist.save }
      specialist.sync_to_airtable

      {specialist: specialist}
    end
  end
end
