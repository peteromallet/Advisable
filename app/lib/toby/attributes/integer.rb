# frozen_string_literal: true

module Toby
  module Attributes
    class Integer < BaseAttribute
      filter "equals...", Filters::Equals
      filter "is less than...", Filters::LessThan
      filter "is greater than...", Filters::GreaterThan
      filter "is blank", Filters::CheckNil
      filter "is not blank", Filters::CheckNotNil

      def type
        GraphQL::Types::Int
      end

      def input_type
        GraphQL::Types::Int
      end
    end
  end
end
