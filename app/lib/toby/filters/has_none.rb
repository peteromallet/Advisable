# frozen_string_literal: true

module Toby
  module Filters
    class HasNone < BaseFilter
      def apply(records, attribute, **_opts)
        records.where.missing(attribute.sql_name)
      end
    end
  end
end
