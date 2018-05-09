Types::ProjectType = GraphQL::ObjectType.define do
  name 'Project'

  field :id, !types.ID
  field :name, !types.String, hash_key: :project
  field :applications, types[Types::ApplicationType], hash_key: :candidacies
end
