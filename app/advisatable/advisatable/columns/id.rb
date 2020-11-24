module Advisatable
  module Columns
    class Id < Base
      filter :one_of, [GraphQL::Types::String]
      filter :none_of, [GraphQL::Types::String]

      def type
        GraphQL::Types::ID
      end

      def input_type
        GraphQL::Types::String
      end

      def readonly
        true
      end

      def filter(records, filters)
        records = records.where(id: filters[:one_of]) if filters[:one_of]
        records = records.where.not(id: filters[:none_of]) if filters[:none_of]
        records
      end
    end
  end
end
