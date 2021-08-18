# frozen_string_literal: true

class Message < ApplicationRecord
  include Uid
  uid_prefix "msg"

  NOTIFICATION_WAIT_TIME = 10.minutes

  belongs_to :author, class_name: "Account"
  belongs_to :conversation
  has_many_attached :attachments

  before_validation :strip_content

  def announce_message
    MessageNotifierJob.set(wait: NOTIFICATION_WAIT_TIME).perform_later(self)

    conversation.participants.where.not(account_id: author_id).find_each do |participant|
      AdvisableSchema.subscriptions.trigger("receivedMessage", {}, self, scope: participant.account_id)
    end
  end

  private

  def strip_content
    self.content = content&.strip
  end
end

# == Schema Information
#
# Table name: messages
#
#  id              :bigint           not null, primary key
#  content         :text
#  idempotency_key :string
#  uid             :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  author_id       :bigint           not null
#  conversation_id :bigint           not null
#
# Indexes
#
#  index_messages_on_author_id        (author_id)
#  index_messages_on_conversation_id  (conversation_id)
#  index_messages_on_idempotency_key  (idempotency_key)
#  index_messages_on_uid              (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (author_id => accounts.id)
#  fk_rails_...  (conversation_id => conversations.id)
#
