# frozen_string_literal: true

module Types
  class Review < Types::BaseType
    include PreviousProjectHelper
    field :comment, String, null: true
    field :type, String, null: true
    field :ratings, Types::Ratings, null: true
    field :first_name, String, null: true
    field :specialist, Types::SpecialistType, null: false

    field :id, ID, null: false, method: :uid

    field :avatar, String, null: true

    def avatar
      return unless project.is_a?(::PreviousProject)

      project.resized_contact_image_url
    end

    field :name, String, null: true

    def name
      return project.user.account.name if project.is_a?(::Project)
      return nil if project&.confidential?

      project.contact_name
    end

    field :role, String, null: true

    def role
      if project.is_a?(::Project)
        project.user.title
      else
        project.try(:contact_job_title)
      end
    end

    field :company_name, String, null: true

    def company_name
      if project.is_a?(::Project)
        project.user.company.name
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
