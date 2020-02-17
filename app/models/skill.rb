class Skill < ApplicationRecord
  include Uid
  include Airtable::Syncable
  has_many :specialist_skills
  has_many :specialists, through: :specialist_skills
  belongs_to :original, class_name: 'Skill', required: false
  has_many :duplicates, foreign_key: 'original_id', class_name: 'Skill'
  has_many :project_skills
  validates :name, presence: true
  validates :airtable_id, presence: true

  scope :popular, -> { order(projects_count: :desc, specialists_count: :desc) }
end
