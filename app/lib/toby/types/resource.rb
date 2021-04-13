# frozen_string_literal: true

module Toby
  module Types
    class Resource < GraphQL::Schema::Object
      field :query_name_collection, String, null: false
      field :query_name_item, String, null: false
      field :query_name_create, String, null: false
      field :query_name_update, String, null: false
      field :query_name_destroy, String, null: false
      field :attributes, [Toby::Types::AttributeInterface], null: false
      field :type, String, null: false

      def type
        object.model.name
      end
    end
  end
end
