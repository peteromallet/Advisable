# frozen_string_literal: true

module Toby
  module Filters
    class OneOf < BaseFilter
      def apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.where("LOWER(#{attribute.name}) IN (?)", value.map(&:downcase))
      end
    end
  end
end
