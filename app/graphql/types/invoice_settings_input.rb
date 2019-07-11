class Types::InvoiceSettingsInput < Types::BaseInputType
  description "Attributes for the users invoice settings"
  argument :name, String, "Full Name", required: true
  argument :company_name, String, "Company Name", required: true
  argument :vat_number, String, "Vat ID", required: false
  argument :address, Types::AddressInput, required: true
end