# A User specifically represents a client looking to hire a freelancer.
# A freelancer account is represented by the Specialist model. Ideally these
# two models will eventually be merged to be different types of users.
class User < ApplicationRecord
  include Uid
  include SpecialistOrUser
  include StatusMap
  include Airtable::Syncable
  airtable_class Airtable::ClientContact
  has_many :projects, dependent: :destroy
  has_many :interviews, dependent: :destroy
  has_many :applications, through: :projects
  has_many :consultations, dependent: :destroy
  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills
  has_many :client_calls, dependent: :destroy
  has_one :client_user, dependent: :destroy
  has_one :client, through: :client_user
  belongs_to :sales_person, optional: true
  belongs_to :industry, optional: true
  belongs_to :country, optional: true

  serialize :available_payment_methods, Array

  before_save :remove_past_availabililty

  attribute :availability, :datetime, default: [], array: true
  attribute :address, AddressAttribute::Type.new

  has_one_attached :avatar

  validates :rejection_reason,
            inclusion: {in: %w[cheap_talent not_hiring]}, allow_nil: true

  # talent_quality indicates what qualit of talent the client is looking for.
  # This value is provided when they are applying.
  TALENT_QUALITY_OPTIONS = %w[cheap budget good top world_class]
  validates :talent_quality,
            inclusion: {in: TALENT_QUALITY_OPTIONS}, allow_nil: true

  # number_of_freelancers represents the number of freelancers the client is
  # looking to hire over the next 6 months. This value is provided when they are
  # applying to Advisable.
  NUMBER_OF_FREELANCERS_OPTIONS = %w[0 1-3 4-10 10+]
  validates :number_of_freelancers,
            inclusion: {in: NUMBER_OF_FREELANCERS_OPTIONS}, allow_nil: true

  register_tutorial 'fixedProjects'
  register_tutorial 'flexibleProjects'
  # The recommenations tutorial is used to show the recommendations product
  # walkthrough.
  register_tutorial 'RECOMMENDATIONS'

  alias_attribute :application_status, :contact_status
  map_status application_status: {
               started: 'Application Started',
               accepted: 'Application Accepted',
               rejected: 'Application Rejected',
               remind: 'Requested Reminder'
             }

  def invoice_settings
    {
      name: invoice_name,
      company_name: invoice_company_name,
      billing_email: billing_email,
      vat_number: account.vat_number,
      address: address
    }
  end

  def stripe_customer_id
    return self[:stripe_customer_id] if self[:stripe_customer_id]
    customer = Stripe::Customer.create(email: account.email, name: company_name, metadata: {user_id: uid})
    update_columns(stripe_customer_id: customer.id) # rubocop:disable Rails/SkipsModelValidations
    customer.id
  end

  def stripe_customer
    Stripe::Customer.retrieve(
      {
        id: stripe_customer_id,
        expand: %w[invoice_settings.default_payment_method]
      }
    )
  end

  # company name is both a column on the users table and an attribute of the
  # users associated "client" record. We are leaning towards deprecating the
  # user "company_name" column and so this method provide a bridge between
  # the two where it will first check for the client record and then fall back
  # to the company_name column
  def company_name
    return client.name if client.present?
    self[:company_name]
  end

  def payment_method
    stripe_customer.invoice_settings.default_payment_method
  end

  # Updates the payments_setup column to either true or false depending on
  # wether enough payment information has been provided.
  def update_payments_setup
    setup = are_payments_setup
    update(payments_setup: setup)
    setup
  end

  private

  def are_payments_setup
    return false if project_payment_method.nil?
    return false if project_payment_method == 'Card' && payment_method.nil?
    return false if invoice_settings[:name].nil?
    return false if accepted_project_payment_terms_at.nil?
    true
  end

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    return if availability.nil?
    self.availability = availability.select { |time| time > Time.zone.now }
  end
end

# == Schema Information
#
# Table name: users
#
#  id                                :bigint           not null, primary key
#  accepted_guarantee_terms_at       :datetime
#  accepted_project_payment_terms_at :datetime
#  address                           :jsonb
#  application_accepted_at           :datetime
#  application_rejected_at           :datetime
#  application_reminder_at           :datetime
#  availability                      :text
#  bank_transfers_enabled            :boolean          default(FALSE)
#  billing_email                     :string
#  budget                            :bigint
#  campaign_medium                   :string
#  campaign_name                     :string
#  campaign_source                   :string
#  company_name                      :string
#  company_type                      :string
#  completed_tutorials               :text             default([]), is an Array
#  confirmation_digest               :string
#  confirmation_token                :string
#  confirmed_at                      :datetime
#  contact_status                    :string
#  email                             :string
#  exceptional_project_payment_terms :string
#  fid                               :string
#  first_name                        :string
#  gclid                             :string
#  invoice_company_name              :string
#  invoice_name                      :string
#  last_name                         :string
#  locality_importance               :integer
#  number_of_freelancers             :string
#  password_digest                   :string
#  payments_setup                    :boolean          default(FALSE)
#  permissions                       :text             default([]), is an Array
#  pid                               :string
#  project_payment_method            :string
#  rejection_reason                  :string
#  remember_token                    :string
#  reset_digest                      :string
#  reset_sent_at                     :datetime
#  rid                               :string
#  setup_intent_status               :string
#  talent_quality                    :string
#  test_account                      :boolean
#  time_zone                         :string
#  title                             :string
#  uid                               :string
#  vat_number                        :string
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#  account_id                        :bigint
#  airtable_id                       :string
#  country_id                        :bigint
#  industry_id                       :bigint
#  sales_person_id                   :bigint
#  stripe_customer_id                :string
#  stripe_setup_intent_id            :string
#
# Indexes
#
#  index_users_on_account_id       (account_id)
#  index_users_on_airtable_id      (airtable_id)
#  index_users_on_country_id       (country_id)
#  index_users_on_industry_id      (industry_id)
#  index_users_on_sales_person_id  (sales_person_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (industry_id => industries.id)
#  fk_rails_...  (sales_person_id => sales_people.id)
#
