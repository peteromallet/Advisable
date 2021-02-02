module Toby
  module Filters
    class OneOf < GraphQL::Types::String
      def self.apply(records, name, value)
        records.where({name.to_s.underscore => value})
      end
    end
  end
end
