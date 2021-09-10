# frozen_string_literal: true

module Toby
  module Resources
    class BlacklistedDomain < BaseResource
      model_name ::BlacklistedDomain

      attribute :domain, Attributes::String
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::BlacklistedDomain, record.id, context, value_column: :domain)
      end

      def self.search(query)
        ::BlacklistedDomain.where("domain ILIKE ?", "%#{query}%")
      end
    end
  end
end
