# frozen_string_literal: true

# A User specifically represents a client looking to hire a freelancer.
# A freelancer account is represented by the Specialist model. Ideally these
# two models will eventually be merged to be different types of users.
class User < ApplicationRecord
  include Uid
  include SpecialistOrUser
  include Airtable::Syncable

  self.ignored_columns = %i[sales_person_id invoice_name invoice_company_name billing_email address payments_setup project_payment_method accepted_project_payment_terms_at industry_id company_type]

  # WIP Company migration 👇️
  %i[stripe_customer_id stripe_customer invoice_name invoice_company_name billing_email address payments_setup project_payment_method accepted_project_payment_terms_at invoice_settings industry sales_person].each do |method|
    define_method(method) do
      Raven.capture_message("Method ##{method} called on User that was meant for Company", backtrace: caller, level: 'debug')
      company.public_send(method)
    end
  end

  def company_type
    Raven.capture_message("Method #company_type called on User that was meant for Company", backtrace: caller, level: 'debug')

    company.kind
  end
  # WIP Company migration 👆️

  has_logidze

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

  belongs_to :company
  belongs_to :country, optional: true

  serialize :available_payment_methods, Array

  before_save :remove_past_availabililty

  attribute :availability, :datetime, default: [], array: true

  has_one_attached :avatar

  validates :rejection_reason,
            inclusion: {in: %w[cheap_talent not_hiring]}, allow_nil: true

  # talent_quality indicates what qualit of talent the client is looking for.
  # This value is provided when they are applying.
  TALENT_QUALITY_OPTIONS = %w[cheap budget good top world_class].freeze
  validates :talent_quality,
            inclusion: {in: TALENT_QUALITY_OPTIONS}, allow_nil: true

  # number_of_freelancers represents the number of freelancers the client is
  # looking to hire over the next 6 months. This value is provided when they are
  # applying to Advisable.
  NUMBER_OF_FREELANCERS_OPTIONS = %w[0 1-3 4-10 10+].freeze
  validates :number_of_freelancers,
            inclusion: {in: NUMBER_OF_FREELANCERS_OPTIONS}, allow_nil: true

  register_tutorial 'fixedProjects'
  register_tutorial 'flexibleProjects'
  # The recommenations tutorial is used to show the recommendations product
  # walkthrough.
  register_tutorial 'RECOMMENDATIONS'

  alias_attribute :application_status, :contact_status

  # company name is both a column on the users table and an attribute of the
  # users associated "client" record. We are leaning towards deprecating the
  # user "company_name" column and so this method provide a bridge between
  # the two where it will first check for the client record and then fall back
  # to the company_name column
  def company_name
    return client.name if client.present?

    self[:company_name]
  end

  def send_confirmation_email
    token = account.create_confirmation_token
    UserMailer.confirm(uid: uid, token: token).deliver_later
  end

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    return if availability.nil?

    self.availability = availability.select { |time| time > Time.zone.now }
  end

  def invite_comember!(account)
    user = User.new(
      account: account,
      company_id: company_id,
      company_name: company_name,
      application_status: "Active"
    )
    user.save_and_sync_with_responsible!(account_id)
    user
  end
end

# == Schema Information
#
# Table name: users
#
#  id                                :bigint           not null, primary key
#  accepted_guarantee_terms_at       :datetime
#  application_accepted_at           :datetime
#  application_rejected_at           :datetime
#  application_reminder_at           :datetime
#  availability                      :text
#  bank_transfers_enabled            :boolean          default(FALSE)
#  budget                            :bigint
#  campaign_medium                   :string
#  campaign_name                     :string
#  campaign_source                   :string
#  company_name                      :string
#  contact_status                    :string
#  exceptional_project_payment_terms :string
#  fid                               :string
#  gclid                             :string
#  locality_importance               :integer
#  number_of_freelancers             :string
#  pid                               :string
#  rejection_reason                  :string
#  rid                               :string
#  setup_intent_status               :string
#  talent_quality                    :string
#  time_zone                         :string
#  title                             :string
#  uid                               :string
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#  account_id                        :bigint
#  airtable_id                       :string
#  company_id                        :uuid
#  country_id                        :bigint
#  stripe_customer_id                :string
#  stripe_setup_intent_id            :string
#
# Indexes
#
#  index_users_on_account_id       (account_id)
#  index_users_on_airtable_id      (airtable_id)
#  index_users_on_company_id       (company_id)
#  index_users_on_country_id       (country_id)
#  index_users_on_industry_id      (industry_id)
#  index_users_on_sales_person_id  (sales_person_id)
#  index_users_on_uid              (uid)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (industry_id => industries.id)
#  fk_rails_...  (sales_person_id => sales_people.id)
#
