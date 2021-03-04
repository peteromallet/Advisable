# frozen_string_literal: true

module Toby
  module Filters
    class CheckNil
      def self.apply(records, attribute, **_opts)
        records.where(attribute.name => nil)
      end
    end
  end
end
