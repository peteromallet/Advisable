class BlacklistedDomain < ApplicationRecord
  def self.email_allowed?(email)
    domain = email.split('@').last
    return false if BlacklistedDomain.exists?(domain: domain)
    true
  end
end

# == Schema Information
#
# Table name: blacklisted_domains
#
#  id         :bigint           not null, primary key
#  domain     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
