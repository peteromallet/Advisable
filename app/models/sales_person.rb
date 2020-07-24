class SalesPerson < ApplicationRecord
  has_many :users

  def name
    "#{first_name} #{last_name}"
  end
end
