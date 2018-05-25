class Skill < ApplicationRecord
  has_many :specialist_skills
  has_many :specialists, through: :specialist_skills
end
