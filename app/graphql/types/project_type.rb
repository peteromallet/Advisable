Types::ProjectType = GraphQL::ObjectType.define do
  name 'Project'

  field :id, !types.ID
  field :name, !types.String, hash_key: :project

  field :applications, types[Types::ApplicationType] do
    argument :status, !types.String
    resolve ->(obj, args, ctx) {
      ids = obj.fields["Candidacies"]
      Application.all(filter: "
        AND(
          FIND(RECORD_ID(), ARRAYJOIN('#{ids}')),
          {Application Status} = '#{args[:status]}'
        )
      ", sort: { Score: "desc" })
    }
  end
end
