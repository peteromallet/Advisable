# frozen_string_literal: true

module Toby
  module Resources
    class Account < BaseResource
      model_name ::Account
      attribute :uid, Attributes::String, readonly: true
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :name, Attributes::String, readonly: true
      attribute :email, Attributes::String
      attribute :user, Attributes::HasOne
      attribute :specialist, Attributes::HasOne
      attribute :permissions, Attributes::TextArray
      attribute :unsubscribed_from, Attributes::TextArray
      attribute :confirmed_at, Attributes::DateTime
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::Account, record.id, context, value_column: :email)
      end

      def self.search(query)
        ::Account.where("email ilike ?", "%#{query}%")
      end
    end
  end
end
