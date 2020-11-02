class Mutations::PublishProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true

  # Currently there are two statuses that represent a project being in a non
  # published state. A project status is 'Draft' when the service_type is
  # 'Self-Serve' and the user has not yet submitted the project. A project
  # status is 'Brief Pending Confirmation' when the service_type is 'Assisted'
  # and the project has been sent to the client to confirm the details.
  # TODO: Remove status_map.
  # TODO: Ideally we would have some kind of published_at attribute here that
  # we would rely on instead.
  ALLOWED_STATUSES = [:draft, "Brief Pending Confirmation"].freeze

  def authorized?(id:)
    project = Project.find_by_uid_or_airtable_id!(id)
    policy = ProjectPolicy.new(context[:current_user], project)

    unless policy.is_client
      raise ApiError.not_authorized("You don't have access to this project")
    end

    if ALLOWED_STATUSES.exclude?(project.status)
      raise ApiError.invalid_request(
        code: 'ALREADY_PUBLISHED',
        message: 'This project is not a draft'
      )
    end

    true
  end

  def resolve(id:)
    project = Project.find_by_uid_or_airtable_id!(id)
    project.status = project.assisted? ? "Brief Confirmed" : :pending_review
    project.sales_status = 'Open'
    project.sourcing = true
    project.sync_to_airtable if project.save
    {project: project}
  end
end
