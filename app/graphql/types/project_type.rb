Types::ProjectType = GraphQL::ObjectType.define do
  name 'Project'

  field :id, !types.ID
  field :name, !types.String
  field :applications, types[Types::ApplicationType] do
    resolve ->(obj, args, ctx) {
      obj.applications.order(score: :desc)
    }
  end
end
