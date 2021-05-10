# frozen_string_literal: true

module Types
  class PreviousProject < Types::BaseType
    include PreviousProjectHelper

    description "Represents a specialists previous project"

    field :goal, String, null: true
    field :description, String, null: true
    field :specialist, Types::SpecialistType, null: false
    field :reviews, [Types::Review], null: false
    field :primary_skill, Types::Skill, null: true
    field :primary_industry, Types::IndustryType, null: true
    field :skills, [Types::Skill], null: false
    field :industries, [Types::IndustryType], null: false
    field :validation_status, String, null: true
    field :contact_first_name, String, null: true
    field :contact_last_name, String, null: true
    field :contact_name, String, null: true
    field :contact_job_title, String, null: true
    field :contact_relationship, String, null: true

    field :cover_photo, Types::PreviousProjectImage, null: true
    def cover_photo
      object.cover_photo&.attachment || object.images.first
    end

    field :industry_relevance, Integer, null: true
    field :location_relevance, Integer, null: true
    field :pending_description, String, null: true, deprecation_reason: "Descriptions dont need to be approved anymore"
    field :images, [Types::PreviousProjectImage], null: false
    field :id, ID, null: false, method: :uid

    field :draft, Boolean, null: false
    def draft
      object.draft || false
    end

    field :public_use, Boolean, null: false
    def public_use
      object.public_use || false
    end

    field :on_platform, Boolean, null: false, method: :on_platform?

    # Only allow cost_to_hire if object is in draft. Once previous projects can only be added
    # by an authenticated specialist, this should be updated to check if the project belongs
    # to the authed specialist.
    field :cost_to_hire, Integer, null: true
    def cost_to_hire
      return nil unless object.draft?

      object.cost_to_hire
    end

    field :execution_cost, Integer, null: true
    def execution_cost
      return nil unless object.draft?

      object.execution_cost
    end

    field :title, String, null: false
    def title
      return "Project with #{client_name}" if object.primary_skill.nil?

      "#{object.primary_skill.try(:name)} project with #{client_name}"
    end

    field :excerpt, String, null: true
    def excerpt
      object.description.try(:truncate, 160)
    end

    field :confidential, Boolean, null: false
    def confidential
      object.confidential || false
    end

    field :company_type, String, null: false
    def company_type
      object.company_type || "company"
    end

    field :client_name, String, null: false
    def client_name
      previous_project_company_name(object)
    end

    # Only show the contact email if the validation status is in progress
    field :contact_email, String, null: true
    def contact_email
      return object.contact_email if object.validation_status == 'In Progress'

      nil
    end

    field :similar_specialists, [Types::SpecialistType], null: false
    def similar_specialists
      industry = object.primary_industry
      return [] if industry.nil?

      ::Specialist.joins(previous_projects: :industries).
        where("average_score >= 65").
        where(previous_projects: {company_type: object.company_type}).
        where(previous_projects: {industries: {id: object.primary_industry.id}}).
        where.not(id: object.specialist.id).uniq
    end
  end
end
