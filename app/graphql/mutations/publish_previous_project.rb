# frozen_string_literal: true

module Mutations
  class PublishPreviousProject < Mutations::BaseMutation
    argument :previous_project, ID, required: false
    argument :contact_name, String, required: false
    argument :contact_job_title, String, required: false
    argument :contact_relationship, String, required: false

    field :previous_project, Types::PreviousProject, null: true

    def authorized?(previous_project:, **_args)
      requires_specialist!
      project = PreviousProject.find_by_uid(previous_project)
      policy = PreviousProjectPolicy.new(current_user, project)
      return true if policy.publish?

      ApiError.not_authorized("You do not have permission to publish this project")
    end

    def resolve(**args)
      project = PreviousProject.find_by_uid(args[:previous_project])

      current_account_responsible_for do
        project.update(
          contact_name: args[:contact_name],
          contact_job_title: args[:contact_job_title],
          contact_relationship: args[:contact_relationship],
          draft: false
        )
      end

      SpecialistMailer.verify_project(project.uid).deliver_later

      {previous_project: project}
    end
  end
end
