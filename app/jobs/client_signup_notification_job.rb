# frozen_string_literal: true

class ClientSignupNotificationJob < ApplicationJob
  queue_as :default

  def perform(id)
    user = User.find(id)
    return if user.blank?

    SlackMessageJob.perform_later(
      channel: "new_client_application",
      text: "New client signup",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "#{user.account.first_name} from #{user.company.name} has created an account."
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "*Industry*\n#{user.company.industry&.name}"
            },
            {
              type: "mrkdwn",
              text: "*Audience*\n#{user.company.audience}"
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Interests*\n#{user.account.interests.map(&:term).join("\n")}"
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View in Toby"
              },
              url: "https://app.advisable.com/toby/users/#{user.id}"
            }
          ]
        }
      ]
    )
  end
end
