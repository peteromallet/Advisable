# frozen_string_literal: true

module Mutations
  class RequestMoreInterviewTimes < Mutations::BaseMutation
    argument :availability_note, String, required: false
    argument :id, ID, required: true

    field :interview, Types::Interview, null: true

    ALLOWED_STATUSES = [
      'Call Requested',
      'Client Requested Reschedule',
      'Need More Time Options',
      'More Time Options Added'
    ].freeze

    def authorized?(id:, **_args)
      requires_current_user!
      interview = Interview.find_by_uid_or_airtable_id!(id)
      policy = InterviewPolicy.new(current_user, interview)
      return true if policy.request_more_times?

      ApiError.not_authorized("You do not have permission to request more interview times")
    end

    def resolve(**args)
      interview = Interview.find_by_uid_or_airtable_id!(args[:id])

      unless ALLOWED_STATUSES.include?(interview.status)
        ApiError.invalid_request(
          'interview.notRequested',
          'Interview is not in a requested state'
        )
      end

      current_account_responsible_for do
        interview.update(
          status: 'Need More Time Options',
          requested_more_time_options_at: Time.zone.now,
          availability_note: args[:availability_note]
        )
      end

      {interview: interview}
    end
  end
end
