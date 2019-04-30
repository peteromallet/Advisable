class Mutations::RejectApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :rejection_reason, String, required: true
  argument :rejection_reason_comment, String, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [String], null: false

  def resolve(**args)
    application = Application.find_by_airtable_id!(args[:id])
    application.assign_attributes({
      status: 'Application Rejected',
      rejection_reason: args[:rejection_reason],
      rejection_reason_comment: args[:rejection_reason_comment]
    })

    if application.save
      application.sync_to_airtable
      Webhook.process(application)
    end

    return {
      application: application,
      errors: application.errors.full_messages
    }
  end
end
