# frozen_string_literal: true

module Toby
  module Attributes
    class String < BaseAttribute
      filter 'equals...', Filters::Equals
      filter 'is one of...', Filters::OneOf
      filter 'contains...', Filters::StringContains
      filter 'is blank', Filters::CheckNil
      filter 'is not blank', Filters::CheckNotNil

      def type
        GraphQL::Types::String
      end

      def input_type
        GraphQL::Types::String
      end

      def case_insensitive_compare?
        true
      end
    end
  end
end
