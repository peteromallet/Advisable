# frozen_string_literal: true

class SlackMessageJob < ApplicationJob
  URL = "https://slack.com/api/"

  DEFAULT_OPTIONS = {username: "Advisable"}.freeze

  def perform(options)
    return if ENV["SLACK_BOT_TOKEN"].blank?

    headers = {
      "Authorization" => "Bearer #{ENV.fetch("SLACK_BOT_TOKEN", nil)}",
      "Content-type" => "application/json; charset=utf-8"
    }
    api = Faraday.new(URL, headers:)
    res = api.post("chat.postMessage", DEFAULT_OPTIONS.merge(options).to_json)
    Sentry.capture_message("Slack message failed!", extra: {options:, response: res.body}) unless res.success?
  end
end
