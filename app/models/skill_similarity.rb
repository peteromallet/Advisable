# frozen_string_literal: true

class SkillSimilarity < ApplicationRecord
  belongs_to :skill1, class_name: "Skill"
  belongs_to :skill2, class_name: "Skill"

  validates :skill1, uniqueness: {scope: :skill2}
  validates :skill2, uniqueness: {scope: :skill1}

  validates :similarity, presence: true
  validates :similarity, inclusion: 0..100
  validate :skills_are_different
  validate :unique_combination

  # returns origin and all related skills - it can take singular or plulral skills
  def self.similar_to(skills, similarity = 50)
    query = Skill.where(id: skills)
    Array(skills).each do |skill|
      query = query.or(
        Skill.where(
          id: where(skill1: skill, similarity: similarity..).select(:skill2_id)
        )
      ).or(
        Skill.where(
          id: where(skill2: skill, similarity: similarity..).select(:skill1_id)
        )
      )
    end
    query
  end

  private

  def skills_are_different
    return if skill1_id != skill2_id

    errors.add(:base, "skills must be different")
  end

  def unique_combination
    return unless SkillSimilarity.exists?(skill1: skill2, skill2: skill1)

    errors.add(:base, "skills must form a unique combination")
  end
end

# == Schema Information
#
# Table name: skill_similarities
#
#  id         :bigint           not null, primary key
#  similarity :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  skill1_id  :bigint           not null
#  skill2_id  :bigint           not null
#
# Indexes
#
#  index_skill_similarities_on_skill1_id                (skill1_id)
#  index_skill_similarities_on_skill1_id_and_skill2_id  (skill1_id,skill2_id) UNIQUE
#  index_skill_similarities_on_skill2_id                (skill2_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill1_id => skills.id)
#  fk_rails_...  (skill2_id => skills.id)
#
