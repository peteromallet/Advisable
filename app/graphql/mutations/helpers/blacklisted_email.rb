# frozen_string_literal: true

module Mutations::Helpers::BlacklistedEmail
  def email_blacklisted?(email)
    return unless BlacklistedDomain.exists?(domain: email.split('@').last)

    ApiError.invalid_request("nonCorporateEmail", "The email #{email} is not allowed")
  end
end
