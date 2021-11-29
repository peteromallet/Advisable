# frozen_string_literal: true

module Toby
  module Filters
    class NotOneOf < BaseFilter
      include Helpers::Uuid

      def apply(records, attribute, value: [], **_opts)
        value = value.select(&:present?)
        return records if value.blank?

        if attribute.respond_to?(:uuid?) && attribute.uuid?
          value = value.select { |v| valid_uuid?(v) }
          records.where.not("#{attribute.name} IN (?)", value)
        elsif attribute.case_insensitive_compare
          records.where.not("LOWER(#{attribute.name}) IN (?)", value.map(&:downcase))
        else
          records.where.not("#{attribute.name} IN (?)", value)
        end
      end
    end
  end
end
