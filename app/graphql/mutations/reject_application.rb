class Mutations::RejectApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :rejection_reason, String, required: true
  argument :rejection_reason_comment, String, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [String], null: false

  def resolve(**args)
    application = Application.find_by_airtable_id(args[:id])
    application.assign_attributes({
      status: 'Application Rejected',
      rejection_reason: args[:rejection_reason],
      rejection_reason_comment: args[:rejection_reason_comment]
    })

    if application.valid?
      application.save
      sync_with_airtable(application)
      Webhook.process(application)
    end

    return {
      application: application,
      errors: application.errors.full_messages
    }
  end

  private

  def sync_with_airtable(application)
    record = Airtable::Application.find(application.airtable_id)
    record['Application Status'] = application.status
    record['Rejected Reason'] = application.rejection_reason
    record['Rejected Reason Comment'] = application.rejection_reason_comment
    record.save
  end
end
