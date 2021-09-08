# frozen_string_literal: true

module Toby
  module Attributes
    class Id < BaseAttribute
      filter 'equals...', Filters::Equals
      filter 'is one of...', Filters::OneOf

      def type
        GraphQL::Schema::Object::ID
      end

      def input_type
        GraphQL::Types::String
      end

      def uuid?
        resource.model.columns.find { |c| c.name == name.to_s }.sql_type == "uuid"
      end
    end
  end
end
