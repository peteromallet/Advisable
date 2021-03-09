# frozen_string_literal: true

module Toby
  module Filters
    class DateBefore
      def self.apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.where(attribute.name => (..value.first.to_date))
      end
    end
  end
end
