# frozen_string_literal: true

class Subscription < ApplicationRecord
  self.ignored_columns += %i[tag_id]

  belongs_to :specialist
  belongs_to :label

  validates :label, uniqueness: {scope: :specialist}
end

# == Schema Information
#
# Table name: subscriptions
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  label_id      :uuid
#  specialist_id :bigint           not null
#
# Indexes
#
#  index_subscriptions_on_label_id                    (label_id)
#  index_subscriptions_on_specialist_id               (specialist_id)
#  index_subscriptions_on_specialist_id_and_label_id  (specialist_id,label_id) UNIQUE
#  index_subscriptions_on_specialist_id_and_tag_id    (specialist_id,tag_id) UNIQUE
#  index_subscriptions_on_tag_id                      (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (label_id => labels.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (tag_id => tags.id)
#
