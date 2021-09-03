# frozen_string_literal: true

module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      filter 'is one of...', Filters::OneOf, nested: true
      filter 'is blank', Filters::CheckNil
      filter 'is not blank', Filters::CheckNotNil

      # optional for when we don't follow the class == resource convention
      def model
        options.fetch(:model) { name.to_s.camelize }
      end

      def column
        reflection.active_record_primary_key
      end

      def via
        reflection.association_foreign_key
      end

      def sortable
        false
      end

      def type
        "Toby::Types::#{model}"
      end

      def input_type
        GraphQL::Types::ID
      end

      def write(resource, value)
        resource.public_send("#{via}=", value)
      end

      def lazy_read_class
        Toby::Lazy::Single
      end
    end
  end
end
