# frozen_string_literal: true

module Toby
  module Resources
    class Consultation < BaseResource
      model_name ::Consultation

      attribute :uid, Attributes::String, readonly: true
      attribute :request_url, Lookups::Consultations::RequestUrl
      attribute :specialist, Attributes::BelongsTo, readonly: true
      attribute :user, Attributes::BelongsTo, readonly: true
      attribute :interview, Attributes::BelongsTo, readonly: true
      attribute :skill, Attributes::BelongsTo
      attribute :likely_to_hire, Attributes::Integer
      attribute :accepted_at, Attributes::DateTime
      attribute :rejected_at, Attributes::DateTime
      attribute :advisable_rejected_at, Attributes::DateTime
      attribute :rejection_reason, Attributes::String
      attribute :request_started_at, Attributes::DateTime
      attribute :request_completed_at, Attributes::DateTime
      attribute :sent_at, Attributes::DateTime
      attribute :source, Attributes::String
      attribute :status, Attributes::String
      attribute :topic, Attributes::String
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
