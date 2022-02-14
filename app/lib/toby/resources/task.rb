# frozen_string_literal: true

module Toby
  module Resources
    class Task < BaseResource
      model_name ::Task
      attribute :uid, Attributes::String, readonly: true
      attribute :application, Attributes::BelongsTo, readonly: true
      attribute :company, Lookups::Tasks::CompanyName
      attribute :specialist, Lookups::Applications::SpecialistName
      attribute :name, Attributes::String
      attribute :description, Attributes::String
      attribute :estimate_type, Attributes::String
      attribute :estimate, Attributes::Currency
      attribute :flexible_estimate, Attributes::Currency
      attribute :hours_worked, Attributes::Integer
      attribute :invoice_rate, Lookups::Tasks::InvoiceRate
      attribute :final_cost, Attributes::Currency
      attribute :repeat, Attributes::String
      attribute :trial, Attributes::Boolean
      attribute :stripe_invoice_id, Attributes::String
      attribute :stage, Attributes::String
      attribute :due_date, Attributes::DateTime
      attribute :quote_requested_at, Attributes::DateTime
      attribute :quote_provided_at, Attributes::DateTime
      attribute :assigned_at, Attributes::DateTime
      attribute :started_working_at, Attributes::DateTime
      attribute :submitted_at, Attributes::DateTime
      attribute :approved_at, Attributes::DateTime
      attribute :charged_at, Lookups::Tasks::ChargedAt
      attribute :processed_at, Lookups::Tasks::ProcessedAt
      attribute :charged_amount, Lookups::Tasks::ChargedAmount
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::Task, record.id, context, value_column: :uid)
      end

      def self.search(query)
        ::Task.where("uid ILIKE ?", "%#{query}%")
      end
    end
  end
end
