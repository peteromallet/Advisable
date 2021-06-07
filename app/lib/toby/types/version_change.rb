# frozen_string_literal: true

module Toby
  module Types
    class VersionChange < GraphQL::Schema::Object
      field :attribute, String, null: false
      def attribute
        object.first
      end

      field :value, String, null: true
      def value
        object.last
      end
    end
  end
end
