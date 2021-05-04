# frozen_string_literal: true

class ClientApplicationSubmittedNotificationJob < ApplicationJob
  queue_as :default

  def perform(id)
    user = User.find(id)
    return if user.blank?

    Slack.message(
      channel: 'new_client_application',
      text: 'New client application',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              "#{user.account.first_name} from #{
                user.company.name
              } has submitted their application and has been *#{
                signup_result(user)
              }*."
          }
        },
        {type: 'divider'},
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text:
                "*Company Details*\nName: `#{user.company_name}`\nIndustry: `#{
                  user.company.industry.try(:name)
                }`\nCompany Type: `#{user.company.kind}`"
            },
            {
              type: 'mrkdwn',
              text:
                "*Contact Details*\nName: `#{user.account.name}`\nEmail: `#{
                  user.account.email
                }`"
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              "*Requirements*\nHow many freelancers over next six months: *#{
                user.number_of_freelancers
              }*\nSkills interested in: *#{
                user.skills.map(&:name).join(',')
              }*\nSpend on freelancers per annum:*#{
                user.company.budget / 100.0
              }*\nLevel of talent they're looking for: *#{user.talent_quality}*"
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*<https://airtable.com/tblKMhI3m3iBlA8Dg/viw5RTNS9NixGW3x8?blocks=hide|View Application Details>*'
          }
        }
      ]
    )
  end

  private

  def signup_result(user)
    return 'offered to setup a 6 month reminder' if user.rejection_reason == 'not_hiring'
    return 'sent to upwork' if user.rejection_reason == 'cheap_talent'

    'invited to schedule a call'
  end
end
