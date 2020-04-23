class Mutations::VerifyPreviousProject < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :email, String, required: false

  field :previous_project, Types::PreviousProject, null: true

  def authorized?(id:, email:)
    project = PreviousProject.find_by_uid!(id)

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
    project = PreviousProject.find_by_uid!(id)
    project.update(validation_status: 'In Progress', contact_email: email)

    { previous_project: project }
  end
end
