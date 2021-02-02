module Toby
  module Filters
    class StringContains < GraphQL::Types::String
      def self.apply(records, name, value)
        records.where("#{name.to_s.underscore} ilike ?", "%#{value}%")
      end
    end
  end
end
