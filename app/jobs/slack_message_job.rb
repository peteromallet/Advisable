# frozen_string_literal: true

class SlackMessageJob < ApplicationJob
  def perform(options)
    Slack.message(options)
  end
end
