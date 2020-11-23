module Advisatable
  module Columns
    class Number < Base
      def type
        precision = opts.fetch(:precision, 0)
        return GraphQL::Types::Int if precision.zero?

        GraphQL::Types::Float
      end

      def input_type
        GraphQL::Types::Float
      end

      def read(resource)
        precision = opts.fetch(:precision, 0)
        resource.public_send(attribute)&.round(precision)
      end
    end
  end
end
