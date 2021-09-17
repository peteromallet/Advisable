# frozen_string_literal: true

class SkillCategorySkill < ApplicationRecord
  belongs_to :skill
  belongs_to :skill_category
end

# == Schema Information
#
# Table name: skill_category_skills
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  skill_category_id :bigint           not null
#  skill_id          :bigint           not null
#
# Indexes
#
#  index_skill_category_skills_on_skill_category_id  (skill_category_id)
#  index_skill_category_skills_on_skill_id           (skill_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill_category_id => skill_categories.id)
#  fk_rails_...  (skill_id => skills.id)
#
