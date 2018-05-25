Types::ApplicationQuestion = GraphQL::ObjectType.define do
  name 'ApplicationQuestion'
  field :question, types.String, hash_key: "question"
  field :answer, types.String, hash_key: "answer"
end

Types::ApplicationType = GraphQL::ObjectType.define do
  name 'Application'

  field :id, !types.ID do
    resolve ->(obj, args, ctx) {
      obj.airtable_id
    }
  end

  field :rate, types.String
  field :availability, types.String
  field :specialist, Types::SpecialistType
  field :status, types.String
  field :introduction, types.String
  field :questions, types[Types::ApplicationQuestion]
end
