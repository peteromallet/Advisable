# frozen_string_literal: true

module Toby
  module Filters
    class CheckNil < BaseFilter
      def apply(records, attribute, **_opts)
        records.where(attribute.name => nil)
      end
    end
  end
end
