class Mutations::VerifyOffPlatformProject < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :email, String, required: false

  field :off_platform_project, Types::OffPlatformProject, null: true

  def authorized?(id:, email:)
    project = OffPlatformProject.find_by_uid!(id)

    if project.validation_status != 'Pending'
      raise ApiError::InvalidRequest.new(
              'validationStatusNotPending',
              "Expected validation status to be 'Pending' but is #{
                project.validation_status
              }"
            )
    end

    true
  end

  def resolve(id:, email:)
    project = OffPlatformProject.find_by_uid!(id)
    project.update(validation_status: 'In Progress', contact_email: email)
    project.sync_to_airtable

    { off_platform_project: project }
  end
end
