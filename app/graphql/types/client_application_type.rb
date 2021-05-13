# frozen_string_literal: true

# Represents a client(company) application to the Advisable platform.
# The underlying object for a ClientApplicationType is a User object.
module Types
  class ClientApplicationType < Types::BaseType
    delegate :company, to: :object
    delegate :budget, :industry, to: :company

    field :first_name, String, null: false

    def first_name
      object.account.first_name
    end

    field :last_name, String, null: true

    def last_name
      object.account.last_name
    end

    field :company_name, String, null: true
    def company_name
      object.company.name
    end

    field :budget, Int, null: true
    field :skills, [Types::Skill], null: true
    field :locality_importance, Int, null: true

    field :company_type, String, null: true
    def company_type
      company.kind
    end

    field :industry, Types::IndustryType, null: true

    field :number_of_freelancers, String, null: true
    field :country, Types::CountryType, null: true

    field :id, ID, null: false, method: :uid

    field :status, String, null: true, method: :application_status

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
