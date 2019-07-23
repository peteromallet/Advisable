class Types::CustomerType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :email, String, null: false
end
