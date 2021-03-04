# frozen_string_literal: true

module Toby
  module Filters
    class CheckNotNil
      def self.apply(records, attribute, **_opts)
        records.where.not(attribute.name => nil)
      end
    end
  end
end
