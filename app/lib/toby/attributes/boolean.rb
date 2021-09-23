# frozen_string_literal: true

module Toby
  module Attributes
    class Boolean < BaseAttribute
      filter "is...", Filters::Equals
      filter "is blank", Filters::CheckNil
      filter "is not blank", Filters::CheckNotNil

      def type
        GraphQL::Types::Boolean
      end

      def input_type
        GraphQL::Types::Boolean
      end
    end
  end
end
