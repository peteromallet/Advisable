# frozen_string_literal: true

class SkillCategory < ApplicationRecord
  has_many :skill_category_skills, dependent: :destroy
  has_many :skills, through: :skill_category_skills

  validates :name, presence: true
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
