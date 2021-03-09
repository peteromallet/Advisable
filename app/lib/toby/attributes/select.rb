# frozen_string_literal: true

module Toby
  module Attributes
    class Select < BaseAttribute
      filter :is, Filters::Equals
      filter :one_of, Filters::OneOf
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

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
