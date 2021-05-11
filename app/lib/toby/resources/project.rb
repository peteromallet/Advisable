# frozen_string_literal: true

module Toby
  module Resources
    class Project < BaseResource
      model_name ::Project
      attribute :uid, Attributes::String, readonly: true
      attribute :name, Attributes::String
      attribute :sales_person, Lookups::Projects::SalesPerson
      attribute :description, Attributes::LongText
      attribute :user, Attributes::BelongsTo, labeled_by: :account
      attribute :status, Attributes::Select, options: ::Project::STATUSES
      attribute :sales_status, Attributes::Select, options: ::Project::SALES_STATUSES
      attribute :service_type, Attributes::Select, options: ::Project::SERVICE_TYPES
      attribute :skills, Attributes::HasManyThrough, labeled_by: :name
      attribute :estimated_budget, Attributes::String
      attribute :goals, Attributes::TextArray
      attribute :questions, Attributes::TextArray
      attribute :characteristics, Attributes::TextArray
      attribute :required_characteristics, Attributes::TextArray
      attribute :deposit, Attributes::Currency
      attribute :remote, Attributes::Boolean
      attribute :sourcing, Attributes::Boolean
      attribute :campaign_name, Attributes::String
      attribute :campaign_source, Attributes::String
      attribute :accepted_terms_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      # TODO: Complex label
      # def self.label(record)
      #   primary_skill = record.primary_skill&.name
      #   company = record.user&.company&.name
      #   "#{company} - #{primary_skill}"
      # end

      def self.search(query)
        ::Project.joins(user: :company).where("companies.name ilike ?", "%#{query}%")
      end
    end
  end
end
