# frozen_string_literal: true

class ProblematicFlag < ApplicationRecord
  belongs_to :application
  belongs_to :user
end

# == Schema Information
#
# Table name: problematic_flags
#
#  id             :uuid             not null, primary key
#  message        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  application_id :bigint           not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_problematic_flags_on_application_id  (application_id)
#  index_problematic_flags_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (user_id => users.id)
#
