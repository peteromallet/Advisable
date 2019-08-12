class Specialist < ApplicationRecord
  include UID
  include Account
  include Airtable::Syncable
  belongs_to :country, required: false
  has_many :reviews

  has_many :applications
  has_many :projects, through: :applications

  has_many :specialist_skills
  has_many :off_platform_projects
  has_many :skills, through: :specialist_skills
  attr_encrypted :phone_number, key: [ENV["ENCRYPTION_KEY"]].pack("H*")

  register_tutorial "fixedProjects"
  register_tutorial "flexibleProjects"

  def name
    "#{first_name} #{last_name}"
  end

  # Wether or not the specialist has provided payment information. Returns true
  # if enough payment information has been provided.
  def has_setup_payments
    return false if bank_holder_name.blank?
    return false if bank_holder_address.blank?
    return false if bank_currency.blank?
    true
  end
end