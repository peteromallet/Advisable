class Mutations::AcceptInterviewRequest < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :starts_at, String, required: true
  argument :phone_number, String, required: true

  field :interview, Types::Interview, null: true
  field :errors, [String], null: true

  def resolve(**args)
    interview = Interview.find_by_airtable_id!(args[:id])
    # TODO: Consider delegation of the status update to
    #       the interview scheduling job...

    interview.update(
      starts_at: args[:starts_at],
      status: Interview::STATUSES[:scheduled]
    )

    update_specialist_number(
      interview.application.specialist,
      args[:phone_number]
    )
    interview.sync_to_airtable

    # Schedule the interview call and create a new chat.
    InterviewScheduleJob.perform_later(interview)
    InterviewChatJob.perform_later(interview)

    Webhook.process(interview)

    return { interview: interview }
  end

  private

  def update_specialist_number(specialist, number)
    return if specialist.phone === number
    specialist.update(phone: number)
    specialist.sync_to_airtable
  end
end
