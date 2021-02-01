module Toby
  module Types
    class QueryType < GraphQL::Schema::Object
      field_class BaseField

      field :resources, [Resource], null: false

      def resources
        Resources.resource_classes.sort_by(&:name)
      end

      Resources.resource_classes.each do |resource|
        field resource.query_name_collection, resource.type.connection_type, null: false, extras: [:lookahead], resolver: Toby::Resolvers::Collection do
          argument :filter, resource.filter_type, required: false
          model_class resource.model
        end

        define_method resource.query_name_collection do |**args|
          resource.all(args)
        end

        # field resource.show_query_name, resource.type, null: true do
        #   argument :id, ID, required: true
        # end

        # define_method resource.show_query_name do |args|
        #   resource.show(args)
        # end
      end
    end
  end
end
