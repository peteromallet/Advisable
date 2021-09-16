# frozen_string_literal: true

module Toby
  module Resources
    class Conversation < BaseResource
      model_name ::Conversation
      attribute :uid, Attributes::String, readonly: true
      attribute :idempotency_key, Attributes::String, readonly: true
      attribute :messages, Attributes::HasMany
      attribute :participants, Attributes::HasMany
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
