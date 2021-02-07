module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      # query_names collection: :accounts
      attribute :uid, Attributes::String
      attribute :email, Attributes::String
      attribute :bio, Attributes::String
      attribute :account, Attributes::BelongsTo, resource: Account
    end
  end
end
