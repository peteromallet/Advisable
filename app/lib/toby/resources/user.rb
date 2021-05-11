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
      attribute :application_status, Attributes::Select, options: ["Accepted", "Invited", "Active", "Access Granted"]
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::Account, record.account_id, context, value_column: :email)
      end

      def self.search(query)
        ::User.joins(:account).where("accounts.email ilike ?", "%#{query}%")
      end
    end
  end
end
