# frozen_string_literal: true

class BlacklistedDomain < ApplicationRecord
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
