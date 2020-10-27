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
    user.update contact_status: 'Call Scheduled'

    call =
      user.client_calls.create(
        call_time: Time.zone.now,
        phone_number: args[:phone_number],
        event_type: 'ASAP Call',
        type_of_call: 'Request Access Call',
        call_attempt_count: 0
      )

    call.sync_to_airtable
    user.sync_to_airtable
    send_slack_message(user, call)

    {client_application: user}
  end

  private

  def send_slack_message(user, client_call)
    Slack.message(
      channel: 'asap_calls',
      text: 'New ASAP call request',
      blocks: [
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text": "<!channel> There's a new ASAP call waiting for you."
          }
        },
        {"type": 'divider'},
        {
          "type": 'section',
          "fields": [
            {"type": 'mrkdwn', "text": "*Name*\n#{user.account.name}"},
            {"type": 'mrkdwn', "text": "*Company*\n#{user.company_name}"}
          ]
        },
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text":
              "Mark Call Completed = Yes once you reach them or move them up one if you weren't able to reach them."
          }
        },
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text":
              "*<https://airtable.com/tblF2WWM9mC4geYhn/viw0XG7SAtiCcPUeE/#{
                client_call.airtable_id
              }|View Details>*"
          }
        },
        {"type": 'section', "text": {"type": 'mrkdwn', "text": ' '}},
        {"type": 'divider'},
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text":
              '<https://airtable.com/tblF2WWM9mC4geYhn/viw0XG7SAtiCcPUeE|View All Pending Calls>'
          }
        }
      ]
    )
  end
end
