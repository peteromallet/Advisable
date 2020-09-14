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
  include Account
  include Airtable::Syncable
  include Guild::SpecialistsConcern

  belongs_to :country, required: false
  has_many :reviews

  has_many :consultations
  has_many :applications
  has_many :projects, through: :applications
  # Successful applications are applications that are either working or stopped working
  has_many :successful_applications,
           -> { where(status: ['Working', 'Stopped Working']) },
           class_name: 'Application'
  has_many :successful_projects,
           through: :successful_applications, source: :project
  has_many :project_skills, through: :successful_projects, source: :skills

  has_many :previous_projects
  has_many :previous_project_skills,
           through: :previous_projects, source: :skills
  has_many :previous_project_industries,
           through: :previous_projects, source: :industries

  has_many :specialist_skills, dependent: :destroy
  has_many :skills, through: :specialist_skills
  has_many :answers

  # We also have an 'image' column in the specalists table. This is a deprecated
  # column that we used to use to store the avatar from airtable in.
  has_one_attached :avatar

  has_one_attached :resume

  # DEPRECATED IN FAVOUR OF phone column
  attr_encrypted :phone_number, key: [ENV['ENCRYPTION_KEY']].pack('H*')

  validates :number_of_projects,
            inclusion: {in: %w[1-5 5-20 20+ None], message: 'is invalid'},
            allow_nil: true

  register_tutorial 'fixedProjects'
  register_tutorial 'flexibleProjects'

  def name
    "#{first_name} #{last_name}"
  end

  # Override the send_confirmation_email method from the Account module to use
  # a specific email template for specialists.
  def send_confirmation_email
    token = create_confirmation_token
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
