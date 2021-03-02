# frozen_string_literal: true

module Toby
  module Attributes
    class Boolean < BaseAttribute
      def type
        GraphQL::Types::Boolean
      end

      def input_type
        GraphQL::Types::Boolean
      end
    end
  end
end
