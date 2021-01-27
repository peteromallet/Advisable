module Toby
  module Attributes
    class String < BaseAttribute
      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
