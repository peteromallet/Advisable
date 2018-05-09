Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  
  field :project do
    type Types::ProjectType
    argument :id, !types.ID
    description "Find a Project by ID"
    resolve ->(obj, args, ctx) {
      Job.find(args["id"])
    }
  end
end
