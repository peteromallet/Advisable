# frozen_string_literal: true

module Toby
  module Filters
    class CheckNotNil
      def self.apply(records, name, _)
        records.where.not(name => nil)
      end
    end
  end
end
