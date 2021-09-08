# frozen_string_literal: true

module Toby
  module Helpers
    module Uuid
      def valid_uuid?(string)
        /\A[\da-f]{32}\z/i.match?(string) ||
          /\A(urn:uuid:)?[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}\z/i.match?(string)
      end
    end
  end
end
