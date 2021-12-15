# frozen_string_literal: true

class ConversationParticipant < ApplicationRecord
  belongs_to :account
  belongs_to :conversation
end

# == Schema Information
#
# Table name: conversation_participants
#
#  id              :integer          not null, primary key
#  account_id      :integer          not null
#  conversation_id :integer          not null
#  last_read_at    :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  unread_count    :integer
#
# Indexes
#
#  index_conversation_participants_on_account_id       (account_id)
#  index_conversation_participants_on_conversation_id  (conversation_id)
#
