# frozen_string_literal: true

module Toby
  module Attributes
    class TextArray < BaseAttribute
      def type
        [GraphQL::Types::String]
      end

      def input_type
        [GraphQL::Types::String]
      end

      def sortable
        false
      end
    end
  end
end
