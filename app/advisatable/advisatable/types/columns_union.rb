# frozen_string_literal: true

module Advisatable
  module Types
    class ColumnsUnion < GraphQL::Schema::Union
      possible_types(*Advisatable::Columns.column_classes.map(&:column_type))

      def self.resolve_type(object, _context)
        object.class.column_type
      end
    end
  end
end
