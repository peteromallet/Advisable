class Mutations::RequestInterviewReschedule < Mutations::BaseMutation
  argument :interview, ID, required: true
  argument :availability, [GraphQL::Types::ISO8601DateTime], required: false
  argument :note, String, required: false

  def authorized?(**args)
    requires_current_user!
    true
  end

  def resolve(**args)
    interview = Interview.find_by_uid_or_airtable_id!(args[:interview])
    interview.availability_note = note

    case current_user
    when Specialist
      interview.status = "Specialist Requested Reschedule"
      # send email here
    when User
      current_user.update!(availability: args[:availability])
      interview.status = "Client Requested Reschedule"
      # send email here
    else
      ApiError.invalid_request(
        code: "MUST_BE_CLIENT_OR_FREELANCER",
        message: "Current user must be a client or a freelancer."
      )
    end
    interview.save_and_sync!

    {interview: interview}
  end
end
