# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :account

  def read_by
    self[:read_by] || []
  end
end

# == Schema Information
#
# Table name: messages
#
#  id              :uuid             not null, primary key
#  content         :string
#  read_by         :jsonb
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint           not null
#  conversation_id :uuid             not null
#
# Indexes
#
#  index_messages_on_account_id       (account_id)
#  index_messages_on_conversation_id  (conversation_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (conversation_id => conversations.id)
#
