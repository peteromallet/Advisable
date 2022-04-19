# frozen_string_literal: true

module Toby
  module Resources
    class Account < BaseResource
      model_name ::Account
      attribute :uid, Attributes::String, readonly: true
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :name, Attributes::StringNoFilter, readonly: true, sortable: false
      attribute :email, Attributes::String
      attribute :user, Attributes::HasOne
      attribute :specialist, Attributes::HasOne
      attribute :interests, Attributes::HasMany
      attribute :permissions, Attributes::TextArray
      attribute :unsubscribed_from, Attributes::TextArray
      attribute :confirmed_at, Attributes::DateTime
      attribute :deleted_at, Attributes::DateTime
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, _context)
        record.name
      end

      def self.search(query)
        ::Account.where("email ILIKE ?", "%#{query}%")
      end
    end
  end
end
