# frozen_string_literal: true

module Toby
  module Attributes
    class Id < BaseAttribute
      filter :contains, Filters::OneOf

      def type
        GraphQL::Schema::Object::ID
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
