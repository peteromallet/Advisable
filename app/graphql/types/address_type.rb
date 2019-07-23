class Types::AddressType < Types::BaseType
  field :line1, String, null: true
  field :line2, String, null: true
  field :city, String, null: true
  field :state, String, null: true
  field :country, String, null: true
  field :postcode, String, null: true
end