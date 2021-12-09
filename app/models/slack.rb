# frozen_string_literal: true

class Slack
  URL = "https://slack.com/api/"
  HEADERS = {"Authorization" => "Bearer #{ENV['SLACK_BOT_TOKEN']}", "Content-type" => "application/json; charset=utf-8"}.freeze

  DEFAULT_OPTIONS = {
    username: "Advisable"
  }.freeze

  def self.message(options = {})
    return if ENV["SLACK_BOT_TOKEN"].nil?

    api = Faraday.new(URL, headers: HEADERS)
    api.post("chat.postMessage", DEFAULT_OPTIONS.merge(options).to_json)
  end

  def self.bg_message(options = {})
    return if ENV["SLACK_BOT_TOKEN"].nil?

    SlackMessageJob.perform_later(options)
  end
end
