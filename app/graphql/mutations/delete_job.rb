class Mutations::DeleteJob < Mutations::BaseMutation
  argument :id, ID, required: true
  field :id, ID, null: true

  def authorized?(id:)
    user = context[:current_user]
    ApiError.not_authenticated if user.nil?
    project = Project.find_by_uid_or_airtable_id!(id)
    policy = ProjectPolicy.new(user, project)

    unless policy.is_client
      ApiError.not_authorized('You do not have access to this project')
    end

    unless %i[draft pending_review].include?(project.status)
      ApiError.invalid_request(message: 'Project must be a draft')
    end

    true
  end

  def resolve(id:)
    project = Project.find_by_uid_or_airtable_id!(id)
    project.destroy

    { id: id }
  end
end
