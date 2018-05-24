Types::CountryType = GraphQL::ObjectType.define do
  name 'Country'

  field :id, !types.ID
  field :name, types.String, hash_key: :name
  field :currency, types.String, hash_key: :currency
end
