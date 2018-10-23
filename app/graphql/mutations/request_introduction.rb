class Mutations::RequestIntroduction < Mutations::BaseMutation
  description "Allows a client to request introduction to a specialist"
  argument :application_id, ID, required: true, description: 'The airtable ID of the application record'
  argument :availability, [String], required: true, description: "The clients availability for a call with the specialist. Should be an array of ISO strings"
  argument :time_zone, String, required: false, description: 'The time zone that the client is in'

  field :interview, Types::Interview, null: true
  field :errors, [String], null: true

  def resolve(**args)
    application = Application.find_by_airtable_id(args[:application_id])
    interview = application.interviews.new(
      availability: args[:availability],
      time_zone: args[:time_zone],
      status: "Call Requested"
    )

    if interview.valid?
      airtable_record = create_airtable_record(interview, application)
      interview.airtable_id = airtable_record.id
      interview.save
      update_application_status(application)
      return { interview: interview, errors: [] }
    end

    return {
      errors: application.errors.full_messages
    }
  end

  private

  def update_application_status(application)
    airtable_record = Airtable::Application.find(application.airtable_id)
    airtable_record["Application Status"] = 'Application Accepted'
    airtable_record.save
    application.update_attributes(status: 'Application Accepted')
    Webhook.process(application)
  end

  def create_airtable_record(interview, application)
    record = Airtable::Interview.new(
      "Application" => [application.airtable_id],
      "Interview Time" => interview.starts_at,
      "Call Status" => interview.status,
      "Creation Time" => DateTime.now.utc
    )
    record.create
    record
  end
end
