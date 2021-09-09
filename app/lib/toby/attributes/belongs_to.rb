# frozen_string_literal: true

module Toby
  module Attributes
    class BelongsTo < BaseAttribute
      filter 'contains...', Filters::StringContains do |records, attribute, value|
        resource = attribute.reflection_resource.constantize
        next records.none unless resource.respond_to?(:search)

        records.where(attribute.name => resource.search(value.first))
      end

      filter 'is one of...', Filters::OneOf do |records, attribute, value|
        column = attribute.reflection.association_foreign_key
        records.where(column => value)
      end

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

      def reflection_resource
        "Toby::Resources::#{model}"
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
