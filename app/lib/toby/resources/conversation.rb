# frozen_string_literal: true

module Toby
  module Resources
    class Conversation < BaseResource
      model_name ::Conversation
      attribute :uid, Attributes::String, readonly: true
      attribute :participant_names, Lookups::Conversations::ParticipantNames
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.search(query)
        ::Conversation.joins(participants: :account).where("accounts.email ILIKE ?", "%#{query}%")
      end
    end
  end
end
