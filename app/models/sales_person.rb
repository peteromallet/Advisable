class SalesPerson < ApplicationRecord
  include Uid
  include Airtable::Syncable
  has_many :users
  has_one_attached :image

  def name
    "#{first_name} #{last_name}"
  end

  def email_with_name
    %("#{name}" <#{email}>)
  end
end

# == Schema Information
#
# Table name: sales_people
#
#  id            :bigint           not null, primary key
#  active        :boolean
#  calendly_url  :string
#  email         :string
#  first_name    :string
#  last_name     :string
#  out_of_office :boolean
#  slack         :string
#  username      :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  airtable_id   :string
#  asana_id      :string
#
