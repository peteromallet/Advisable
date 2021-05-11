# frozen_string_literal: true

module Toby
  module Resources
    class Interview < BaseResource
      model_name ::Interview
      attribute :uid, Attributes::String, readonly: true
      attribute :starts_at, Attributes::DateTime
      attribute :status, Attributes::Select, options: []
      attribute :application, Attributes::BelongsTo
    end
  end
end
