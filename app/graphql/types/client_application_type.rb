# frozen_string_literal: true

# Represents a client(company) application to the Advisable platform.
# The underlying object for a ClientApplicationType is a User object.
module Types
  class ClientApplicationType < Types::BaseType
    description "Represents a clients application to Advisable"

    delegate :company, to: :object
    delegate :goals, :marketing_attitude, :business_type, :feedback, :budget, :industry, to: :company

    field :budget, Int, null: true
    field :skills, [Types::Skill], null: true
    field :locality_importance, Int, null: true
    field :feedback, Boolean, null: true
    field :goals, [String], null: true
    field :business_type, String, null: true
    field :marketing_attitude, String, null: true
    field :industry, Types::IndustryType, null: true
    field :number_of_freelancers, String, null: true
    field :country, Types::CountryType, null: true
    field :id, ID, null: false, method: :uid
    field :status, String, null: true, method: :application_status
    field :title, String, null: true
    field :interview_starts_at, GraphQL::Types::ISO8601DateTime, null: true, method: :application_interview_starts_at

    field :company_name, String, null: true
    def company_name
      object.company.name
    end

    field :first_name, String, null: false
    def first_name
      object.account.first_name
    end

    field :last_name, String, null: true
    def last_name
      object.account.last_name
    end

    field :company_type, String, null: true
    def company_type
      company.kind
    end

    field :accepted_guarantee_terms, Boolean, null: true
    def accepted_guarantee_terms
      object.accepted_guarantee_terms_at.present?
    end

    field :talent_quality, String, null: true

    def talent_quality
      object.talent_quality.try(:upcase)
    end

    field :rejection_reason, String, null: true

    def rejection_reason
      object.rejection_reason.try(:upcase)
    end
  end
end
