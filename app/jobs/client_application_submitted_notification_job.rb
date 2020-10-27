class ClientApplicationSubmittedNotificationJob < ApplicationJob
  queue_as :default

  def perform(id)
    user = User.find(id)
    return unless user.present?

    Slack.message(
      channel: 'new_client_application',
      text: 'New client application',
      blocks: [
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text":
              "#{user.account.first_name} from #{
                user.company_name
              } has submitted their application and has been *#{
                signup_result(user)
              }*."
          }
        },
        {"type": 'divider'},
        {
          "type": 'section',
          "fields": [
            {
              "type": 'mrkdwn',
              "text":
                "*Company Details*\nName: `#{user.company_name}`\nIndustry: `#{
                  user.industry.try(:name)
                }`\nCompany Type: `#{user.company_type}`"
            },
            {
              "type": 'mrkdwn',
              "text":
                "*Contact Details*\nName: `#{user.name}`\nEmail: `#{
                  user.account.email
                }`"
            }
          ]
        },
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text":
              "*Requirements*\nHow many freelancers over next six months: *#{
                user.number_of_freelancers
              }*\nSkills interested in: *#{
                user.skills.map(&:name).join(',')
              }*\nSpend on freelancers per annum:*#{
                user.budget / 100.0
              }*\nLevel of talent they're looking for: *#{user.talent_quality}*"
          }
        },
        {
          "type": 'section',
          "text": {
            "type": 'mrkdwn',
            "text":
              '*<https://airtable.com/tblKMhI3m3iBlA8Dg/viw5RTNS9NixGW3x8?blocks=hide|View Application Details>*'
          }
        }
      ]
    )
  end

  private

  def signup_result(user)
    if user.rejection_reason == 'not_hiring'
      return 'offered to setup a 6 month reminder'
    end
    return 'sent to upwork' if user.rejection_reason == 'cheap_talent'
    'invited to schedule a call'
  end
end
