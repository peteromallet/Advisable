class Specialist < ApplicationRecord
  belongs_to :country
  has_many :applications
  has_many :specialist_skills
  has_many :skills, through: :specialist_skills
  validates :airtable_id, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :city, presence: true

  def name
    "#{first_name} #{last_name}"
  end
end
