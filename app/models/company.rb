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

  def stripe_customer
    Stripe::Customer.retrieve({
      id: stripe_customer_id,
      expand: %w[invoice_settings.default_payment_method]
    })
  end

  def stripe_customer_id
    return self[:stripe_customer_id] if self[:stripe_customer_id].present?

    customer = Stripe::Customer.create(email: first_account.email, name: name, metadata: {company_id: id})
    update_columns(stripe_customer_id: customer.id) # rubocop:disable Rails/SkipsModelValidations
    customer.id
  end

  def first_account
    company_accounts = Account.where(id: users.pluck(:account_id))
    company_accounts.find(&:team_manager?) || company_accounts.first
  end
end

# == Schema Information
#
# Table name: companies
#
#  id                     :uuid             not null, primary key
#  kind                   :string
#  name                   :string
#  setup_intent_status    :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  industry_id            :bigint
#  sales_person_id        :bigint
#  stripe_customer_id     :string
#  stripe_setup_intent_id :string
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
