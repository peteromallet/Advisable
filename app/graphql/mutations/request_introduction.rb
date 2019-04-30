class Mutations::RequestIntroduction < Mutations::BaseMutation
  description "Allows a client to request introduction to a specialist"
  argument :application_id, ID, required: true, description: 'The airtable ID of the application record'
  argument :availability, [String], required: true, description: "The clients availability for a call with the specialist. Should be an array of ISO strings"
  argument :time_zone, String, required: false, description: 'The time zone that the client is in'

  field :interview, Types::Interview, null: true
  field :errors, [String], null: true

  def resolve(**args)
    application = Application.find_by_airtable_id(args[:application_id])
    application.project.user.update_attributes(availability: args[:availability])

    interview = application.interviews.new(
      user: application.project.user,
      time_zone: args[:time_zone],
      status: "Call Requested"
    )

    interview.save
    interview.sync_to_airtable
    Webhook.process(interview)
    update_application_status(application)
    return { interview: interview }
  end

  private

  def update_application_status(application)
    application.update_attributes(status: 'Application Accepted')
    application.sync_to_airtable
    Webhook.process(application)
  end
end
