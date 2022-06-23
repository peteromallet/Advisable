# frozen_string_literal: true

module Toby
  module Resources
    class Message < BaseResource
      model_name ::Message
      attribute :uid, Attributes::String, readonly: true
      attribute :author, Attributes::BelongsTo
      attribute :conversation, Attributes::BelongsTo
      attribute :agreement, Attributes::BelongsTo
      attribute :content, Attributes::LongText
      attribute :kind, Attributes::Select, options: ["", "system"]
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
      attribute :attachments, Attributes::Attachments, readonly: true

      def self.label(record, _context)
        record.kind.present? ? "#{record.uid} (#{record.kind})" : record.uid
      end
    end
  end
end
