class Specialist < ApplicationRecord
  belongs_to :country
  has_many :specialist_skills
  has_many :skills, through: :specialist_skills
end
