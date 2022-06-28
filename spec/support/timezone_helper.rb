# frozen_string_literal: true

module TimezoneHelper
  def with_timezone(zone)
    before = ENV.fetch("TZ", nil)
    ENV["TZ"] = zone
    yield
    ENV["TZ"] = before
  end
end
