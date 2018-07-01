class Mutations::UpdateApplicationStatus < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :status, String, required: true
  argument :rejection_reason, ID, required: false

  field :application, Types::ApplicationType, null: true

  def resolve(**args)
    update = Applications::UpdateStatus.call(
      id: args[:id],
      status: args[:status],
      rejection_reason_id: args[:rejection_reason]
    )

    return { application: update.data } if update.ok?
    GraphQL::ExecutionError.new(update.error.message)
  end
end
