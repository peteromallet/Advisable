# frozen_string_literal: true

module Toby
  module Filters
    class HasNone < BaseFilter
      def apply(records, attribute, **_opts)
        records.where.missing(attribute.name)
      end
    end
  end
end
