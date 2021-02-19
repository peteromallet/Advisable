# frozen_string_literal: true

module Toby
  module Filters
    class StringContains
      def self.apply(records, name, value = [])
        return records if value.empty?

        records.where("#{name.to_s.underscore} ilike ?", "%#{value.first}%")
      end
    end
  end
end
