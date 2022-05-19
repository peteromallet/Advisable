# frozen_string_literal: true

class AnalyticsTrackJob < ApplicationJob
  def perform(account_uid, event, properties)
    Analytics.new.track(account_uid, event, properties)
  end
end
