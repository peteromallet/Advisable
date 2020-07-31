class Mutations::PublishProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true

  def authorized?(id:)
    project = Project.find_by_uid_or_airtable_id!(id)
    policy = ProjectPolicy.new(context[:current_user], project)

    unless policy.is_client
      raise ApiError.not_authorized("You don't have access to this project")
    end

    if project.status != :draft
      raise ApiError.invalidRequest(
              'ALREADY_PUBLISHED',
              'This project is not a draft'
            )
    end

    true
  end

  def resolve(id:)
    project = Project.find_by_uid_or_airtable_id!(id)
    project.status = :pending_review
    project.sync_to_airtable if project.save
    { project: project }
  end
end
