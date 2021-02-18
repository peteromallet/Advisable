# frozen_string_literal: true

module Toby
  module Filters
    class OneOf
      def self.apply(records, name, contents = [])
        return records if contents.empty?

        records.where(name => contents)
      end
    end
  end
end
