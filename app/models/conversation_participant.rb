# frozen_string_literal: true

class ConversationParticipant < ApplicationRecord
  belongs_to :account
  belongs_to :conversation
end

# == Schema Information
#
# Table name: conversation_participants
#
#  id              :bigint           not null, primary key
#  last_read_at    :datetime
#  unread_count    :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint           not null
#  conversation_id :bigint           not null
#
# Indexes
#
#  index_conversation_participants_on_account_id       (account_id)
#  index_conversation_participants_on_conversation_id  (conversation_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (conversation_id => conversations.id)
#
