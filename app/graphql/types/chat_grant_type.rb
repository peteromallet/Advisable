class Types::ChatGrantType < Types::BaseType
  field :access_token, String, null: true
  field :identity, String, null: true
end
