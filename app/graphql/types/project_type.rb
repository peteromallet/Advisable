Types::ProjectType = GraphQL::ObjectType.define do
  name 'Project'

  field :id, !types.ID
  field :name, !types.String
  field :currency, types.String
  field :applications, types[Types::ApplicationType] do
    resolve ->(obj, args, ctx) {
      obj.applications.accepted_fees.accepted_terms.order(score: :desc)
    }
  end
end
