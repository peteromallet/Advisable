class Toby::Types::Resource < GraphQL::Schema::Object
  field :type, String, null: false
  field :query_name_collection, String, null: false
  field :query_name_item, String, null: false
  field :query_name_create, String, null: false
  field :query_name_update, String, null: false
  field :query_name_destroy, String, null: false
  field :attributes, [Toby::Types::AttributesUnion], null: false

  def type
    object.model.name
  end
end
