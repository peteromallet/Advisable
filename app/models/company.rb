# frozen_string_literal: true

class Company < ApplicationRecord
  PROJECT_PAYMENT_METHODS = ["Bank Transfer", "Card"].freeze

  has_logidze

  BUSINESS_TYPES = %w[B2B B2C].freeze
  DEFAULT_ADMIN_FEE = 500

  belongs_to :sales_person, optional: true
  belongs_to :industry, optional: true
  has_many :agreements, dependent: :destroy
  has_many :payments, dependent: :nullify
  has_many :users, dependent: :nullify
  has_many :accounts, through: :users
  has_many :invoices, dependent: :destroy

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

  def billing_email
    super.presence || @billing_email ||= users.joins(:account).merge(Account.with_permission("team_manager")).first&.email
  end

  # admin_fee value is stored in basis points integers: 5% -> 500 bp
  def admin_fee_percentage
    (admin_fee.presence || DEFAULT_ADMIN_FEE) / BigDecimal("10000")
  end

  # Needed purely for Toby - remove once we support JSONB there
  def billing_address
    address.comma_separated
  end

  private

  def are_payments_setup
    return false if project_payment_method != "Bank Transfer" && payment_method.nil?
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
#  name                              :string
#  kind                              :string
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#  sales_person_id                   :integer
#  industry_id                       :integer
#  stripe_customer_id                :string
#  stripe_setup_intent_id            :string
#  setup_intent_status               :string
#  payments_setup                    :boolean          default("false")
#  project_payment_method            :string
#  accepted_project_payment_terms_at :datetime
#  invoice_name                      :string
#  invoice_company_name              :string
#  billing_email                     :string
#  vat_number                        :string
#  address                           :jsonb
#  goals                             :jsonb
#  feedback                          :boolean
#  business_type                     :string
#  budget                            :integer
#  admin_fee                         :integer
#  stripe_payment_method             :string
#  specialist_description            :string
#
# Indexes
#
#  index_companies_on_industry_id      (industry_id)
#  index_companies_on_sales_person_id  (sales_person_id)
#
