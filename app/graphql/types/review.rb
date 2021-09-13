# frozen_string_literal: true

module Types
  class Review < Types::BaseType
    include PreviousProjectHelper

    description 'A type for Review'

    field :id, ID, null: false, method: :uid
    field :comment, String, null: true
    field :type, String, null: true
    field :ratings, Types::Ratings, null: true
    field :specialist, Types::SpecialistType, null: false
    field :case_study_article, Types::CaseStudy::Article, null: true

    field :avatar, String, null: true
    def avatar
      if object.avatar.attached?
        object.resized_avatar_url
      else
        object.project&.resized_contact_image_url
      end
    end

    field :name, String, null: true
    def name
      if object.name.present?
        object.name
      else
        object.project&.confidential? ? nil : object.project.contact_name
      end
    end

    field :role, String, null: true
    def role
      object.project.try(:contact_job_title)
    end

    field :company_name, String, null: true
    def company_name
      previous_project_company_name(object.project)
    end
  end
end
