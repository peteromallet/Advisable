# frozen_string_literal: true

module Toby
  module Attributes
    class HasOne < HasMany
      filter :includes, Filters::Includes
      filter :has_none, Filters::HasNone

      def type
        "Toby::Types::#{model}"
      end

      def input_type
        GraphQL::Types::ID
      end

      def lazy_read_class
        Toby::Lazy::Single
      end
    end
  end
end
