# frozen_string_literal: true

module Toby
  module Attributes
    class HasMany < BaseAttribute
      filter :includes, Filters::Includes
      # filter :not_empty, Filters::CheckNotNil

      extension_field :labeled_by, GraphQL::Types::String

      # optional for when we don't follow the class == resource convention
      def from
        options.fetch(:from) { name.to_s.singularize.capitalize }
      end

      # optional for when we don't follow the parent_id convention
      def via
        options.fetch(:via) { :"#{parent.demodulize.downcase}_id" }
      end

      # required when has_many through:
      def through
        options[:through]
      end

      # optional when has_many through: does not follow model_id convention
      def through_column
        options.fetch(:through_column) { :"#{from.downcase}_id" }
      end

      # optional when has_many through: source model does not follow id convention
      def source_id_column
        options.fetch(:source_id_column, :id)
      end

      # For debugging purposes
      def lazy?
        options.fetch(:lazy, true)
      end

      def type
        ["Toby::Types::#{from}"]
      end

      def input_type
        [GraphQL::Types::ID]
      end

      def lazy_read(resource, context)
        return unless lazy?

        if through.blank?
          Toby::Lazy::Base.new(context, from, resource.id, column: via)
        else
          Toby::Lazy::Through.new(context, from, through, resource.id, column: via, through_column: through_column, source_id_column: source_id_column)
        end
      end
    end
  end
end
