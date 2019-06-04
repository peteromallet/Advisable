class Specialist < ApplicationRecord
  include UID
  include Account
  include Airtable::Syncable
  belongs_to :country, required: false
  has_many :reviews

  has_many :applications
  has_many :successful_applications, -> {
    joins(:bookings).where(bookings: { status: ["Complete", "Accepted"] })
  }, class_name: "Application"

  has_many :projects, through: :applications
  has_many :successful_projects, through: :successful_applications, source: :project

  has_many :specialist_skills
  has_many :off_platform_projects
  has_many :skills, through: :specialist_skills
  attr_encrypted :phone_number, key: [ENV["ENCRYPTION_KEY"]].pack("H*")

  register_tutorial "fixedProjects"
  register_tutorial "flexibleProjects"

  def name
    "#{first_name} #{last_name}"
  end
end