# frozen_string_literal: true

module Mutations::Helpers::BlacklistedEmail
  def email_blacklisted?(email)
    return unless BlacklistedDomain.exists?(domain: email.split('@').last)

    raise ApiError::InvalidRequest.new("nonCorporateEmail", "The email #{email} is not allowed")
  end
end
