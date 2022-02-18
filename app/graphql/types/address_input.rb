# frozen_string_literal: true

module Types
  class AddressInput < Types::BaseInputType
    argument :city, String, required: true
    argument :country, String, required: true
    argument :line1, String, required: true
    argument :line2, String, required: false
    argument :postcode, String, required: false
    argument :state, String, required: true
  end
end
