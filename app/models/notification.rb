# frozen_string_literal: true

class Notification < ApplicationRecord
  ACTION_TYPES = %w[suggested_post send_agreement].freeze

  belongs_to :guild_post, optional: true, class_name: "Guild::Post"
  belongs_to :interview, optional: true
  belongs_to :account, optional: true

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
#  interview_id  :bigint
#
# Indexes
#
#  index_notifications_on_account_id     (account_id)
#  index_notifications_on_guild_post_id  (guild_post_id)
#  index_notifications_on_interview_id   (interview_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (guild_post_id => guild_posts.id)
#
