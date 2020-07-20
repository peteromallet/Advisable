class Mutations::RequestApplicationReminder < Mutations::BaseMutation
  argument :id, ID, required: true

  field :client_application, Types::ClientApplicationType, null: true

  def authorized?(id:)
    user = User.find_by_uid_or_airtable_id!(id)
    if user.application_status != :rejected
      raise ApiError::InvalidRequest.new(
              'notRejected',
              'Application must be rejected to request reminder'
            )
    end

    true
  end

  def resolve(id:)
    user = User.find_by_uid_or_airtable_id!(id)
    user.application_status = :remind
    user.application_reminder_at = 6.months.from_now
    user.save
    user.sync_to_airtable

    { client_application: user }
  end
end
