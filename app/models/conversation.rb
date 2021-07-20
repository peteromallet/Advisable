# frozen_string_literal: true

class Conversation < ApplicationRecord
  include Uid
  uid_prefix "cnv"

  has_many :messages, dependent: :destroy
  has_many :participants, class_name: "ConversationParticipant", dependent: :destroy
end

# == Schema Information
#
# Table name: conversations
#
#  id         :bigint           not null, primary key
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_conversations_on_uid  (uid) UNIQUE
#
