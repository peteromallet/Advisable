# frozen_string_literal: true

module Toby
  module Types
    module AttributeInterface
      include GraphQL::Schema::Interface

      orphans = []
      (Toby::Attributes.constants - [:BaseAttribute]).each do |klass|
        orphans << "Toby::Attributes::#{klass}".constantize.attribute_type
      end
      orphan_types(*orphans)

      field :name, GraphQL::Types::String, null: false
      def name
        object.name.to_s.camelize(:lower)
      end

      field :filters, [Toby::Types::ResourceFilterType], null: false

      def filters
        object.class.filters
      end

      field :readonly, GraphQL::Types::Boolean, null: false

      field :column_label, GraphQL::Types::String, null: true
      def column_label
        object.options.fetch(:column_label) { name.titleize }
      end

      field :description, GraphQL::Types::String, null: true
      def description
        object.options.fetch(:description, nil)
      end

      definition_methods do
        def resolve_type(object, _)
          object.class.attribute_type
        end
      end
    end
  end
end
