class Company < ApplicationRecord
  belongs_to :sales_person, optional: true
  belongs_to :industry, optional: true
  has_many :users, dependent: :nullify

  # WIP User migration
  has_many :projects, through: :users
  has_many :applications, through: :projects
  has_many :interviews, through: :users
  has_many :consultations, through: :users
  # WIP User migration

  def self.fresh_name_for(company_name)
    return company_name unless exists?(name: company_name)

    n = 2
    n += 1 while exists?(name: "#{company_name} (#{n})")
    "#{company_name} (#{n})"
  end
end

# == Schema Information
#
# Table name: companies
#
#  id              :uuid             not null, primary key
#  kind            :string
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  industry_id     :bigint
#  sales_person_id :bigint
#
# Indexes
#
#  index_companies_on_industry_id      (industry_id)
#  index_companies_on_sales_person_id  (sales_person_id)
#
# Foreign Keys
#
#  fk_rails_...  (industry_id => industries.id)
#  fk_rails_...  (sales_person_id => sales_people.id)
#
