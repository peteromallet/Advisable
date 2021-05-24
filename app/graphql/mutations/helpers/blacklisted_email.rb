# frozen_string_literal: true

module Mutations
  module Helpers
    module BlacklistedEmail
      def email_blacklisted?(email)
        return unless BlacklistedDomain.exists?(domain: email.split('@').last)

        ApiError.invalid_request("NON_CORPORATE_EMAIL", "The email #{email} is not allowed")
      end
    end
  end
end
