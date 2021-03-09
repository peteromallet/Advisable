# frozen_string_literal: true

module Toby
  module Filters
    class LessThan
      def self.apply(records, attribute, value: [], **_opts)
        return records if value.empty?
        return records if value.first.blank?

        records.where("#{attribute.name} < ? ", value.first)
      end
    end
  end
end
