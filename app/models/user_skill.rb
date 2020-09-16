class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill
end

# == Schema Information
#
# Table name: user_skills
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  skill_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_skills_on_skill_id  (skill_id)
#  index_user_skills_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill_id => skills.id)
#  fk_rails_...  (user_id => users.id)
#
