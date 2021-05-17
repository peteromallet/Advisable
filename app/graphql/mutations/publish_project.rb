# frozen_string_literal: true

module Mutations
  class PublishProject < Mutations::BaseMutation
    argument :id, ID, required: true

    field :project, Types::ProjectType, null: true

    # Currently there are two statuses that represent a project being in a non
    # published state. A project status is 'Draft' when the service_type is
    # 'Self-Serve' and the user has not yet submitted the project. A project
    # status is 'Brief Pending Confirmation' when the service_type is 'Assisted'
    # and the project has been sent to the client to confirm the details.
    # TODO: Ideally we would have some kind of published_at attribute here that
    # we would rely on instead.
    ALLOWED_STATUSES = ["Draft", "Brief Pending Confirmation"].freeze

    def authorized?(id:)
      project = Project.find_by_uid_or_airtable_id!(id)
      policy = ProjectPolicy.new(current_user, project)

      ApiError.not_authorized("You don't have access to this project") unless policy.publish?

      ApiError.invalid_request('ALREADY_PUBLISHED', 'This project is not a draft') if ALLOWED_STATUSES.exclude?(project.status)

      true
    end

    def resolve(id:)
      project = Project.find_by_uid_or_airtable_id!(id)
      project.status = project.assisted? ? "Brief Confirmed" : "Pending Advisable Confirmation"
      project.published_at = Time.zone.now
      project.sales_status = 'Open'
      project.sourcing = true
      success = current_account_responsible_for { project.save }
      project.sync_to_airtable if success
      {project: project}
    end
  end
end
