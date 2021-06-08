# frozen_string_literal: true

module Mutations
  class ScheduleClientApplicationInterview < BaseMutation
    description "Schedule an interview of a client with Advisable"

    field :user, Types::User, null: true

    def authorized?(*_args)
      requires_client!

      return true if current_user.application_status == "Invited To Interview"

      ApiError.invalid_request(
        "INVALID_APPLICATION_STATUS",
        "The account status must be 'Invited To Interview' but it is #{current_user.application_status}"
      )
    end

    def resolve
      current_user.application_status = "Interview Scheduled"
      current_user.save_and_sync_with_responsible!(current_account_id)

      {user: current_user}
    end
  end
end
