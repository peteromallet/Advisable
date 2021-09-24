# frozen_string_literal: true

module Toby
  module Attributes
    class HasManyThrough < HasMany
      filter "includes...", Filters::Includes
      filter "are blank", Filters::HasNone

      def lazy_read_class
        Toby::Lazy::Through
      end

      def sortable
        false
      end

      def write(resource, value)
        klass = reflection.source_reflection.klass
        attribute = reflection.through_reflection.active_record_primary_key
        records = klass.where(attribute => value)
        resource.public_send("#{name}=", records)
      end
    end
  end
end
