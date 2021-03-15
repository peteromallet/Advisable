# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :specialist
  belongs_to :tag, class_name: "ActsAsTaggableOn::Tag"

  validates :tag, uniqueness: {scope: [:specialist]}
end

# == Schema Information
#
# Table name: subscriptions
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  specialist_id :bigint           not null
#  tag_id        :uuid
#
# Indexes
#
#  index_subscriptions_on_specialist_id             (specialist_id)
#  index_subscriptions_on_specialist_id_and_tag_id  (specialist_id,tag_id) UNIQUE
#  index_subscriptions_on_tag_id                    (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (tag_id => tags.id)
#
