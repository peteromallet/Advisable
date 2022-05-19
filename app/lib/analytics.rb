# frozen_string_literal: false

require "segment/analytics"

class Analytics
  attr_reader :client

  def initialize
    return unless self.class.enabled?

    @client = Segment::Analytics.new({
      write_key: ENV.fetch("SEGMENT_BACKEND", nil),
      on_error: proc { |_, msg| print(msg) }
    })
  end

  def track(user, event, properties = {})
    return unless self.class.enabled?

    client.track(user_id: user.account.uid, event:, properties:)
  end

  def suppress_and_delete(account_uids)
    return if !self.class.enabled? || account_uids.blank? || ENV["SEGMENT_TOKEN"].blank?

    url = "https://platform.segmentapis.com/v1beta/workspaces/advisable-peter-omalley/regulations"
    headers = {"Content-Type" => "application/json", "Authorization" => "Bearer #{ENV.fetch("SEGMENT_TOKEN", nil)}"}
    payload = {regulation_type: "Suppress_With_Delete", attributes: {name: "userId", values: account_uids}}
    res = Faraday.post(url, payload.to_json, headers)
    Sentry.capture_message("Analytics suppression failed!", extra: {payload:, response: res.body}) unless res.success?
  end

  def self.enabled?
    ENV["SEGMENT_BACKEND"].present?
  end

  # Schedule a bg job here
  def self.track(user, event, properties = {})
    new.track(user, event, properties)
  end
end
