Types::SpecialistType = GraphQL::ObjectType.define do
  name 'Specialist'

  field :id, !types.ID
  field :name, types.String, hash_key: :name
  field :city, types.String, hash_key: :city
  field :country, types.String, hash_key: :country
end
