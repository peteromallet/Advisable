# frozen_string_literal: true

module Toby
  module Filters
    class Includes
      def self.apply(records, name, value = [])
        return records if value.empty?

        records.joins(name).where(name => {id: value}).distinct
      end
    end
  end
end
