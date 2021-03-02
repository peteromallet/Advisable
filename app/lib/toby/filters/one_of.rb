# frozen_string_literal: true

module Toby
  module Filters
    class OneOf
      def self.apply(records, name, value = [])
        return records if value.empty?

        records.where(name => value)
      end
    end
  end
end
