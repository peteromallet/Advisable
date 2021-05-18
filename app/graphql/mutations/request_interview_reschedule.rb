# frozen_string_literal: true

module Mutations
  class RequestInterviewReschedule < Mutations::BaseMutation
    argument :interview, ID, required: true
    argument :note, String, required: false

    field :interview, Types::Interview, null: true

    def authorized?(**args)
      requires_current_user!

      interview = Interview.find_by_uid_or_airtable_id!(args[:interview])
      ApiError.invalid_request("INTERVIEW_NOT_SCHEDULED", "Interview is not in scheduled state.") if interview.status != "Call Scheduled"

      true
    end

    def resolve(**args)
      interview = Interview.find_by_uid_or_airtable_id!(args[:interview])
      interview.availability_note = args[:note]

      case current_user
      when Specialist
        interview.status = "Specialist Requested Reschedule"
        interview.specialist_requested_reschedule_at = Time.zone.now
        current_account_responsible_for { interview.save! }
        UserMailer.interview_reschedule_request(interview).deliver_later
      when User
        interview.status = "Client Requested Reschedule"
        interview.client_requested_reschedule_at = Time.zone.now
        current_account_responsible_for { interview.save! }
        SpecialistMailer.interview_reschedule_request(interview).deliver_later
      else
        ApiError.invalid_request("MUST_BE_CLIENT_OR_SPECIALIST", "Current user must be a client or a specialist.")
      end

      {interview: interview}
    end
  end
end
