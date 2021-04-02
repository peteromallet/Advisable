# frozen_string_literal: true

module Toby
  module Attributes
    class Boolean < BaseAttribute
      filter :is, Filters::Equals
      filter :empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      def type
        GraphQL::Types::Boolean
      end

      def input_type
        GraphQL::Types::Boolean
      end
    end
  end
end
