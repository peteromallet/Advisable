# frozen_string_literal: true

module Toby
  module Resources
    class Interview < BaseResource
      model_name ::Interview
      attribute :uid, Attributes::String, readonly: true
      attribute :starts_at, Attributes::DateTime
      attribute :status, Attributes::Select, options: ::Interview::VALID_STATUSES
      attribute :reason, Attributes::String
      attribute :specialist, Attributes::BelongsTo
      attribute :user, Attributes::BelongsTo, readonly: true
      attribute :agreement, Lookups::Interviews::Agreement
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

      action :decline, label: "Decline", if: ->(interview) { interview.pending? }

      def self.decline(object, _context)
        return unless object.pending?

        object.update(status: "Specialist Declined")
        return if object.messages.none?

        object.messages.first.conversation.new_message!(kind: "InterviewDeclined", interview: object, send_emails: false)
      end
    end
  end
end
