# frozen_string_literal: true

module Toby
  module Resources
    class Account < BaseResource
      model_name ::Account
      attribute :uid, Attributes::String
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :name, Attributes::String, readonly: true
      attribute :email, Attributes::String
    end
  end
end
