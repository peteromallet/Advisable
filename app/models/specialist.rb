class Specialist < ApplicationRecord
  belongs_to :country, required: false
  has_many :applications
  has_many :specialist_skills
  has_many :skills, through: :specialist_skills
  validates :airtable_id, presence: true
  validates :first_name, presence: true
  attr_encrypted :phone_number, key: [ENV["ENCRYPTION_KEY"]].pack("H*")

  def name
    "#{first_name} #{last_name}"
  end
end
