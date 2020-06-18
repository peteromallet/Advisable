class SalesPerson < ApplicationRecord
  self.table_name = 'sales_people'

  has_many :users

  def name
    "#{first_name} #{last_name}"
  end
end
