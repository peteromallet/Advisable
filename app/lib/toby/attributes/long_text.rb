# frozen_string_literal: true

module Toby
  module Attributes
    class LongText < BaseAttribute
      filter 'equals...', Filters::Equals
      filter 'contains...', Filters::StringContains
      filter 'is blank', Filters::CheckNil
      filter 'is not blank', Filters::CheckNotNil

      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end
    end
  end
end
