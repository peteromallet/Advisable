# frozen_string_literal: true

class Mutations::RequestApplicationReminder < Mutations::BaseMutation
  argument :id, ID, required: true

  field :client_application, Types::ClientApplicationType, null: true

  def authorized?(id:)
    user = User.find_by_uid_or_airtable_id!(id)
    if user.application_status != "Application Rejected"
      ApiError.invalid_request(
              "notRejected",
              "Application must be rejected to request reminder"
            )
    end

    true
  end

  def resolve(id:)
    user = User.find_by_uid_or_airtable_id!(id)
    user.application_status = "Requested Reminder"
    user.application_reminder_at = 6.months.from_now
    user.save_and_sync_with_responsible!(current_account_id)

    {client_application: user}
  end
end
