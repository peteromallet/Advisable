class BlacklistedDomain < ApplicationRecord
  def self.email_allowed?(email)
    domain = email.split('@').last
    return false if BlacklistedDomain.exists?(domain: domain)
    true
  end
end
