# frozen_string_literal: true

class Message < ApplicationRecord
  include Uid
  uid_prefix "msg"

  belongs_to :author, class_name: "Account"
  belongs_to :conversation
  has_many_attached :attachments

  validates :content, presence: true

  after_create :trigger_subscriptions

  private

  def trigger_subscriptions
    conversation.participants.where.not(account_id: author_id).find_each do |participant|
      AdvisableSchema.subscriptions.trigger("receivedMessage", {}, self, scope: participant.account_id)
    end
  end
end

# == Schema Information
#
# Table name: messages
#
#  id              :bigint           not null, primary key
#  content         :text
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
#  index_messages_on_uid              (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (author_id => accounts.id)
#  fk_rails_...  (conversation_id => conversations.id)
#
