# frozen_string_literal: true
class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill
end

# == Schema Information
#
# Table name: user_skills
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  skill_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_user_skills_on_skill_id  (skill_id)
#  index_user_skills_on_user_id   (user_id)
#
