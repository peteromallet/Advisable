Types::AttachmentType = GraphQL::ObjectType.define do
  name 'Attachment'

  field :id, !types.ID, hash_key: "id"
  field :url, types.String, hash_key: "url"
  field :filename, types.String, hash_key: "filename"
  field :size, types.String, hash_key: "size"
  field :type, types.String, hash_key: "type"
end
