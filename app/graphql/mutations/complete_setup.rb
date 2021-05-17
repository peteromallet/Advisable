# frozen_string_literal: true

# Updates the specialist application_stage from 'Started' to 'On Hold'
module Mutations
  class CompleteSetup < Mutations::BaseMutation
    field :specialist, Types::SpecialistType, null: true

    # The completeSetup mutation requires a specalist to be logged in.
    def authorized?(**_args)
      specialist = current_user

      ApiError.not_authenticated unless specialist
      ApiError.not_authenticated("You are logged in as a client") if specialist.is_a?(::User)

      ApiError.invalid_request("invalidApplicationStage", "The account status must be 'Started' but it is #{specialist.application_stage}") if specialist.application_stage != "Started"

      true
    end

    def resolve(**_args)
      specialist = current_user
      specialist.application_stage = "Submitted"
      Logidze.with_responsible(specialist.account_id) do
        specialist.save
      end
      specialist.sync_to_airtable

      {specialist: specialist}
    end
  end
end
