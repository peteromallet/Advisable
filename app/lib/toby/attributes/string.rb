module Toby
  module Attributes
    class String < BaseAttribute
      filter :contains, Filters::StringContains

      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
