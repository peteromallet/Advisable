# frozen_string_literal: true

class SkillCategorySkill < ApplicationRecord
  belongs_to :skill
  belongs_to :skill_category
end

# == Schema Information
#
# Table name: skill_category_skills
#
#  id                :integer          not null, primary key
#  skill_id          :integer          not null
#  skill_category_id :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_skill_category_skills_on_skill_category_id  (skill_category_id)
#  index_skill_category_skills_on_skill_id           (skill_id)
#
