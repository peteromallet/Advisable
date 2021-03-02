# frozen_string_literal: true

module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      # query_names collection: :accounts
      attribute :uid, Attributes::String, readonly: true
      attribute :application_stage, Attributes::Select, options: []
      attribute :account, Attributes::BelongsTo, labeled_by: :name
      attribute :bio, Attributes::String
      attribute :hourly_rate, Attributes::Currency
      attribute :country, Attributes::BelongsTo, labeled_by: :name
      attribute :applications, Attributes::HasMany
      attribute :skills, Attributes::HasManyThrough
      attribute :reviews, Attributes::HasMany
    end
  end
end
