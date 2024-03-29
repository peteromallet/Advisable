# frozen_string_literal: true

module Toby
  module Attributes
    class HasMany < BaseAttribute
      filter "includes...", Filters::Includes
      filter "are blank", Filters::HasNone
      filter "are not blank", Filters::HasAny

      # optional for when we don't follow the class == resource convention
      def model
        reflection.klass.name.delete("::")
      end

      def column
        reflection.inverse_of&.association_foreign_key || :id
      end

      def sortable
        false
      end

      def via
        reflection.active_record_primary_key
      end

      def type
        type = ["Toby", "Types", model.delete("::")].join("::")
        [type]
      end

      def input_type
        [GraphQL::Types::ID]
      end

      def lazy_read_class
        Toby::Lazy::Base
      end

      def write(resource, value)
        klass = reflection.klass
        attribute = reflection.active_record_primary_key
        records = klass.where(attribute => value)
        resource.public_send("#{name}=", records)
      end
    end
  end
end
