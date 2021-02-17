# frozen_string_literal: true

module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      filter :one_of, Filters::OneOf
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      def type
        options.fetch(:resource).type
      end

      def input_type
        GraphQL::Types::ID
      end

      def lazy_read(context, resource)
        Toby::LazyAccount.new(context, resource.public_send("#{name}_id"))
      end
    end
  end
end
