# frozen_string_literal: true

module Types
  class PreviousProjectReview < Types::BaseType
    implements Types::ReviewInterface

    include PreviousProjectHelper

    description 'A type for PreviousProject Review'

    field :project, Types::PreviousProject, null: false

    field :role, String, null: true
    def role
      object.project.try(:contact_job_title)
    end

    def company_name
      previous_project_company_name(object.project)
    end
  end
end
