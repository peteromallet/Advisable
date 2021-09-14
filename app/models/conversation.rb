# frozen_string_literal: true

class Conversation < ApplicationRecord
  include Uid
  uid_prefix "cnv"

  has_many :messages, dependent: :destroy
  has_many :participants, class_name: "ConversationParticipant", dependent: :destroy

  def self.by_accounts(accounts)
    find_existing_with(accounts) || create_new_with(accounts)
  end

  def self.find_existing_with(accounts)
    joins(:participants).
      where(participants: {account: accounts}).
      group(:id).
      having("COUNT(participants.id) = ?", accounts.size).
      first
  end

  def self.create_new_with(accounts)
    conversation = create!
    accounts.each do |participant|
      conversation.participants.create!(account: participant)
    end
    conversation
  end

  def mark_as_read_for!(account)
    return if account.blank?

    participant = participants.find_by(account_id: account.id)
    participant&.update!(last_read_at: Time.zone.now, unread_count: 0)
  end

  def new_message!(author, content, attachments = [], uid = nil)
    message = messages.create!(author: author, content: content, uid: uid)
    message.attachments.attach(attachments) if attachments.present?
    message.reload.after_create_actions
    message
  end
end

# == Schema Information
#
# Table name: conversations
#
#  id              :bigint           not null, primary key
#  idempotency_key :string
#  uid             :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_conversations_on_idempotency_key  (idempotency_key)
#  index_conversations_on_uid              (uid) UNIQUE
#
