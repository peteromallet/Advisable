# frozen_string_literal: true

module Toby
  module Resources
    class Company < BaseResource
      model_name ::Company
      attribute :name, Attributes::String
      attribute :sales_person, Attributes::BelongsTo, labeled_by: :name
      attribute :bank_transfers_enabled, Attributes::Boolean
      attribute :billing_email, Attributes::String
      attribute :invoice_company_name, Attributes::String
      attribute :invoice_name, Attributes::String
      attribute :kind, Attributes::String
      attribute :vat_number, Attributes::String
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::Company, record.id, context, value_column: :name)
      end

      def self.search(query)
        ::Company.where("name ilike ?", "%#{query}%")
      end
    end
  end
end
