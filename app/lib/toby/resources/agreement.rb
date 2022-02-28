# frozen_string_literal: true

module Toby
  module Resources
    class Agreement < BaseResource
      model_name ::Agreement
      attribute :uid, Attributes::String, readonly: true
      attribute :user, Attributes::BelongsTo
      attribute :company, Attributes::BelongsTo
      attribute :specialist, Attributes::BelongsTo
      attribute :status, Attributes::Select, options: ::Agreement::STATUS_OPTIONS
      attribute :collaboration, Attributes::Select, options: ::Agreement::COLLABORATION_OPTIONS
      attribute :invoicing, Attributes::Select, options: ::Agreement::INVOICING_OPTIONS
      attribute :hourly_rate, Attributes::Currency
      attribute :updated_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
    end
  end
end
