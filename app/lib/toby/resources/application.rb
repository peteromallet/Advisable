# frozen_string_literal: true

module Toby
  module Resources
    class Application < BaseResource
      model_name ::Application
      attribute :uid, Attributes::String
      attribute :status, Attributes::Select, options: ["Applied"] + ::Application::ACTIVE_STATUSES
      attribute :specialist, Attributes::BelongsTo, labeled_by: :account
      attribute :project, Attributes::BelongsTo, labeled_by: :name
      attribute :interview, Attributes::HasOne, labeled_by: :status
      attribute :introduction, Attributes::String
      attribute :hidden, Attributes::Boolean
      attribute :score, Attributes::Integer
      attribute :comment, Attributes::String
      attribute :proposal_comment, Attributes::String
      attribute :rejection_reason, Attributes::String
      attribute :previous_projects, Attributes::HasManyThrough
      attribute :rejection_reason_comment, Attributes::String
      attribute :invitation_rejection_reason, Attributes::String
      attribute :applied_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
