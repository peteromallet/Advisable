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
# == application_stage values
# [Started] They have started a baseic application process but have not yet
# submitted it.
# [On Hold] Their application has been submitted and they are currently on hold
# until we have a project we think is a good fit for them.
# [Full Application] When a freelancer is 'On Hold' they can do what is called
# a 'full application' and upload and validate 3 previous projects to become
# instantly available to clients on Advisable. This status indicates that
# a freelancer has submitted a full application.
# [Accepted] Their application has been successfull.
#
class Specialist < ApplicationRecord
  include ::Airtable::Syncable
  include Uid
  include SpecialistOrUser
  include Subscriber
  include Resizable
  include ::Airtable::Syncable
  include ::Guild::SpecialistsConcern

  VALID_APPLICATION_STAGES = ["Started", "Submitted", "Invited To Interview", "Interview Scheduled", "Interview Completed", "Full Application", "On Hold", "Completed", "Accepted", "Rejected By Us", "Rejected By Them", "References Requested", "References Provided", "References Validated", "Kicked Off"].freeze
  REJECTED_STAGES = ["Rejected By Us", "Rejected By Them"].freeze

  has_logidze

  belongs_to :country, optional: true
  belongs_to :referrer_rename_me, class_name: "Specialist", foreign_key: :referrer_id, inverse_of: :referred, optional: true

  has_many :reviews, dependent: :destroy
  has_many :consultations, dependent: :destroy
  has_many :applications, dependent: :destroy
  has_many :matches, dependent: :destroy
  has_many :projects, through: :applications
  # Successful applications are applications that are either working or stopped working
  has_many :successful_applications, -> { where(status: ['Working', 'Stopped Working']) }, class_name: 'Application', inverse_of: :specialist
  has_many :successful_projects, through: :successful_applications, source: :project
  has_many :project_skills, through: :successful_projects, source: :skills
  has_many :previous_projects, dependent: :destroy
  has_many :previous_project_skills, through: :previous_projects, source: :skills
  has_many :previous_project_industries, through: :previous_projects, source: :industries
  has_many :specialist_skills, dependent: :destroy
  has_many :skills, through: :specialist_skills
  has_many :specialist_industries, dependent: :destroy
  has_many :industries, through: :specialist_industries
  has_many :answers, dependent: :destroy
  has_many :events, foreign_key: :host_id, inverse_of: :host, dependent: :nullify
  has_many :event_attendees, dependent: :destroy
  has_many :articles, class_name: "CaseStudy::Article", dependent: :destroy
  has_many :referred, class_name: "Specialist", foreign_key: :referrer_id, inverse_of: :referrer_rename_me, dependent: :nullify

  # We also have an 'image' column in the specalists table. This is a deprecated
  # column that we used to use to store the avatar from airtable in.
  has_one_attached :avatar
  has_one_attached :resume
  has_one_attached :cover_photo
  resize avatar: {resize_to_limit: [400, 400]}, cover_photo: {resize_to_limit: [2000, 2000]}

  # DEPRECATED IN FAVOUR OF phone column
  attr_encrypted :phone_number, key: [ENV['ENCRYPTION_KEY']].pack('H*')

  validates :number_of_projects, inclusion: {in: %w[1-5 5-20 20+ None], message: 'is invalid'}, allow_nil: true
  validates :application_stage, inclusion: {in: VALID_APPLICATION_STAGES}, allow_blank: true

  scope :available, -> { where("unavailable_until IS NULL OR unavailable_until <= ?", Time.zone.now) }
  scope :not_rejected, -> { where.not(application_stage: REJECTED_STAGES) }
  scope :accepted, -> { where(application_stage: "Accepted") }

  def send_confirmation_email
    token = account.create_confirmation_token
    SpecialistMailer.confirm(uid: uid, token: token).deliver_later
  end

  # Whether or not the specialist has provided payment information. Returns true
  # if enough payment information has been provided.
  def has_setup_payments # rubocop:disable Naming/PredicateName
    bank_holder_name.present? && bank_holder_address.present? && bank_currency.present?
  end

  def update_project_count
    self.project_count = previous_projects.count
    save(validate: false)
  end

  # Fallback to the airtable image if they have not uploaded an avatar
  def avatar_or_image
    return resized_avatar_url if avatar.attached?

    image.try(:[], 'url')
  end
end

# == Schema Information
#
# Table name: specialists
#
#  id                                :bigint           not null, primary key
#  application_interview_starts_at   :datetime
#  application_stage                 :string
#  average_score                     :decimal(, )
#  bank_currency                     :string
#  bank_holder_address               :jsonb
#  bank_holder_name                  :string
#  bio                               :text
#  campaign_name                     :string
#  campaign_source                   :string
#  city                              :string
#  community_accepted_at             :datetime
#  community_applied_at              :datetime
#  community_invited_to_call_at      :datetime
#  community_score                   :integer
#  community_status                  :string
#  encrypted_phone_number            :string
#  encrypted_phone_number_iv         :string
#  guild                             :boolean          default(FALSE)
#  guild_calendly_link               :string
#  guild_featured_member_at          :datetime
#  guild_joined_date                 :datetime
#  hourly_rate                       :integer
#  ideal_project                     :string
#  image                             :jsonb
#  linkedin                          :string
#  member_of_week_email              :integer
#  number_of_projects                :string
#  phone                             :string
#  pid                               :string
#  previous_work_description         :string
#  previous_work_results             :string
#  primarily_freelance               :boolean
#  project_count                     :integer
#  public_use                        :boolean
#  ratings                           :jsonb
#  referrer                          :string
#  remote                            :boolean
#  reviews_count                     :integer
#  travel_availability               :string
#  uid                               :string
#  unavailable_until                 :date
#  vat_number                        :string
#  website                           :string
#  created_at                        :datetime         not null
#  updated_at                        :datetime         not null
#  account_id                        :bigint
#  airtable_id                       :string
#  application_interview_calendly_id :string
#  country_id                        :bigint
#  referrer_id                       :bigint
#
# Indexes
#
#  index_specialists_on_account_id   (account_id)
#  index_specialists_on_airtable_id  (airtable_id)
#  index_specialists_on_country_id   (country_id)
#  index_specialists_on_referrer_id  (referrer_id)
#  index_specialists_on_uid          (uid)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (referrer_id => specialists.id)
#
