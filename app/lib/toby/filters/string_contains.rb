# frozen_string_literal: true

module Toby
  module Filters
    class StringContains < BaseFilter
      def apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.where("#{attribute.name.to_s.underscore} ILIKE ?", "%#{value.first}%")
      end
    end
  end
end
