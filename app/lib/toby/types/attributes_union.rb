# frozen_string_literal: true

module Toby
  module Types
    class AttributesUnion < GraphQL::Schema::Union
      possible_types(*Toby::Attributes.attribute_classes.map(&:attribute_type))

      def self.resolve_type(object, _context)
        object.class.attribute_type
      end
    end
  end
end
