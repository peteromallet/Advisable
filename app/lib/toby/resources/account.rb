module Toby
  module Resources
    class Account < BaseResource
      model_name ::Account
      # query_names collection: :accounts
      attribute :first_name, Attributes::String
      attribute :email, Attributes::String
    end
  end
end
