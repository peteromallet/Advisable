# frozen_string_literal: true

module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      filter :one_of, Filters::OneOf
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      def to
        options.fetch(:to)
      end

      def via
        options.fetch(:via)
      end

      def type
        Toby::Resources.const_get(to).type
      end

      def input_type
        GraphQL::Types::ID
      end

      def lazy_read(resource, context)
        Toby::Lazy.const_get(to).new(context, to, resource.public_send(via))
      end
    end
  end
end
