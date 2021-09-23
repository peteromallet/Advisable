# frozen_string_literal: true

module Toby
  module Attributes
    class Date < BaseAttribute
      filter "equals...", Filters::DateEquals
      filter "is after...", Filters::DateAfter
      filter "is before...", Filters::DateBefore
      filter "is blank", Filters::CheckNil
      filter "is not blank", Filters::CheckNotNil

      def type
        GraphQL::Types::ISO8601Date
      end

      def input_type
        GraphQL::Types::ISO8601Date
      end
    end
  end
end
