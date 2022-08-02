# frozen_string_literal: true

module Toby
  module Resources
    class User < BaseResource
      model_name ::User
      attribute :uid, Attributes::String, readonly: true
      attribute :email, Lookups::Accounts::Email
      attribute :account, Attributes::BelongsTo
      attribute :company, Attributes::BelongsTo
      attribute :country, Attributes::BelongsTo
      attribute :application_status, Attributes::Select, options: ["Application Started", "Submitted", "Invited To Interview", "Interview Scheduled", "Application Rejected", "Application Accepted"]
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :login_as, label: "Log in as this User"
      action :convert_to_specialist, label: "Convert to Specialist"

      def self.label(record, context)
        Lazy::Label.new(::Account, record.account_id, context, suffix: "user") do |account|
          "#{account.name} (#{account.email})"
        end
      end

      def self.search(query)
        ::User.joins(:account).where("accounts.email ILIKE ?", "%#{query}%")
      end

      def self.login_as(object, context)
        context[:session_manager].session[:impersonating] = object.to_global_id.to_param

        {url: Advisable::Application::ORIGIN_HOST}
      end

      def self.convert_to_specialist(user, _context)
        raise Toby::Action::Error, "Users account is already linked to a Specialist" if user.account.specialist

        reflections = ::User.reflections.select { |_k, r| r.is_a?(ActiveRecord::Reflection::HasManyReflection) }.keys
        reflections.each do |reflection|
          raise Toby::Action::Error, "User has #{reflection} records and can't be converted" if user.public_send(reflection).exists?
        end

        ActiveRecord::Base.transaction do
          specialist = ::Specialist.create!(account: user.account)
          user.destroy
          {replace: "/toby/specialists/#{specialist.id}"}
        end
      rescue Toby::Action::Error => e
        {error: e.message}
      end
    end
  end
end
