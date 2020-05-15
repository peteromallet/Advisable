class BlacklistedDomain < ApplicationRecord
  def self.email_allowed?(email)
    domain = email.split('@').last
    return BlacklistedDomain.where(domain: domain).any?
  end
end
