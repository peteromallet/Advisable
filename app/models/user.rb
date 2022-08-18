# frozen_string_literal: true

# A User specifically represents a client looking to hire a freelancer.
# A freelancer account is represented by the Specialist model. Ideally these
# two models will eventually be merged to be different types of users.
class User < ApplicationRecord
  include ::Airtable::Syncable
  include Uid
  include SpecialistOrUser

  TALENT_QUALITY_OPTIONS = %w[cheap budget good top world_class].freeze
  NUMBER_OF_FREELANCERS_OPTIONS = %w[0 1-3 4-10 10+].freeze

  has_logidze

  airtable_class Airtable::ClientContact

  has_many :agreements, dependent: :destroy
  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills
  has_many :sent_articles, class_name: "CaseStudy::SharedArticle", foreign_key: :shared_by_id, inverse_of: :shared_by, dependent: :nullify
  has_many :received_articles, class_name: "CaseStudy::SharedArticle", foreign_key: :shared_with_id, inverse_of: :shared_with, dependent: :destroy

  belongs_to :company, optional: true
  belongs_to :country, optional: true

  scope :active, -> { joins(:account).where(accounts: {disabled_at: nil}) }
  scope :accepted, -> { where(application_status: "Application Accepted") }

  validates :company, presence: {unless: :disabled?}
  validates :rejection_reason, inclusion: {in: %w[cheap_talent not_hiring]}, allow_blank: true
  validates :talent_quality, inclusion: {in: TALENT_QUALITY_OPTIONS}, allow_blank: true
  validates :number_of_freelancers, inclusion: {in: NUMBER_OF_FREELANCERS_OPTIONS}, allow_blank: true

  alias_attribute :application_status, :contact_status

  before_save :update_timestamps, if: :will_save_change_to_application_status?

  def name_with_company
    [account.name, company&.name.presence].compact.join(" from ")
  end

  def availability
    Sentry.capture_message("Reading availability on User! Stop it!", level: "debug")
    account.availability
  end

  def accepted?
    application_status == "Application Accepted"
  end

  def disabled?
    application_status == "Disabled"
  end

  def disable!(responsible_id = nil)
    self.application_status = "Disabled"
    account.disable!
    save_and_sync_with_responsible!(responsible_id)
  end

  def send_confirmation_email
    token = account.create_confirmation_token
    UserMailer.confirm(uid:, token:).deliver_later
  end

  def invite_comember!(account, responsible: nil)
    user = User.new(account:, company_id:, application_status: "Application Accepted")
    responsible = account_id if responsible.nil?
    Logidze.with_responsible(responsible) do
      user.save!
    end
    user.sync_to_airtable
    user
  end

  # rubocop:disable Rails/SkipsModelValidations
  def transfer_to_company!(company, destroy: false)
    ActiveRecord::Base.transaction do
      old_company_id = company_id
      raise "What are you even doing?" if old_company_id == company.id

      update_columns(company_id: company.id)
      account.update_columns(permissions: account.permissions + ["team_manager"]) unless account.team_manager?
      Company.find(old_company_id).destroy! if destroy && old_company_id
    end
  end
  # rubocop:enable Rails/SkipsModelValidations

  def time_zone
    Sentry.capture_message("Accessing time_zone on user instead of Account!", level: "debug")
    account.timezone
  end

  def time_zone=(time_zone)
    Sentry.capture_message("Setting time_zone on user instead of Account!", level: "debug")
    account.update(timezone: time_zone)
  end

  private

  def update_timestamps
    column = "#{application_status&.downcase&.gsub(/\s/, "_")}_at="
    return unless respond_to?(column)

    public_send(column, Time.current)
  end
end

# == Schema Information
#
# Table name: users
#
#  id                                :bigint           not null, primary key
#  accepted_guarantee_terms_at       :datetime
#  application_accepted_at           :datetime
#  application_interview_starts_at   :datetime
#  application_rejected_at           :datetime
#  application_reminder_at           :datetime
#  campaign_content                  :string
#  campaign_medium                   :string
#  campaign_name                     :string
#  campaign_source                   :string
#  contact_status                    :string
#  exceptional_project_payment_terms :string
#  fid                               :string
#  gclid                             :string
#  invited_to_interview_at           :datetime
#  locality_importance               :integer
#  number_of_freelancers             :string
#  pid                               :string
#  rejection_reason                  :string
#  rid                               :string
#  setup_intent_status               :string
#  submitted_at                      :datetime
#  talent_quality                    :string
#  title                             :string
#  trustpilot_review_status          :string
#  uid                               :string           not null
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
#  index_users_on_account_id   (account_id) UNIQUE
#  index_users_on_airtable_id  (airtable_id)
#  index_users_on_company_id   (company_id)
#  index_users_on_country_id   (country_id)
#  index_users_on_uid          (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (country_id => countries.id)
#
