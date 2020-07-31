class SalesPerson < ApplicationRecord
  has_many :users
  has_one_attached :image

  def name
    "#{first_name} #{last_name}"
  end
end
