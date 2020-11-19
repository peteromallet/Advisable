class Company < ApplicationRecord
  has_many :users, dependent: :nullify
  belongs_to :sales_person, optional: true
  belongs_to :industry, optional: true

  def self.fresh_company_name_for(user)
    return user.company_name unless exists?(name: user.company_name)

    n = 2
    n += 1 while exists?(name: "#{user.company_name} (#{n})")
    "#{user.company_name} (#{n})"
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
