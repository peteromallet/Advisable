class Types::AddressInput < Types::BaseInputType
  description "Attributes for an address"

  argument :line1, String, required: true
  argument :line2, String, required: false
  argument :city, String, required: false
  argument :state, String, required: false
  argument :country, String, required: true
  argument :postcode, String, required: false
end