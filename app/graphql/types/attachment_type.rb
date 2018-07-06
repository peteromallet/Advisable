class Types::AttachmentType < Types::BaseType

  field :id, ID, null: false
  field :url, String, null: true
  field :filename, String, null: true
  field :size, String, null: true
  field :type, String, null: true
end
