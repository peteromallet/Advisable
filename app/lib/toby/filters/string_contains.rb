# frozen_string_literal: true

module Toby
  module Filters
    class StringContains
      def self.apply(records, name, contents = [])
        return records if contents.empty?

        records.where("#{name.to_s.underscore} ilike ?", "%#{contents.first}%")
      end
    end
  end
end
