# frozen_string_literal: true

module Types
  class Review < Types::BaseType
    include PreviousProjectHelper
    field :id, ID, null: false
    field :avatar, String, null: true
    field :comment, String, null: true
    field :type, String, null: true
    field :ratings, Types::Ratings, null: true
    field :name, String, null: true
    field :first_name, String, null: true
    field :role, String, null: true
    field :specialist, Types::SpecialistType, null: false
    field :company_name, String, null: true

    def id
      object.uid
    end

    def avatar
      return unless project.is_a?(PreviousProject)

      project.resized_contact_image_url
    end

    def name
      return project.user.account.name if project.is_a?(Project)

      project.contact_name if project&.confidential?
    end

    def role
      if project.is_a?(Project)
        project.user.title
      else
        project.try(:contact_job_title)
      end
    end

    def company_name
      if project.is_a?(Project)
        project.user.company_name
      else
        previous_project_company_name(project)
      end
    end

    private

    def project
      object.project
    end
  end
end
