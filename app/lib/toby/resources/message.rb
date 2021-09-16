# frozen_string_literal: true

module Toby
  module Resources
    class Message < BaseResource
      model_name ::Message
      attribute :uid, Attributes::String, readonly: true
      attribute :idempotency_key, Attributes::String, readonly: true
      attribute :author, Attributes::BelongsTo
      attribute :conversation, Attributes::BelongsTo
      attribute :content, Attributes::LongText
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
