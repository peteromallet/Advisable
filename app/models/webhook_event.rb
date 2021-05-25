# frozen_string_literal: true

# WebhookEvent's are used to trigger webhooks. The actual event names are hard
# coded and an instance of WebhookEvent configures a webhook to be fired when a
# given event happens.
#
# The following would trigger a webhook to "https://test.com" every time the
# "specialists.application_stage_changed" event was fired.
#
#   WebhookEvent.create(
#     event: "specialists.application_stage_changed",
#     url: "https://test.com"
#   )
#
class WebhookEvent < ApplicationRecord
  class Error < StandardError
  end

  EVENTS = [
    # "specialists.application_stage_changed" is triggered when the
    # "application_stage" column is updated during the airtable syncing process.
    "specialists.application_stage_changed",
    "applications.proposal_sent",
    "applications.proposal_rejected",
    "tasks.created",
    "tasks.quote_requested",
    "tasks.quote_provided",
    "tasks.assigned",
    "tasks.started",
    "tasks.submitted",
    "tasks.approved",
    "tasks.due_date_past",
    "tasks.due_date_upcoming",
    "tasks.requested_to_start",
    "user.invited_to_interview"
  ].freeze

  # self.trigger is used to trigger a webhook event.
  # WebhookEvent.trigger("event_name")
  def self.trigger(event, data = {})
    raise Error, "#{event} is not a valid event" if EVENTS.exclude?(event)

    where(event: event).find_each do |webhook_event|
      Webhook.create(url: webhook_event.url, data: data)
    end
  end
end

# == Schema Information
#
# Table name: webhook_events
#
#  id         :bigint           not null, primary key
#  event      :string
#  name       :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
