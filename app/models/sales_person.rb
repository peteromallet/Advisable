class SalesPerson < ApplicationRecord
  self.table_name = 'sales_people'

  has_many :users
end
