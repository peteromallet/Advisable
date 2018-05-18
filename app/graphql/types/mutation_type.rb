Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :updateApplicationStatus, Types::ApplicationType do
    argument :id, !types.ID
    argument :status, !types.String
    argument :rejectionReason, types.String
    resolve ->(obj, args, ctx) {
      application = Application.find(args[:id])
      application["Application Status"] = args[:status]
      application["Rejection Reason"] = args[:rejectionReason] if args[:rejectionReason]
      application.save
      # There is currently a bug with airrecord when updating records.
      # https://github.com/sirupsen/airrecord/pull/21
      # For now we can solve by refetching
      Application.find(args[:id])
    }
  end
end
