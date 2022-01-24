# frozen_string_literal: true

module Toby
  module Resources
    class Conversation < BaseResource
      model_name ::Conversation
      attribute :uid, Attributes::String, readonly: true
      attribute :participant_name, Lookups::Conversations::ParticipantName
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, _context)
        record.uid
      end

      def self.search(query)
        ::Conversation.joins(participants: :account).where("accounts.email ILIKE ?", "%#{query}%")
      end
    end
  end
end
