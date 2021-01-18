# frozen_string_literal: true

class Conversation < ApplicationRecord
  has_many :conversation_participants, dependent: :destroy
  has_many :accounts, through: :conversation_participants
  has_many :messages, dependent: :destroy
end

# == Schema Information
#
# Table name: conversations
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
