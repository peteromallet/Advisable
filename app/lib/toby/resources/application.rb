# frozen_string_literal: true

module Toby
  module Resources
    class Application < BaseResource
      model_name ::Application
      attribute :uid, Attributes::String, readonly: true
      attribute :status, Attributes::Select, options: ["Applied"] + ::Application::ACTIVE_STATUSES + ::Application::HIRED_STATUSES
      attribute :specialist, Attributes::BelongsTo
      attribute :interview, Attributes::HasOne
      attribute :introduction, Attributes::LongText
      attribute :hidden, Attributes::Boolean
      attribute :score, Attributes::Integer
      attribute :comment, Attributes::LongText
      attribute :proposal_comment, Attributes::LongText
      attribute :rejection_reason, Attributes::String
      attribute :rejection_reason_comment, Attributes::LongText
      attribute :invitation_rejection_reason, Attributes::String
      attribute :applied_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.search(query)
        ::Application.where("uid ILIKE ?", "%#{query}%")
      end
    end
  end
end
