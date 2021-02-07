module Toby
  module Resources
    class User < BaseResource
      model_name ::User
      attribute :uid, Attributes::String
      attribute :account, Attributes::BelongsTo, resource: Account
    end
  end
end
