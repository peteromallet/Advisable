class Specialist < ApplicationRecord
  include Uid
  include Account
  include Airtable::Syncable
  belongs_to :country, required: false
  has_many :reviews

  has_many :applications
  has_many :projects, through: :applications
  # Successful applications are applications that are either working or stopped working
  has_many :successful_applications, -> { where(status: ["Working", "Stopped Working"])}, class_name: "Application"
  has_many :successful_projects, through: :successful_applications, source: :project
  has_many :project_skills, through: :successful_projects, source: :skills

  has_many :off_platform_projects
  has_many :off_platform_project_skills, through: :off_platform_projects, source: :skills
  
  has_many :specialist_skills, dependent: :destroy
  has_many :skills, through: :specialist_skills

  has_one_attached :avatar
  has_one_attached :resume

  attr_encrypted :phone_number, key: [ENV['ENCRYPTION_KEY']].pack('H*')

  validates :number_of_projects,
            inclusion: { in: %w[1-5 5-20 20+ None], message: 'is invalid' },
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
    self.project_count = PreviousProject.for_specialist(self).count
    save(validate: false)
  end
end
