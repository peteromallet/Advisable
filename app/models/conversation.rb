# frozen_string_literal: true

class Conversation < ApplicationRecord
  include Participants
  include Uid
  uid_prefix "cnv"

  has_many :messages, dependent: :destroy
  has_many :participants, class_name: "ConversationParticipant", dependent: :destroy
  has_many :accounts, through: :participants

  def mark_as_read_for!(account)
    return if account.blank?

    participant = participants.find_by(account_id: account.id)
    participant&.update!(last_read_at: Time.zone.now, unread_count: 0)
  end

  def new_message!(author: nil, content: nil, attachments: [], send_emails: true, **attributes)
    kind = author.present? ? nil : "system"
    message = messages.create!({author:, content:, kind:}.merge(attributes))
    message.attachments.attach(attachments) if attachments.present?
    message.schedule_email_notifications if send_emails
    message.update_participants
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
