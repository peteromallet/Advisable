class SpecialistSkill < ApplicationRecord
  belongs_to :specialist
  belongs_to :skill, counter_cache: :specialists_count
end
