# frozen_string_literal: true

module Toby
  module Attributes
    class Select < BaseAttribute
      filter 'equals...', Filters::Equals
      filter 'is one of...', Filters::OneOf
      filter 'is blank', Filters::CheckNil
      filter 'is not blank', Filters::CheckNotNil

      extension_field :options, [GraphQL::Types::String]

      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
