# frozen_string_literal: true

module Toby
  module Types
    class QueryType < GraphQL::Schema::Object
      field_class BaseField

      field :resources, [Resource], null: false

      def resources
        Resources.resource_classes.sort_by(&:name)
      end

      field :views, [ViewType], null: true do
        argument :resource, String, required: true
      end

      def views(resource:)
        ::TobyView.where(resource: resource)
      end

      Resources.resource_classes.each do |resource|
        field resource.query_name_collection, resource.type.connection_type, null: false, resolver: Toby::Resolvers::Collection do
          argument :filters, [FilterInput], required: false
          resource_class resource
        end

        define_method resource.query_name_collection do |**args|
          resource.all(args)
        end

        field resource.query_name_item, resource.type, null: true do
          argument :id, ID, required: true
        end

        define_method resource.query_name_item do |args|
          resource.model.find(args[:id])
        end

        field resource.query_name_search, resource.type.connection_type, null: false do
          argument :query, String, required: true
        end

        define_method resource.query_name_search do |args|
          resource.search(args[:query])
        end
      end
    end
  end
end
