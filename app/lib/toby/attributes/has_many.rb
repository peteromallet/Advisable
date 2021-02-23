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

      # via is optional for when we don't follow the resource_id convention
      def via
        options.fetch(:via) { :"#{from.downcase}_ids" }
      end

      def type
        [Toby::Resources.const_get(from).type]
      end

      def input_type
        [GraphQL::Types::ID]
      end

      # def lazy_read(resource, context)
      #   Toby::Lazy.const_get(from).new(context, from, resource.public_send(via))
      # end
    end
  end
end
