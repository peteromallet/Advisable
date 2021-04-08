# frozen_string_literal: true

module Toby
  module Types
    class ViewType < GraphQL::Schema::Object
      field :id, ID, null: false
      field :name, String, null: false
      field :filters, [FilterType], null: false

      def filters
        object.filters || []
      end
    end
  end
end
