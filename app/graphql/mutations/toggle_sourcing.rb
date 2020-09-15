class Mutations::ToggleSourcing < Mutations::BaseMutation
  argument :project, ID, required: true

  field :project, Types::ProjectType, null: true

  def authorized?(**args)
    requires_current_user!
    project = Project.find_by_uid!(args[:project])
    policy = ProjectPolicy.new(context[:current_user], project)
    return true if policy.can_access_project?
    ApiError.not_authorized('You do not have access to this project')
  end

  def resolve(**args)
    project = Project.find_by_uid!(args[:project])
    project.update(sourcing: !project.sourcing)
    { project: project }
  end
end
