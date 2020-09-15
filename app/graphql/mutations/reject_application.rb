class Mutations::RejectApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :reason, String, required: true
  argument :comment, String, required: true

  field :application, Types::ApplicationType, null: true

  def authorized?(**args)
    requires_current_user!
    application = Application.find_by_uid_or_airtable_id!(args[:id])
    policy = ApplicationPolicy.new(current_user, application)
    return true if policy.write
    ApiError.not_authorized('You do not have access to this')
  end

  def resolve(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:id])
    application.assign_attributes(
      {
        status: 'Application Rejected',
        rejection_reason: args[:reason],
        rejection_reason_comment: args[:comment]
      }
    )

    application.sync_to_airtable if application.save
    application.project.update_sourcing

    { application: application }
  end
end
