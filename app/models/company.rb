class Company < ApplicationRecord
end

# == Schema Information
#
# Table name: companies
#
#  id         :uuid             not null, primary key
#  kind       :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
