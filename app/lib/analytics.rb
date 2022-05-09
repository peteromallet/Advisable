require "segment/analytics"

class Analytics
  attr_reader :client

  def initialize
    return unless self.class.enabled?

    @client = Segment::Analytics.new({
      write_key: ENV.fetch("SEGMENT", nil),
      on_error: proc { |_, msg| print(msg) }
    })
  end

  def track(user, event, properties)
    return unless self.class.enabled?

    client.track(user_id: user.account.uid, event:, properties:)
  end

  def self.enabled?
    ENV.fetch("SEGMENT", nil).present?
  end

  def self.track(user, event, payload)
    new.track(user, event, payload)
  end
end
