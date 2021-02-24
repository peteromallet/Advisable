# frozen_string_literal: true

module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      filter :one_of, Filters::OneOf
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      # to is optional for when we don't follow the class == resource convention
      def to
        options.fetch(:to) { name.capitalize }
      end

      # via is optional for when we don't follow the resource_id convention
      def via
        options.fetch(:via) { :"#{to.downcase}_id" }
      end

      def type
        "Toby::Types::#{to}"
      end

      def input_type
        GraphQL::Types::ID
      end

      def write(resource, value)
        resource.public_send("#{via}=", value)
      end

      def lazy_read(resource, context)
        Toby::Lazy.const_get(to).new(context, to, resource.public_send(via))
      end
    end
  end
end
