# frozen_string_literal: true

module Toby
  module Filters
    class OneOf
      def self.apply(records, name, values)
        records.where(name => values)
      end
    end
  end
end
