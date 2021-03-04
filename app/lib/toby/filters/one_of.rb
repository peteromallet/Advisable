# frozen_string_literal: true

module Toby
  module Filters
    class OneOf
      def self.apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.where(attribute.name => value)
      end
    end
  end
end
