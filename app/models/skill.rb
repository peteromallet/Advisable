class Skill < ApplicationRecord
  include UID
  has_many :specialist_skills
  has_many :specialists, through: :specialist_skills
  has_many :project_skills
  has_many :projects, through: :project_skills
  validates :name, presence: true
  validates :airtable_id, presence: true
end
