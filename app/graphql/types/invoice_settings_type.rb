# frozen_string_literal: true
class Types::InvoiceSettingsType < Types::BaseType
  field :name, String, null: true
  field :company_name, String, null: true
  field :billing_email, String, null: true
  field :vat_number, String, null: true
  field :address, Types::AddressType, null: true
end