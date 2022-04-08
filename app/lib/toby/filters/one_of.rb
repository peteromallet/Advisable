# frozen_string_literal: true

module Toby
  module Filters
    class OneOf < BaseFilter
      include Helpers::Uuid

      def apply(records, attribute, value: [], **_opts)
        value = value.select(&:present?)
        return records if value.blank?

        if attribute.respond_to?(:uuid?) && attribute.uuid?
          value = value.select { |v| valid_uuid?(v) }
          records.where("#{attribute.sql_name} IN (?)", value)
        elsif attribute.case_insensitive_compare
          records.where("LOWER(#{attribute.sql_name}) IN (?)", value.map(&:downcase))
        else
          records.where("#{attribute.sql_name} IN (?)", value)
        end
      end
    end
  end
end
