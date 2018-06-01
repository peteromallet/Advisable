class Skill < ApplicationRecord
  has_many :specialist_skills
  has_many :specialists, through: :specialist_skills
  validates :name, presence: true
  validates :airtable_id, presence: true
end
