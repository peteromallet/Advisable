# frozen_string_literal: true

class Subscribe < ApplicationRecord
  belongs_to :specialist
  belongs_to :tag, class_name: "ActsAsTaggableOn::Tag"

  validates :specialist, uniqueness: {scope: [:tag]}
end

# == Schema Information
#
# Table name: subscribes
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  specialist_id :bigint           not null
#  tag_id        :uuid
#
# Indexes
#
#  index_subscribes_on_specialist_id             (specialist_id)
#  index_subscribes_on_specialist_id_and_tag_id  (specialist_id,tag_id) UNIQUE
#  index_subscribes_on_tag_id                    (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (tag_id => tags.id)
#
