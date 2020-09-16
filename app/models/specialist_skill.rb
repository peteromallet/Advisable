class SpecialistSkill < ApplicationRecord
  belongs_to :specialist
  belongs_to :skill, counter_cache: :specialists_count
end

# == Schema Information
#
# Table name: specialist_skills
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  skill_id      :bigint
#  specialist_id :bigint
#
# Indexes
#
#  index_specialist_skills_on_skill_id       (skill_id)
#  index_specialist_skills_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill_id => skills.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
