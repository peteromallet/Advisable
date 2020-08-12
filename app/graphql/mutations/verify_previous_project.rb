class Mutations::VerifyPreviousProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :previous_project, Types::PreviousProject, null: true

  def authorized?(id:)
    return false unless context[:oauth_viewer]
    project = PreviousProject.find_by_uid!(id)
    verifier = PreviousProject::Verifier.new(context[:oauth_viewer], project)
    verifier.can_verify?
  end

  def resolve(id:)
    project = PreviousProject.find_by_uid!(id)
    verifier = PreviousProject::Verifier.new(context[:oauth_viewer], project)
    verifier.verify

    { previous_project: project }
  end
end
