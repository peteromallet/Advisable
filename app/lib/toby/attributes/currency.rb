# frozen_string_literal: true

module Toby
  module Attributes
    class Currency < BaseAttribute
      filter :is, Filters::Equals
      filter :less_than, Filters::LessThan
      filter :greater_than, Filters::GreaterThan
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      def type
        GraphQL::Types::Int
      end

      def input_type
        GraphQL::Types::Int
      end
    end
  end
end
