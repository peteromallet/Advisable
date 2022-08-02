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
      attribute :unavailable_until, Attributes::Date
      attribute :username, Attributes::String
      attribute :skills, Attributes::HasManyThrough
      attribute :industries, Attributes::HasManyThrough
      attribute :price_range, Attributes::Select, options: ::Specialist::VALID_PRICE_RANGES
      attribute :hands_on, Attributes::Boolean
      attribute :consultancy, Attributes::Boolean
      attribute :mentorship, Attributes::Boolean
      attribute :sourcing_fee, Attributes::Integer
      attribute :country, Attributes::BelongsTo
      attribute :iban, Attributes::String
      attribute :bank_currency, Attributes::String
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :login_as, label: "Log in as this Specialist"
      action :convert_to_user, label: "Convert to User"

      def self.label(record, context)
        Lazy::Label.new(::Account, record.account_id, context, suffix: "specialist") do |account|
          "#{account.name} (#{account.email})"
        end
      end

      def self.search(query)
        ::Specialist.joins(:account).where("accounts.email ILIKE ?", "%#{query}%")
      end

      def self.login_as(object, context)
        context[:session_manager].session[:impersonating] = object.to_global_id.to_param

        {url: Advisable::Application::ORIGIN_HOST}
      end

      def self.convert_to_user(specialist, _context)
        raise Toby::Action::Error, "Specialists account is already linked to a User" if specialist.account.user

        reflections = ::Specialist.reflections.select { |_k, r| r.is_a?(ActiveRecord::Reflection::HasManyReflection) }.keys
        reflections.each do |reflection|
          raise Toby::Action::Error, "Specialist has #{reflection} records and can't be converted" if specialist.public_send(reflection).exists?
        end

        ActiveRecord::Base.transaction do
          user = ::User.create!(account: specialist.account, company: ::Company.new(name: "Converted from Specialist #{specialist.account.name}"))
          specialist.destroy
          {replace: "/toby/users/#{user.id}"}
        end
      rescue Toby::Action::Error => e
        {error: e.message}
      end
    end
  end
end
