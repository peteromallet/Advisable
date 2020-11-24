module Advisatable
  module Columns
    class BelongsTo < Base
      option_field :labeled_by, GraphQL::Types::String

      def type
        opts.fetch(:resource).type
      end

      def input_type
        GraphQL::Types::ID
      end
    end
  end
end
