# frozen_string_literal: true

module Toby
  module Resources
    class Project < BaseResource
      model_name ::Project
      attribute :uid, Attributes::String, readonly: true
      attribute :name, Attributes::String
      attribute :sales_person, Lookups::Projects::SalesPerson
      attribute :description, Attributes::LongText
      attribute :user, Attributes::BelongsTo
      attribute :status, Attributes::Select, options: ::Project::STATUSES
      attribute :sales_status, Attributes::Select, options: ::Project::SALES_STATUSES
      attribute :service_type, Attributes::Select, options: ::Project::SERVICE_TYPES
      attribute :skills, Attributes::HasManyThrough
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

      def self.label(record, context)
        Lazy::Label.new(::Project, record.id, context, includes: [{user: :company}, :primary_skill]) do |r|
          primary_skill = r.primary_skill&.name
          company = r.user&.company&.name
          "#{company} - #{primary_skill}"
        end
      end

      def self.search(query)
        ::Project.joins(user: :company).where("companies.name ILIKE ?", "%#{query}%")
      end
    end
  end
end
