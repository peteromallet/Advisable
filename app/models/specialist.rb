# frozen_string_literal: true

# A Specialist specifically represents a specialist account. A client account is
# represented by the User model. Ideally these two models will eventually be
# merged to be different types of users.
#
# A specialist first applys to Advisable before they get an account. This
# application is also tracked in the specialist record. A specialist is
# considered an "account" once a password is set. The status of a specialists
# application is stored in the application_stage column.
#
class Specialist < ApplicationRecord
  self.ignored_columns = %w[phone encrypted_phone_number encrypted_phone_number_iv]
  include ::Airtable::Syncable
  include Uid
  include SpecialistOrUser
  include Subscriber
  include Resizable
  include ::Airtable::Syncable
  include ::Guild::SpecialistsConcern

  VALID_APPLICATION_STAGES = ["Started", "Submitted", "Invited To Interview", "Interview Scheduled", "Interview Completed", "Full Application", "On Hold", "Completed", "Accepted", "Rejected By Us", "Rejected By Them", "References Requested", "References Provided", "References Validated", "Kicked Off"].freeze
  REJECTED_STAGES = ["Rejected By Us", "Rejected By Them"].freeze
  DEFAULT_SOURCING_FEE = 800

  has_logidze

  belongs_to :country, optional: true
  belongs_to :referrer, class_name: "Specialist", inverse_of: :referred, optional: true
  belongs_to :interviewer, optional: true, class_name: "SalesPerson"

  has_many :payments, dependent: :nullify
  has_many :payouts, dependent: :nullify
  has_many :reviews, dependent: :destroy
  has_many :consultations, dependent: :destroy
  has_many :applications, dependent: :destroy
  has_many :agreements, dependent: :destroy
  has_many :matches, dependent: :destroy
  has_many :projects, through: :applications
  # Successful applications are applications that are either working or stopped working
  has_many :successful_applications, -> { where(status: ["Working", "Stopped Working"]) }, class_name: "Application", inverse_of: :specialist, dependent: :destroy
  has_many :successful_projects, through: :successful_applications, source: :project
  has_many :project_skills, through: :successful_projects, source: :skills
  has_many :specialist_skills, dependent: :destroy
  has_many :skills, through: :specialist_skills
  has_many :specialist_industries, dependent: :destroy
  has_many :industries, through: :specialist_industries
  has_many :answers, dependent: :destroy
  has_many :events, foreign_key: :host_id, inverse_of: :host, dependent: :nullify
  has_many :event_attendees, dependent: :destroy
  has_many :articles, class_name: "CaseStudy::Article", dependent: :destroy
  has_many :referred, class_name: "Specialist", foreign_key: :referrer_id, inverse_of: :referrer, dependent: :nullify

  has_many :article_skills, through: :articles, class_name: "CaseStudy::Skill", source: :skills
  has_many :case_study_skills, through: :article_skills, source: :skill

  # We also have an 'image' column in the specalists table. This is a deprecated
  # column that we used to use to store the avatar from airtable in.
  has_one_attached :resume
  has_one_attached :cover_photo
  resize cover_photo: {resize_to_limit: [2000, 2000]}

  validates :number_of_projects, inclusion: {in: %w[1-5 5-20 20+ None], message: "is invalid"}, allow_nil: true
  validates :application_stage, inclusion: {in: VALID_APPLICATION_STAGES}, allow_blank: true
  validates :username, uniqueness: true, allow_blank: true
  validate :valid_username

  scope :available, -> { where("unavailable_until IS NULL OR unavailable_until <= ?", Time.zone.now) }
  scope :not_rejected, -> { where.not(application_stage: REJECTED_STAGES) }
  scope :accepted, -> { where(application_stage: "Accepted") }

  before_save :update_timestamps, if: :will_save_change_to_application_stage?

  def accepted?
    application_stage == "Accepted"
  end

  def username_or_uid
    username || uid
  end

  def profile_path
    "/profile/#{username_or_uid}"
  end

  def send_confirmation_email
    token = account.create_confirmation_token
    SpecialistMailer.confirm(uid: uid, token: token).deliver_later
  end

  # Whether or not the specialist has provided payment information. Returns true
  # if enough payment information has been provided.
  def has_setup_payments # rubocop:disable Naming/PredicateName
    bank_holder_name.present? && bank_holder_address.present? && bank_currency.present?
  end

  # sourcing_fee value is stored in basis points integers: 8% -> 800 bp
  def sourcing_fee_percentage
    (sourcing_fee.presence || DEFAULT_SOURCING_FEE) / BigDecimal("10000")
  end

  def self.find_by_username_or_id(username)
    if ::Specialist.valid_uid?(username)
      ::Specialist.find_by(uid: username)
    elsif ::Specialist.airtable_id?(username)
      ::Specialist.deprecated_find_by_airtable_id(username)
    else
      ::Specialist.find_by(username: username)
    end
  end

  def self.find_by_username_or_id!(username)
    find_by_username_or_id(username) || raise(ActiveRecord::RecordNotFound)
  end

  private

  def valid_username
    return if username.blank?

    errors.add(:username, "must be longer than 3 characters") if username.length < 3
    errors.add(:username, "must be alphanumeric") if /\W/.match?(username)
  end

  def update_timestamps
    column = "#{application_stage&.downcase&.gsub(/\s/, "_")}_at="
    return unless respond_to?(column)

    public_send(column, Time.current)
  end
