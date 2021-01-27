module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      # option_field :labeled_by, GraphQL::Types::String

      def type
        options.fetch(:resource).type
      end

      def input_type
        GraphQL::Types::ID
      end

      def read(resource)
        resource.public_send(name)
      end
    end
  end
end
