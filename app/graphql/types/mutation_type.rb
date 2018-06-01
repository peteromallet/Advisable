Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :updateApplicationStatus, Types::ApplicationType do
    argument :id, !types.ID
    argument :status, !types.String
    argument :rejectionReason, types.String
    resolve ->(obj, args, ctx) {
      update = Applications::UpdateStatus.call(
        id: args[:id],
        status: args[:status],
        rejection_reason: args[:rejectionReason]
      )

      return update.data if update.ok?
      GraphQL::ExecutionError.new(update.error.message)
    }
  end
end
