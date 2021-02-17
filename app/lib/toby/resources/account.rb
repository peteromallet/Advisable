# frozen_string_literal: true

module Toby
  module Resources
    class Account < BaseResource
      model_name ::Account
      # query_names collection: :accounts
      attribute :uid, Attributes::String
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :email, Attributes::String
    end
  end
end
