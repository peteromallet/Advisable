# frozen_string_literal: true

module Toby
  module Resources
    class Interview < BaseResource
      model_name ::Interview
      attribute :uid, Attributes::String, readonly: true
      attribute :starts_at, Attributes::DateTime
      attribute :status, Attributes::Select, options: ::Interview::VALID_STATUSES
      attribute :user, Attributes::BelongsTo, readonly: true
      attribute :application, Attributes::BelongsTo, readonly: true
      attribute :availability_note, Attributes::String
      attribute :call_requested_at, Attributes::DateTime
      attribute :call_scheduled_at, Attributes::DateTime
      attribute :time_zone, Attributes::String
      attribute :zoom_meeting_id, Attributes::String
      attribute :client_requested_reschedule_at, Attributes::DateTime, readonly: true
      attribute :more_time_options_added_at, Attributes::DateTime, readonly: true
      attribute :requested_more_time_options_at, Attributes::DateTime, readonly: true
      attribute :specialist_requested_reschedule_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
    end
  end
end
