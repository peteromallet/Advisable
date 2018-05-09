Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :project do
    type Types::ProjectType
    argument :id, !types.ID
    description "Find a Project by ID"
    resolve ->(obj, args, ctx) {
      begin
        Job.find(args["id"])
      rescue Airrecord::Error => er
        GraphQL::ExecutionError.new("Could not find project #{args['id']}")
      end
    }
  end
end
