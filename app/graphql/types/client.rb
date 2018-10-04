class Types::Client < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :projects, [Types::ProjectType], null: true
end
