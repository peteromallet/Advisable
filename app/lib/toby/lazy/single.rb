# frozen_string_literal: true

module Toby
  module Lazy
    class Single < Multiple
      def record
        records.first
      end
    end
  end
end
