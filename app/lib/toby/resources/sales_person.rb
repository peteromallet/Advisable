# frozen_string_literal: true

module Toby
  module Resources
    class SalesPerson < BaseResource
      model_name ::SalesPerson
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :email, Attributes::String
      attribute :name, Attributes::String, readonly: true
    end
  end
end
