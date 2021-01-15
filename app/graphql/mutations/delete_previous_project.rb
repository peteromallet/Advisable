# frozen_string_literal: true

class Mutations::DeletePreviousProject < Mutations::BaseMutation
  argument :id, ID, required: true
  field :success, Boolean, null: true

  def authorized?(**args)
    project = PreviousProject.find_by_uid(args[:id])
    policy = PreviousProjectPolicy.new(current_user, project)
    return true if policy.is_specialist?

    ApiError.not_authorized("You do not have permission to delete this project")
  end

  def resolve(**args)
    project = PreviousProject.find_by_uid(args[:id])
    project.destroy
    {success: true}
  end
end
