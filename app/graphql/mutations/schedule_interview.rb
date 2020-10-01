class Mutations::ScheduleInterview < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :starts_at, String, required: true
  argument :phone_number, String, required: false

  field :interview, Types::Interview, null: true
  field :errors, [String], null: true

  ALLOWED_STATUES = [
    "Call Requested",
    "Client Requested Reschedule",
    "Specialist Requested Reschedule",
    "More Time Options Added"
  ].freeze

  def authorized?(**args)
    requires_specialist!
  end

  def resolve(**args)
    interview = Interview.find_by_uid_or_airtable_id!(args[:id])

    unless ALLOWED_STATUES.include?(interview.status)
      ApiError.invalid_request(
        code: "INTERVIEW_IS_NOT_SCHEDULABLE",
        message: "Interview is not in a schedulable state."
      )
    end

    unless interview.user.availability.include?(args[:starts_at])
      ApiError.invalid_request(
        code: "STARTS_AT_NOT_AVAILABLE_ON_CLIENT",
        message: "Argument `starts_at` is not inside of the client's availability."
      )
    end

    interview.starts_at = args[:starts_at]
    interview.call_scheduled_at = Time.zone.now
    interview.status = "Call Scheduled"
    interview.save_and_sync!

    if args[:phone_number]
      update_specialist_number(
        interview.application.specialist,
        args[:phone_number]
      )
    end

    Webhook.process(interview)
    {interview: interview}
  end

  private

  def update_specialist_number(specialist, number)
    return if specialist.phone == number
    specialist.update(phone: number)
    specialist.sync_to_airtable
  end
end
