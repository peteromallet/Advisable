# frozen_string_literal: true

module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      attribute :uid, Attributes::String, readonly: true
      attribute :application_stage, Attributes::Select, options: []
      attribute :account, Attributes::BelongsTo, labeled_by: :name
      attribute :bio, Attributes::String
      attribute :linkedin, Attributes::String
      attribute :website, Attributes::String
      attribute :hourly_rate, Attributes::Currency
      attribute :country, Attributes::BelongsTo, labeled_by: :name
      attribute :applications, Attributes::HasMany
      attribute :skills, Attributes::HasManyThrough
      attribute :reviews, Attributes::HasMany
      attribute :unavailable_until, Attributes::Date
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
