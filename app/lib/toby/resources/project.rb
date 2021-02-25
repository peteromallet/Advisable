# frozen_string_literal: true

module Toby
  module Resources
    class Project < BaseResource
      model_name ::Project
      attribute :uid, Attributes::String
      attribute :status, Attributes::Select, options: ::Project::STATUSES
      attribute :sales_status, Attributes::Select, options: ::Project::SALES_STATUSES
      attribute :service_type, Attributes::Select, options: ::Project::SERVICE_TYPES
      attribute :skills, Attributes::HasMany, through: :project_skills, labelled_by: :name
      attribute :estimated_budget, Attributes::String
      attribute :goals, Attributes::TextArray
    end
  end
end
