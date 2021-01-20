# frozen_string_literal: true

class Mutations::ResendInterviewRequest < Mutations::BaseMutation
  argument :id, ID, required: true

  field :interview, Types::Interview, null: true

  def resolve(**args)
    {
      interview:
        Interviews::ResendInterviewRequest.call(
          interview: Interview.find_by_uid_or_airtable_id!(args[:id])
        )
    }
  rescue Service::Error => e
    ApiError.invalid_request("FAILED_TO_RESEND", e.message)
  end
end
