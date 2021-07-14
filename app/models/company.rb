# frozen_string_literal: true

class Company < ApplicationRecord
  has_logidze

  BUSINESS_TYPES = %w[B2B B2C].freeze
  DEFAULT_ADMIN_FEE = 500

  belongs_to :sales_person, optional: true
  belongs_to :industry, optional: true
  has_many :payments, dependent: :nullify
  has_many :users, dependent: :nullify
  has_many :accounts, through: :users

  # WIP Company migration 👇️
  has_many :projects, through: :users
  has_many :interviews, through: :users
  has_many :consultations, through: :users
  has_many :applications, through: :projects
  # WIP Company migration 👆️

  validates :business_type, inclusion: {in: BUSINESS_TYPES}, allow_nil: true

  attribute :address, AddressAttribute::Type.new

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

  def update_payments_setup
    setup = are_payments_setup
    update(payments_setup: setup)
    setup
  end

  def goals
    super || []
  end

  def payment_method
    stripe_payment_method.present? || stripe_customer.invoice_settings.default_payment_method
  end

  def invoice_settings
    {
      name: invoice_name,
      company_name: invoice_company_name,
      billing_email: billing_email,
      vat_number: vat_number,
      address: address
    }
  end

  # admin_fee value is stored in basis points integers: 5% -> 500 bp
  def admin_fee_percentage
    (admin_fee.presence || DEFAULT_ADMIN_FEE) / BigDecimal("10000")
  end

  private

  def are_payments_setup
    return false if project_payment_method != 'Bank Transfer' && payment_method.nil?
    return false if invoice_settings[:name].nil?
    return false if accepted_project_payment_terms_at.nil?

    true
  end
end

# == Schema Information
#
# Table name: companies
#
#  id                                :uuid             not null, primary key
#  accepted_project_payment_terms_at :datetime
#  address                           :jsonb
#  admin_fee                         :integer
#  bank_transfers_enabled            :boolean          default(FALSE)
#  billing_email                     :string
#  budget                            :bigint
#  business_type                     :string
#  feedback                          :boolean
#  goals                             :jsonb
#  invoice_company_name              :string
#  invoice_name                      :string
#  kind                              :string
#  marketing_attitude                :string
#  name                              :string
#  payments_setup                    :boolean          default(FALSE)
#  project_payment_method            :string
#  setup_intent_status               :string
#  stripe_payment_method             :string
#  vat_number                        :string
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#  industry_id                       :bigint
#  sales_person_id                   :bigint
#  stripe_customer_id                :string
#  stripe_setup_intent_id            :string
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
