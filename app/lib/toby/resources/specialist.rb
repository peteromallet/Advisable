# frozen_string_literal: true

module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      attribute :uid, Attributes::String, readonly: true
      attribute :email, Lookups::Accounts::Email
      attribute :application_stage, Attributes::Select, options: ::Specialist::VALID_APPLICATION_STAGES
      attribute :previous_projects, Attributes::HasMany
      attribute :account, Attributes::BelongsTo, labeled_by: :name
      attribute :bio, Attributes::LongText
      attribute :linkedin, Attributes::String
      attribute :website, Attributes::String
      attribute :hourly_rate, Attributes::Currency
      attribute :country, Attributes::BelongsTo, labeled_by: :name
      attribute :applications, Attributes::HasMany, labeled_by: :project
      attribute :skills, Attributes::HasManyThrough, labeled_by: :name
      attribute :reviews, Attributes::HasMany
      attribute :unavailable_until, Attributes::Date
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::Account, :id, :email, record.account_id, context)
      end

      def self.search(query)
        ::Specialist.joins(:account).where("accounts.email ilike ?", "%#{query}%")
      end
    end
  end
end
