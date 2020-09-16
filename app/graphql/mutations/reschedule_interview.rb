class Mutations::RescheduleInterview < Mutations::BaseMutation
  argument :interview, ID, required: true
  argument :starts_at, GraphQL::Types::ISO8601DateTime, required: true

  field :interview, Types::Interview, null: true

  def resolve(**args)
    interview = Interview.find_by_uid_or_airtable_id!(args[:interview])

    unless ["Specialist Requested Reschedule", "Client Requested Reschedule"].include?(interview.status)
      ApiError.invalid_request(
        code: "INTERVIEW_IS_NOT_RESCHEDULABLE",
        message: "Interview was not requested to reschedule."
      )
    end

    if interview.user.availability.include?(args[:starts_at])
      interview.starts_at = args[:starts_at]
    else
      ApiError.invalid_request(
        code: "STARTS_AT_NOT_AVAILABLE_ON_CLIENT",
        message: "Argument `starts_at` is not inside of the client's availability."
      )
    end
    interview.save_and_sync!

    SpecialistMailer.interview_rescheduled(interview).deliver_later
    UserMailer.interview_rescheduled(interview).deliver_later

    {interview: interview}
  end
end
