# frozen_string_literal: true

class Notification < ApplicationRecord
  ACTION_TYPES = %w[post_reaction suggested_post].freeze

  belongs_to :account
  belongs_to :actor, class_name: "Account", optional: true
  belongs_to :notifiable, polymorphic: true

  scope :unread, -> { where(read_at: nil) }

  validates :action, inclusion: {in: ACTION_TYPES}
end

# == Schema Information
#
# Table name: notifications
#
#  id              :uuid             not null, primary key
#  action          :string           not null
#  notifiable_type :string           not null
#  read_at         :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint           not null
#  actor_id        :bigint
#  notifiable_id   :uuid             not null
#
# Indexes
#
#  index_notifications_on_account_id  (account_id)
#  index_notifications_on_actor_id    (actor_id)
#  index_notifications_on_notifiable  (notifiable_type,notifiable_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (actor_id => accounts.id)
#
