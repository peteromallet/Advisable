module Advisatable
  module Columns
    class SingleSelect < Base
      filter :one_of, [GraphQL::Types::String]
      filter :none_of, [GraphQL::Types::String]

      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end

      def filter(records, filters)
        records = records.where(attribute => filters[:one_of]) if filters[:one_of]
        records = records.where.not(attribute => filters[:none_of]) if filters[:none_of]
        records
      end
    end
  end
end
