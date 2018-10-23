class Mutations::AcceptInterviewRequest < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :starts_at, String, required: true
  argument :phone_number, String, required: true

  field :interview, Types::Interview, null: true
  field :errors, [String], null: true

  def resolve(**args)
    interview = Interview.find_by_airtable_id(args[:id])
    interview.assign_attributes(starts_at: args[:starts_at], status: "Call Scheduled")
    update_specialist_number(interview.application.specialist, args[:phone_number])

    if interview.valid?
      sync_with_airtable(interview)
      interview.save
      return { interview: interview, errors: [] }
    end

    return {
      errors: application.errors.full_messages
    }
  end

  private

  def update_specialist_number(specialist, number)
    return if specialist.phone_number === number
    airtable_record = Airtable::Specialist.find(specialist.airtable_id)
    airtable_record["Phone Number"] = number
    airtable_record.save
    specialist.update_attributes(phone_number: number)
  end

  def sync_with_airtable(interview)
    airtable_record = Airtable::Interview.find(interview.airtable_id)
    airtable_record['Interview Time'] = interview.starts_at
    airtable_record['Call Status'] = interview.status
    airtable_record.save
  end
end
