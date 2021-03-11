# frozen_string_literal: true

module Toby
  module Filters
    class Equals < BaseFilter
      def apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.where(attribute.name => value.first)
      end
    end
  end
end
