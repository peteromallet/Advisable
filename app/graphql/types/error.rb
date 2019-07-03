class Types::Error < Types::BaseType
  field :code, String, null: false
  field :path, String, null: true
  field :message, String, null: true
end
