# frozen_string_literal: true

module Toby
  module Filters
    class HasAny < BaseFilter
      def apply(records, attribute, **_opts)
        records.where.associated(attribute.sql_name)
      end
    end
  end
end
