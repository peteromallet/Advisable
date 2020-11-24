module Advisatable
  module Columns
    class String < Base
      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
