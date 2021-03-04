# frozen_string_literal: true

module Toby
  module Filters
    class Includes
      def self.apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        reflection = attribute.reflection

        if attribute.respond_to?(:through)
          through = reflection.options[:through]
          association_id = reflection.source_reflection.association_primary_key
          records.includes(through => reflection.source_reflection.name).where(through => {reflection.name => {association_id => value}})
        else
          records.joins(attribute.name).where(attribute.name => {attribute.via => value}).distinct
        end
      end
    end
  end
end
