# frozen_string_literal: true

module Toby
  module Filters
    class LessThan < BaseFilter
      def apply(records, attribute, value: [], **_opts)
        return records if value.empty?
        return records if value.first.blank?

        records.where("#{attribute.sql_name} < ? ", value.first)
      end
    end
  end
end
