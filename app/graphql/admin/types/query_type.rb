class Admin::Types::QueryType < Types::BaseType
  Zeitwerk::Loader.eager_load_all

  field :__resources, [Advisatable::Types::Resource], null: false

  def __resources
    Advisatable::Resource.descendants.sort_by(&:name)
  end

  Advisatable::Resource.descendants.each do |admin|
    field admin.index_query_name, [admin.type], null: false do
      argument :filter, admin.filter_type, required: false
    end

    define_method admin.index_query_name do |**args|
      admin.index(**args)
    end

    field admin.show_query_name, admin.type, null: true do
      argument :id, ID, required: true
    end

    define_method admin.show_query_name do |args|
      admin.show(args)
    end
  end
end
