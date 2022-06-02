# frozen_string_literal: true

class Notification < ApplicationRecord
  self.ignored_columns += %i[notifiable_type notifiable_id actor_id]

  ACTION_TYPES = %w[suggested_post].freeze

  belongs_to :account
  belongs_to :guild_post, optional: true, class_name: "Guild::Post"

  scope :unread, -> { where(read_at: nil) }

  validates :action, inclusion: {in: ACTION_TYPES}
end

# == Schema Information
#
# Table name: notifications
#
#  id            :uuid             not null, primary key
#  action        :string           not null
#  read_at       :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  account_id    :bigint           not null
#  guild_post_id :uuid
#
# Indexes
#
#  index_notifications_on_account_id     (account_id)
#  index_notifications_on_actor_id       (actor_id)
#  index_notifications_on_guild_post_id  (guild_post_id)
#  index_notifications_on_notifiable     (notifiable_type,notifiable_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (actor_id => accounts.id)
#  fk_rails_...  (guild_post_id => guild_posts.id)
#
