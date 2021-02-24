# frozen_string_literal: true

module Toby
  module Attributes
    class HasMany < BaseAttribute
      filter :includes, Filters::Includes
      # filter :not_empty, Filters::CheckNotNil

      # from is optional for when we don't follow the class == resource convention
      def from
        options.fetch(:from) { name.to_s.singularize.capitalize }
      end

      # via is optional for when we don't follow the parent_id convention
      def via
        options.fetch(:via) { :"#{parent.demodulize.downcase}_id" }
      end

      def type
        ["Toby::Types::#{from}"]
      end

      def input_type
        [GraphQL::Types::ID]
      end

      def lazy_read(resource, context)
        Toby::Lazy::Multiple.new(context, from, resource.id, column: via)
      end
    end
  end
end
