# frozen_string_literal: true

module Toby
  module Resources
    class Project < BaseResource
      model_name ::Project
      attribute :uid, Attributes::String
      attribute :name, Attributes::String
      attribute :user, Attributes::BelongsTo, labeled_by: :account
      attribute :status, Attributes::Select, options: ::Project::STATUSES
      attribute :sales_status, Attributes::Select, options: ::Project::SALES_STATUSES
      attribute :service_type, Attributes::Select, options: ::Project::SERVICE_TYPES
      attribute :skills, Attributes::HasManyThrough, labeled_by: :name
      attribute :estimated_budget, Attributes::String
      attribute :goals, Attributes::TextArray
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
