# frozen_string_literal: true

module Toby
  module Resources
    class ConversationParticipant < BaseResource
      model_name ::ConversationParticipant

      attribute :account, Attributes::BelongsTo
      attribute :conversation, Attributes::BelongsTo
      attribute :last_read_at, Attributes::DateTime
      attribute :unread_count, Attributes::Integer
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::Account, record.account_id, context, value_column: :name)
      end
    end
  end
end
