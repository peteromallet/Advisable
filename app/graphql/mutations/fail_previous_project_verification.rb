class Mutations::FailPreviousProjectVerification < Mutations::BaseMutation
  argument :previous_project, ID, required: true
  argument :reason, String, required: true

  field :previous_project, Types::PreviousProject, null: true

  def authorized?(previous_project:, reason:)
    return false unless context[:oauth_viewer]
    project = PreviousProject.find_by_uid!(previous_project)
    context[:oauth_viewer].can_validate_project?(project)
  end

  def resolve(previous_project:, reason:)
    project = PreviousProject.find_by_uid!(previous_project)
    project.update(
      validation_status: 'Validation Failed', validation_failed_reason: reason
    )

    { previous_project: project }
  end
end
