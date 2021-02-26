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
        options.fetch(:via) { :"#{parent.downcase}_id" }
      end

      def type
        ["Toby::Types::#{from}"]
      end

      def input_type
        [GraphQL::Types::ID]
      end

      def lazy_read(resource, context)
        Toby::Lazy::Base.new(context, from, resource.id, column: via)
      end
    end
  end
end
