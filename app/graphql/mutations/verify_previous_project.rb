class Mutations::VerifyPreviousProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :previous_project, Types::PreviousProject, null: true

  def authorized?(id:)
    return false unless context[:oauth_viewer]
    project = PreviousProject.find_by_uid!(id)
    context[:oauth_viewer].can_validate_project?(project)
  end

  def resolve(id:)
    project = PreviousProject.find_by_uid!(id)
    project.update(validation_status: 'Validated')

    { previous_project: project }
  end
end
