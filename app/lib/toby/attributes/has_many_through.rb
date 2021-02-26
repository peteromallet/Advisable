# frozen_string_literal: true

module Toby
  module Attributes
    class HasManyThrough < HasMany
      # optional when has_many through: does not follow parent_from plural convention
      def through
        options.fetch(:through) { [parent.downcase, from.downcase].join("_").pluralize }
      end

      # optional when has_many through: does not follow model_id convention
      def through_column
        options.fetch(:through_column) { :"#{from.downcase}_id" }
      end

      # optional when has_many through: source model does not follow id convention
      def source_id_column
        options.fetch(:source_id_column, :id)
      end

      def lazy_read(resource, context)
        Toby::Lazy::Through.new(context, from, through, resource.id, column: via, through_column: through_column, source_id_column: source_id_column)
      end
    end
  end
end