end

# == Schema Information
#
# Table name: specialists
#
#  id                                :integer          not null, primary key
#  image                             :jsonb
#  linkedin                          :string
#  travel_availability               :string
#  city                              :string
#  country_id                        :integer
#  airtable_id                       :string
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#  ratings                           :jsonb            default("{}")
#  reviews_count                     :integer
#  bio                               :text
#  uid                               :string           not null
#  remote                            :boolean
#  application_stage                 :string
#  bank_holder_name                  :string
#  bank_holder_address               :jsonb            default("{}")
#  bank_currency                     :string
#  primarily_freelance               :boolean
#  number_of_projects                :string
#  hourly_rate                       :integer
#  website                           :string
#  public_use                        :boolean
#  pid                               :string
#  campaign_name                     :string
#  campaign_source                   :string
#  average_score                     :decimal(, )
#  project_count                     :integer
#  guild                             :boolean          default("false")
#  community_status                  :string
#  account_id                        :integer
#  community_applied_at              :datetime
#  community_accepted_at             :datetime
#  community_invited_to_call_at      :datetime
#  community_score                   :integer
#  member_of_week_email              :integer
#  unavailable_until                 :date
#  previous_work_description         :string
#  previous_work_results             :string
#  ideal_project                     :string
#  vat_number                        :string
#  application_interview_calendly_id :string
#  application_interview_starts_at   :datetime
#  iban                              :string
#  guild_joined_date                 :datetime
#  guild_featured_member_at          :datetime
#  guild_calendly_link               :string
#  referrer_id                       :integer
#  sourcing_fee                      :integer
#  interviewer_id                    :integer
#  case_study_status                 :string
#  trustpilot_review_status          :string
#  campaign_medium                   :string
#  application_status                :string
#  twitter                           :string
#  instagram                         :string
#  medium                            :string
#  username                          :citext
#  submitted_at                      :datetime
#  invited_to_interview_at           :datetime
#  interview_completed_at            :datetime
#  accepted_at                       :datetime
#
# Indexes
#
#  index_specialists_on_account_id      (account_id) UNIQUE
#  index_specialists_on_airtable_id     (airtable_id)
#  index_specialists_on_country_id      (country_id)
#  index_specialists_on_interviewer_id  (interviewer_id)
#  index_specialists_on_referrer_id     (referrer_id)
#  index_specialists_on_uid             (uid) UNIQUE
#  index_specialists_on_username        (username) UNIQUE
#
