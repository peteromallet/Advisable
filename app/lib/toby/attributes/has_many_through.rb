# frozen_string_literal: true

module Toby
  module Attributes
    class HasManyThrough < HasMany
      # optional when has_many through: does not follow parent_model plural convention
      def through
        options.fetch(:through) { [parent.downcase, model.downcase].join("_").pluralize }
      end

      # optional when has_many through: does not follow model_id convention
      def through_column
        options.fetch(:through_column) { :"#{model.downcase}_id" }
      end

      # optional when has_many through: source model does not follow id convention
      def source_id_column
        options.fetch(:source_id_column, :id)
      end

      def lazy_read(resource, context)
        Toby::Lazy::Through.new(self, context, resource.id)
      end
    end
  end
end
