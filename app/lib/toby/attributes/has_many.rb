# frozen_string_literal: true

module Toby
  module Attributes
    class HasMany < BaseAttribute
      filter :includes, Filters::Includes
      filter :has_none, Filters::HasNone
      # filter :not_empty, Filters::CheckNotNil

      extension_field :labeled_by, GraphQL::Types::String

      # optional for when we don't follow the class == resource convention
      def model
        options.fetch(:model) { name.to_s.singularize.camelize }
      end

      # optional for when we don't follow the parent_id convention
      def column
        options.fetch(:column) { :"#{parent.downcase}_id" }
      end

      # optional for when we don't follow the id convention
      def via
        options.fetch(:column, :id)
      end

      def type
        ["Toby::Types::#{model}"]
      end

      def input_type
        [GraphQL::Types::ID]
      end

      def lazy_read_class
        Toby::Lazy::Base
      end
    end
  end
end
