# frozen_string_literal: true

class Mutations::ConfirmProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true

  def resolve(id:)
    project = Project.find_by_uid_or_airtable_id!(id)
    {project: Projects::Confirm.call(project: project)}
  rescue Service::Error => e
    ApiError.service_error(e)
  end
end
