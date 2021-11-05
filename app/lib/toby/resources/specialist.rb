# frozen_string_literal: true

module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      attribute :uid, Attributes::String, readonly: true
      attribute :email, Lookups::Accounts::Email
      attribute :account, Attributes::BelongsTo
      attribute :bio, Attributes::LongText
      attribute :application_stage, Attributes::Select, options: ::Specialist::VALID_APPLICATION_STAGES
      attribute :previous_work_description, Attributes::LongText, readonly: true
      attribute :previous_work_results, Attributes::LongText, readonly: true
      attribute :ideal_project, Attributes::LongText, readonly: true
      attribute :linkedin, Attributes::Url
      attribute :website, Attributes::Url
      attribute :consultation_url, Lookups::Specialists::ConsultationUrl, sortable: false
      attribute :unavailable_until, Attributes::Date
      attribute :username, Attributes::String
      attribute :skills, Attributes::HasManyThrough
      attribute :industries, Attributes::HasManyThrough
      attribute :hourly_rate, Attributes::Currency
      attribute :sourcing_fee, Attributes::Integer
      attribute :country, Attributes::BelongsTo
      attribute :iban, Attributes::String
      attribute :bank_currency, Attributes::String
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :login_as, label: "Log in as this Specialist"

      def self.label(record, context)
        Lazy::Label.new(::Account, record.account_id, context) do |account|
          "#{account.name} (#{account.email})"
        end
      end

      def self.search(query)
        ::Specialist.joins(:account).where("accounts.email ILIKE ?", "%#{query}%")
      end

      def self.login_as(object, context)
        context[:session_manager].session[:admin_override] = object.to_global_id.to_param

        {url: Advisable::Application::ORIGIN_HOST}
      end
    end
  end
end
