module Advisatable
  module Columns
    class Number < Base
      def type
        percision = opts.fetch(:percision, 0)
        return GraphQL::Types::Int if percision.zero?
        GraphQL::Types::Float
      end

      def input_type
        GraphQL::Types::Float
      end

      def read(resource)
        percision = opts.fetch(:percision, 0)
        resource.public_send(attribute)&.round(percision)
      end
    end
  end
end
