Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :updateApplicationStatus, Types::ApplicationType do
    argument :id, !types.ID
    argument :status, !types.String
    argument :rejectionReason, types.String
    resolve ->(obj, args, ctx) {
      application = ::Application.find_by_airtable_id(args[:id])
      application.status = args[:status]

      unless application.valid?
        return GraphQL::ExecutionError.new(application.errors.full_messages[0])
      end

      airtable = Airtable::Application.find(args[:id])
      airtable["Application Status"] = args[:status]
      airtable["Rejection Reason"] = args[:rejectionReason] if args[:rejectionReason]

      application.save if airtable.save
      application
    }
  end
end
