# frozen_string_literal: false

require "segment/analytics"

class Analytics
  attr_reader :client

  def initialize
    return if disabled?

    @client = Segment::Analytics.new({
      write_key: ENV.fetch("SEGMENT_BACKEND", nil),
      on_error: proc { |_, msg| print(msg) }
    })
  end

  def track(account_uid, event, properties = {})
    return if disabled?

    client.track(user_id: account_uid, event:, properties:)
  end

  def suppress_and_delete(account_uids)
    return if disabled? || account_uids.blank? || ENV["SEGMENT_TOKEN"].blank?

    url = "https://platform.segmentapis.com/v1beta/workspaces/advisable-peter-omalley/regulations"
    headers = {"Content-Type" => "application/json", "Authorization" => "Bearer #{ENV.fetch("SEGMENT_TOKEN", nil)}"}
    payload = {regulation_type: "Suppress_With_Delete", attributes: {name: "userId", values: account_uids}}
    res = Faraday.post(url, payload.to_json, headers)
    Sentry.capture_message("Analytics suppression failed!", extra: {payload:, response: res.body}) unless res.success?
  end

  private

  def disabled?
    ENV["SEGMENT_BACKEND"].blank?
  end
end
