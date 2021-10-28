# frozen_string_literal: true

# Takes calendly's eventID and fetch interview details
module Mutations
  class ScheduleAdvisableApplicationInterview < BaseMutation
    argument :event_id, String, required: true

    field :specialist, Types::SpecialistType, null: true

    # The scheduleAdvisableApplicationInterview mutation
    # requires a specalist to be logged in.
    def authorized?(*_args)
      requires_specialist!

      if current_user.application_stage != "Invited To Interview"
        ApiError.invalid_request(
          "INVALID_APPLICATION_STAGE",
          "The account status must be 'Invited To Interview' but it is #{current_user.application_stage}"
        )
      end

      true
    end

    def resolve(event_id:)
      current_user.application_stage = "Interview Scheduled"
      current_user.application_interview_calendly_id = event_id
      current_user.save_and_sync_with_responsible!(current_account_id)

      {specialist: current_user}
    end
  end
end
