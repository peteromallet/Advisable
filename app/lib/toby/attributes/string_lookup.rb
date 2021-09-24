# frozen_string_literal: true

module Toby
  module Attributes
    class StringLookup < String
      def self.lookup?
        true
      end

      def readonly
        true
      end
    end
  end
end
