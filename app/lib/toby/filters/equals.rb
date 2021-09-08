# frozen_string_literal: true

module Toby
  module Filters
    class Equals < BaseFilter
      include Helpers::Uuid

      def apply(records, attribute, value: [], **_opts)
        value = value.first(&:present?)
        return records if value.blank?

        if attribute.respond_to?(:uuid?) && attribute.uuid?
          valid_uuid?(value) ? records.where("#{attribute.name} = ?", value) : records.none
        elsif attribute.case_insensitive_compare?
          records.where("LOWER(#{attribute.name}) = LOWER(?)", value)
        else
          records.where("#{attribute.name} = ?", value)
        end
      end
    end
  end
end
