# frozen_string_literal: true

module Toby
  module Filters
    class CheckNil
      def self.apply(records, name, _)
        records.where(name => nil)
      end
    end
  end
end
