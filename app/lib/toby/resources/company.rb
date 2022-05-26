# frozen_string_literal: true

module Toby
  module Resources
    class Company < BaseResource
      model_name ::Company
      attribute :name, Attributes::String
      attribute :intent, Attributes::String, readonly: true
      attribute :sales_person, Attributes::BelongsTo
      attribute :industry, Attributes::BelongsTo
      attribute :audience, Attributes::String
      attribute :billing_email, Attributes::String
      attribute :invoice_company_name, Attributes::String
      attribute :invoice_name, Attributes::String
      attribute :admin_fee, Attributes::Integer
      attribute :kind, Attributes::String
      attribute :vat_number, Attributes::String
      attribute :project_payment_method, Attributes::Select, options: ::Company::PROJECT_PAYMENT_METHODS
      attribute :billing_address, Attributes::String, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, _context)
        record.name || record.id
      end

      def self.search(query)
        ::Company.where("name ILIKE ?", "%#{query}%")
      end

      def self.save(record, _attributes)
        super
        record.users.where.not(airtable_id: nil).each(&:sync_to_airtable)
      end
    end
  end
end
