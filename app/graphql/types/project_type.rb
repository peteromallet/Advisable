Types::ProjectType = GraphQL::ObjectType.define do
  name 'Project'

  field :id, !types.ID
  field :name, !types.String, hash_key: :project

  field :applications, types[Types::ApplicationType] do
    resolve ->(obj, args, ctx) {
      ids = obj.fields["Candidacies"]
      Application.all(filter: "
        FIND(RECORD_ID(), ARRAYJOIN('#{ids}'))
      ", sort: { Score: "desc" })
    }
  end
end
