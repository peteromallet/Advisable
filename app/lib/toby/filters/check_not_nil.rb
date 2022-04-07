# frozen_string_literal: true

module Toby
  module Filters
    class CheckNotNil < BaseFilter
      def apply(records, attribute, **_opts)
        records.where.not(attribute.sql_name => nil)
      end
    end
  end
end
