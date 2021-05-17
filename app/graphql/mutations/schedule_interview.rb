# frozen_string_literal: true

module Mutations
  class ScheduleInterview < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :phone_number, String, required: false
    argument :starts_at, String, required: true

    field :interview, Types::Interview, null: true

    ALLOWED_STATUES = [
      "Call Requested",
      "Client Requested Reschedule",
      "Specialist Requested Reschedule",
      "More Time Options Added"
    ].freeze

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      interview = Interview.find_by_uid_or_airtable_id!(args[:id])

      ApiError.invalid_request("INTERVIEW_IS_NOT_SCHEDULABLE", "Interview is not in a schedulable state.") unless ALLOWED_STATUES.include?(interview.status)

      ApiError.invalid_request("STARTS_AT_NOT_AVAILABLE_ON_CLIENT", "Argument `starts_at` is not inside of the client's availability.") unless interview.user.availability.include?(args[:starts_at])

      create_video_call(interview)
      interview.starts_at = args[:starts_at]
      interview.call_scheduled_at = Time.zone.now
      interview.status = "Call Scheduled"
      interview.save_and_sync_with_responsible!(current_account_id)

      if args[:phone_number]
        update_specialist_number(
          interview.application.specialist,
          args[:phone_number]
        )
      end

      {interview: interview}
    end

    private

    def create_video_call(interview)
      return if interview.video_call.present?

      VideoCall.create(interview: interview)
    end

    def update_specialist_number(specialist, number)
      return if specialist.phone == number

      specialist.update(phone: number)
      specialist.sync_to_airtable
    end
  end
end
