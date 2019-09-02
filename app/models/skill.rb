class Skill < ApplicationRecord
  include Uid
  include Airtable::Syncable
  has_many :specialist_skills
  has_many :specialists, through: :specialist_skills
  belongs_to :original, class_name: "Skill", required: false
  has_many :duplicates, foreign_key: "original_id", class_name: "Skill"
  validates :name, presence: true
  validates :airtable_id, presence: true
end
