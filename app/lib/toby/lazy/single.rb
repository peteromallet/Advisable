# frozen_string_literal: true

module Toby
  module Lazy
    class Single < Base
      def resolve
        records.first
      end
    end
  end
end
