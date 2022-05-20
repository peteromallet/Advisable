# frozen_string_literal: true

class Slack
  def self.bg_message(options = {})
    return if ENV["SLACK_BOT_TOKEN"].blank?

    SlackMessageJob.perform_later(options)
  end
end
