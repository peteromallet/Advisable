# frozen_string_literal: true

class SkillCategory < ApplicationRecord
  has_many :skill_category_skills, dependent: :destroy
  has_many :skills, through: :skill_category_skills

  validates :name, presence: true

  def skills_with_similar
    SkillSimilarity.similar_to(skills)
  end

  def skills_without_aliases
    non_aliased_skills = []
    skills.each do |skill|
      aliases = SkillSimilarity.similar_to(skill, 100).pluck(:id)
      non_aliased_skills << skill.id if non_aliased_skills.intersection(aliases).none?
    end
    Skill.where(id: non_aliased_skills)
  end
end

# == Schema Information
#
# Table name: skill_categories
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
