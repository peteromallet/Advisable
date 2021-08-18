# frozen_string_literal: true

class Conversation < ApplicationRecord
  include Uid
  uid_prefix "cnv"

  has_many :messages, dependent: :destroy
  has_many :participants, class_name: "ConversationParticipant", dependent: :destroy

  def mark_as_read_for!(account)
    participant = participants.find_by(account_id: account.id)
    participant&.update!(last_read_at: Time.zone.now)
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
