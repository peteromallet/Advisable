# frozen_string_literal: true

module Toby
  module Filters
    class StringContains
      def self.apply(records, name, value)
        records.where("#{name.to_s.underscore} ilike ?", "%#{value}%")
      end
    end
  end
end
