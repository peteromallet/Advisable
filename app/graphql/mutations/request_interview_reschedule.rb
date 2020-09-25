class Mutations::RequestInterviewReschedule < Mutations::BaseMutation
  argument :interview, ID, required: true
  argument :note, String, required: false

  field :interview, Types::Interview, null: true

  def authorized?(**args)
    requires_current_user!

    interview = Interview.find_by_uid_or_airtable_id!(args[:interview])
    if interview.status != "Call Scheduled"
      ApiError.invalid_request(
        code: "INTERVIEW_NOT_SCHEDULED",
        message: "Interview is not in scheduled state."
      )
    end

    true
  end

  def resolve(**args)
    interview = Interview.find_by_uid_or_airtable_id!(args[:interview])
    interview.availability_note = args[:note]

    case current_user
    when Specialist
      interview.status = "Specialist Requested Reschedule"
      interview.specialist_requested_reschedule_at = DateTime.now
      interview.save_and_sync!
      SpecialistMailer.interview_reschedule_request(interview).deliver_later
    when User
      interview.status = "Client Requested Reschedule"
      interview.client_requested_reschedule_at = DateTime.now
      interview.save_and_sync!
      UserMailer.interview_reschedule_request(interview).deliver_later
    else
      ApiError.invalid_request(
        code: "MUST_BE_CLIENT_OR_SPECIALIST",
        message: "Current user must be a client or a specialist."
      )
    end

    {interview: interview}
  end
end
