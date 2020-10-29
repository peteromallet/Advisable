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
  include Uid
  include SpecialistOrUser
  include Airtable::Syncable
  include Guild::SpecialistsConcern

  belongs_to :country, optional: true

  has_many :reviews, dependent: :destroy
  has_many :consultations, dependent: :destroy
  has_many :applications, dependent: :destroy
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
  has_many :answers, dependent: :destroy

  # We also have an 'image' column in the specalists table. This is a deprecated
  # column that we used to use to store the avatar from airtable in.
  has_one_attached :avatar

  has_one_attached :resume

  has_one_attached :cover_photo

  # DEPRECATED IN FAVOUR OF phone column
  attr_encrypted :phone_number, key: [ENV['ENCRYPTION_KEY']].pack('H*')

  validates :number_of_projects,
            inclusion: {in: %w[1-5 5-20 20+ None], message: 'is invalid'},
            allow_nil: true

  register_tutorial 'fixedProjects'
  register_tutorial 'flexibleProjects'

  def send_confirmation_email
    token = account.create_confirmation_token
    SpecialistMailer.confirm(uid: uid, token: token).deliver_later
  end

  # Wether or not the specialist has provided payment information. Returns true
  # if enough payment information has been provided.
  def has_setup_payments
    return false if bank_holder_name.blank?
    return false if bank_holder_address.blank?
    return false if bank_currency.blank?
    true
  end

  def update_project_count
    self.project_count = previous_projects.count
    save(validate: false)
  end
end

# == Schema Information
#
# Table name: specialists
#
#  id                                 :bigint           not null, primary key
#  application_stage                  :string
#  automated_invitations_subscription :boolean
#  average_score                      :decimal(, )
#  bank_currency                      :string
#  bank_holder_address                :jsonb
#  bank_holder_name                   :string
#  bio                                :text
#  campaign_name                      :string
#  campaign_source                    :string
#  city                               :string
#  community_accepted_at              :datetime
#  community_applied_at               :datetime
#  community_invited_to_call_at       :datetime
#  community_score                    :integer
#  community_status                   :string
#  completed_tutorials                :text             default([]), is an Array
#  confirmation_digest                :string
#  confirmation_token                 :string
#  confirmed_at                       :datetime
#  email                              :string
#  encrypted_phone_number             :string
#  encrypted_phone_number_iv          :string
#  first_name                         :string
#  guild                              :boolean          default(FALSE)
#  guild_data                         :jsonb
#  hourly_rate                        :integer
#  image                              :jsonb
#  last_name                          :string
#  linkedin                           :string
#  member_of_week_email               :integer
#  number_of_projects                 :string
#  password_digest                    :string
#  permissions                        :text             default([]), is an Array
#  phone                              :string
#  pid                                :string
#  primarily_freelance                :boolean
#  project_count                      :integer
#  public_use                         :boolean
#  ratings                            :jsonb
#  referrer                           :string
#  remember_token                     :string
#  remote                             :boolean
#  reset_digest                       :string
#  reset_sent_at                      :datetime
#  reviews_count                      :integer
#  test_account                       :boolean
#  travel_availability                :string
#  uid                                :string
#  vat_number                         :string
#  website                            :string
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  account_id                         :bigint
#  airtable_id                        :string
#  country_id                         :bigint
#
# Indexes
#
#  index_specialists_on_account_id  (account_id)
#  index_specialists_on_country_id  (country_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (country_id => countries.id)
#
