class Mutations::ResendInterviewRequest < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :time_zone, String, required: false

  field :interview, Types::Interview, null: true

  def resolve(**args)
    {
      interview:
        Interviews::ResendInterviewRequest.call(
          interview: Interview.find_by_uid_or_airtable_id!(args[:id]),
          time_zone: args[:time_zone]
        )
    }
  rescue Service::Error => e
    ApiError.invalid_request(code: "FAILED_TO_RESEND", message: e.message)
  end
end
