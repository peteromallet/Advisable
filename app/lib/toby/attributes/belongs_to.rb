# frozen_string_literal: true

module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      filter :one_of, Filters::OneOf
      filter :is_empty, Filters::CheckNil
      filter :not_empty, Filters::CheckNotNil

      extension_field :labeled_by, GraphQL::Types::String

      # optional for when we don't follow the class == resource convention
      def model
        options.fetch(:model) { name.capitalize }
      end

      # optional for when we don't follow the id convention
      def column
        options.fetch(:column, :id)
      end

      # optional for when we don't follow the resource_id convention
      def via
        options.fetch(:column) { :"#{model.downcase}_id" }
      end

      def type
        "Toby::Types::#{model}"
      end

      def input_type
        GraphQL::Types::ID
      end

      def write(resource, value)
        resource.public_send("#{column}=", value)
      end

      def lazy_read(resource, context)
        Toby::Lazy::Single.new(self, context, resource.public_send(via))
      end
    end
  end
end
