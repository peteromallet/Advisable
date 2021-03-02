# frozen_string_literal: true

module Toby
  module Attributes
    class String < BaseAttribute
      filter :contains, Filters::StringContains
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
