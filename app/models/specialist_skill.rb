# frozen_string_literal: true
class SpecialistSkill < ApplicationRecord
  belongs_to :specialist
  belongs_to :skill, counter_cache: :specialists_count
end

# == Schema Information
#
# Table name: specialist_skills
#
#  id            :integer          not null, primary key
#  specialist_id :integer
#  skill_id      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_specialist_skills_on_skill_id       (skill_id)
#  index_specialist_skills_on_specialist_id  (specialist_id)
#
