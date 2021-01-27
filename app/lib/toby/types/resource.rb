class Toby::Types::Resource < GraphQL::Schema::Object
  field :name, String, null: false
  # field :index_query_name, String, null: false
  # field :friendly_name, String, null: false
  # field :resource_type, String, null: false
  # field :show_query_name, String, null: false
  # field :create_mutation_name, String, null: false
  # field :update_mutation_name, String, null: false
  # field :columns, [Advisatable::Types::ColumnsUnion], null: false

  def name
    object.model.name.underscore.pluralize
  end

  # def friendly_name
  #   object.model.name.underscore.pluralize.humanize
  # end

  # def resource_type
  #   object.type.graphql_name
  # end
end
