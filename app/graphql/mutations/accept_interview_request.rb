class Mutations::AcceptInterviewRequest < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :starts_at, String, required: true
  argument :phone_number, String, required: true

  field :interview, Types::Interview, null: true
  field :errors, [String], null: true

  def resolve(**args)
    interview = Interview.find_by_airtable_id!(args[:id])
    interview.update_attributes(starts_at: args[:starts_at], status: "Call Scheduled")
    update_specialist_number(interview.application.specialist, args[:phone_number])
    interview.sync_to_airtable
    Webhook.process(interview)
    return { interview: interview }
  end

  private

  def update_specialist_number(specialist, number)
    return if specialist.phone_number === number
    specialist.update_attributes(phone_number: number)
    specialist.sync_to_airtable
  end
end
