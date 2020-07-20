class Mutations::RequestApplicationCallback < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :phone_number, String, required: true

  field :client_application, Types::ClientApplicationType, null: true

  def authorized?(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])

    if user.application_status != :accepted
      raise ApiError::InvalidRequest.new(
              'notAccepted',
              'Must be accepted to request a callback'
            )
    end

    true
  end

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])

    call =
      user.client_calls.create(
        call_time: DateTime.now,
        phone_number: args[:phone_number],
        event_type: 'ASAP Call',
        type_of_call: 'Request Access Call',
        call_attempt_count: 0
      )

    call.sync_to_airtable

    { client_application: user }
  end
end
