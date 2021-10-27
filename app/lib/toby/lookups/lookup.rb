# frozen_string_literal: true

module Toby
  module Lookups
    module Lookup
      extend ActiveSupport::Concern

      def readonly
        true
      end

      class_methods do
        def lookup?
          true
        end
      end
    end
  end
end
