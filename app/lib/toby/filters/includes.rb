# frozen_string_literal: true

module Toby
  module Filters
    class Includes
      def self.apply(records, attribute, value: [], **_opts)
        return records if value.empty?

        records.joins(attribute.name).where(attribute.name => {attribute.via => value}).distinct
      end
    end
  end
end
