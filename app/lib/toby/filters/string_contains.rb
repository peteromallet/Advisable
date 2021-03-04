# frozen_string_literal: true

module Toby
  module Filters
    class StringContains
      def self.apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.where("#{attribute.name.to_s.underscore} ilike ?", "%#{value.first}%")
      end
    end
  end
end
