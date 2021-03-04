# frozen_string_literal: true

module Toby
  module Filters
    class HasNone
      def self.apply(records, attribute, **_opts)
        if attribute.respond_to?(:through)
          records.includes(attribute.through).where(attribute.through => {attribute.column => nil})
        else
          records.includes(attribute.name).where(attribute.name => {attribute.column => nil})
        end
      end
    end
  end
end
